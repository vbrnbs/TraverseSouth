import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug') || '';

  // Optional: Verify secret against environment variables if configured
  const validationSecret = process.env.SANITY_REVALIDATE_SECRET;
  if (validationSecret && secret !== validationSecret && process.env.NODE_ENV === 'production') {
    return new Response('Unauthorized preview access', { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  // Handle redirects cleanly and securely
  if (slug) {
    const safePath = slug.startsWith('/') ? slug : `/${slug}`;
    redirect(safePath);
  }

  redirect('/');
}
