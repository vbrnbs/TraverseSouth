import fs from 'fs';
import path from 'path';

// Helper to load credentials from .env.local or environment variables
function getEnvConfig() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...valParts] = trimmed.split('=');
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = valParts.join('=').trim().replace(/^["']|["']$/g, '');
        }
      }
    }
  }

  const clientId = process.env.OUTLOOK_CLIENT_ID || '7fb8187a-6832-4af6-8d53-1077eb41d4a0';
  const tenantId = process.env.OUTLOOK_TENANT_ID || 'a3c31f90-14ad-4b82-8387-bc423ab7717f';
  const clientSecret = process.env.OUTLOOK_CLIENT_SECRET;
  const senderEmail = process.env.OUTLOOK_SENDER_EMAIL || 'contact@traversesouth.co.nz';

  if (!clientSecret) {
    throw new Error('Missing OUTLOOK_CLIENT_SECRET in environment or .env.local');
  }

  return { clientId, tenantId, clientSecret, senderEmail };
}

// 1. Acquire OAuth2 Access Token via Client Credentials
export async function getAccessToken({ clientId, tenantId, clientSecret }: { clientId: string; tenantId: string; clientSecret: string }) {
  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  });

  const res = await fetch(tokenUrl, {
    method: 'POST',
    body: params,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to obtain access token from Microsoft Graph (${res.status}): ${errorText}`);
  }

  const data = await res.json() as any;
  return data.access_token as string;
}

const DEFAULT_SIGNATURE_TEXT = `

Best regards,

Barney Varszegi
Head of Client & Partner Relations

🔴 Traverse South

www.traversesouth.co.nz
📞 +64 204-001-5276`;

const DEFAULT_SIGNATURE_HTML = `<br><br>
<p style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.5; margin: 0;">
  Best regards,<br><br>
  <strong>Barney Varszegi</strong><br>
  Head of Client &amp; Partner Relations<br><br>
  <span style="font-size: 16px;">&#128308; <strong>Traverse South</strong></span><br><br>
  <a href="https://www.traversesouth.co.nz" style="color: #4a148c; text-decoration: underline;">www.traversesouth.co.nz</a><br>
  &#128222; +64 204-001-5276
</p>`;

// 2. Create Draft inside contact@traversesouth.co.nz Drafts folder
export async function createDraft(to: string[], subject: string, body: string, isHtml = false, includeSignature = true) {
  const config = getEnvConfig();
  const token = await getAccessToken(config);

  const fullContent = includeSignature 
    ? (isHtml ? body + DEFAULT_SIGNATURE_HTML : body + DEFAULT_SIGNATURE_TEXT)
    : body;

  const url = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(config.senderEmail)}/messages`;
  const payload = {
    subject,
    from: {
      emailAddress: {
        address: config.senderEmail,
        name: 'Traverse South'
      }
    },
    body: {
      contentType: isHtml ? 'HTML' : 'Text',
      content: fullContent,
    },
    toRecipients: to.map(email => ({ emailAddress: { address: email } })),
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payloadJson = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
        console.error('Decoded Token Claims (Roles):', payloadJson.roles || 'NO ROLES GRANTED IN TOKEN');
      }
    } catch (e) {}
    throw new Error(`Graph API error creating draft (${res.status}): ${errText}`);
  }

  const result = await res.json() as any;
  return { success: true, id: result.id, webLink: result.webLink };
}

// 3. Send Email Immediately from contact@traversesouth.co.nz
export async function sendEmail(to: string[], subject: string, body: string, isHtml = false, includeSignature = true) {
  const config = getEnvConfig();
  const token = await getAccessToken(config);

  const fullContent = includeSignature 
    ? (isHtml ? body + DEFAULT_SIGNATURE_HTML : body + DEFAULT_SIGNATURE_TEXT)
    : body;

  const url = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(config.senderEmail)}/sendMail`;
  const payload = {
    message: {
      subject,
      from: {
        emailAddress: {
          address: config.senderEmail,
          name: 'Traverse South'
        }
      },
      body: {
        contentType: isHtml ? 'HTML' : 'Text',
        content: fullContent,
      },
      toRecipients: to.map(email => ({ emailAddress: { address: email } })),
    },
    saveToSentItems: true,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Graph API error sending email (${res.status}): ${errText}`);
  }

  return { success: true, status: 'SENT' };
}

// CLI Execution support
if (require.main === module) {
  const args = process.argv.slice(2);
  const actionIdx = args.indexOf('--action');
  const toIdx = args.indexOf('--to');
  const subjectIdx = args.indexOf('--subject');
  const bodyIdx = args.indexOf('--body');

  const action = actionIdx !== -1 ? args[actionIdx + 1] : 'draft';
  const to = toIdx !== -1 ? args[toIdx + 1].split(',') : ['varszegibarnabas@gmail.com'];
  const subject = subjectIdx !== -1 ? args[subjectIdx + 1] : 'Test from Traverse South Outlook';
  const rawBody = bodyIdx !== -1 ? args[bodyIdx + 1] : 'Hello from contact@traversesouth.co.nz';
  const isHtml = !args.includes('--text');

  const body = isHtml && !rawBody.trim().startsWith('<') 
    ? `<p style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.5; margin: 0;">${rawBody.replace(/\n/g, '<br>')}</p>` 
    : rawBody;

  (async () => {
    try {
      if (action === 'send') {
        console.log(`Sending HTML email from contact@traversesouth.co.nz to ${to.join(', ')}...`);
        const res = await sendEmail(to, subject, body, isHtml);
        console.log('✅ Email sent successfully:', res);
      } else {
        console.log(`Creating HTML draft in contact@traversesouth.co.nz for ${to.join(', ')}...`);
        const res = await createDraft(to, subject, body, isHtml);
        console.log('✅ Draft created successfully:', res);
      }
    } catch (err: any) {
      console.error('❌ Error:', err.message || err);
      process.exit(1);
    }
  })();
}
