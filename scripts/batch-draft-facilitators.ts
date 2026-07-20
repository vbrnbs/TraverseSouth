import { createDraft } from './outlook-client';

const STD_P2 = `I’m reaching out from Traverse South, a high-end travel and adventure agency organizing multi-day corporate expeditions and executive workshops (<a href="https://www.traversesouth.co.nz/corporate" style="color: #4a148c;">www.traversesouth.co.nz/corporate</a>) across the Queenstown, Wānaka, and Fiordland region. We handle 100% of the private aviation, remote camps, and field logistics so facilitators can focus entirely on leadership transformation without administrative overhead.`;

const STD_P3 = `I would love to learn more about your current corporate offerings. Could you please share basic information and overview materials regarding your available services, speaking topics, and interactive workshop modules for executive leadership teams?`;

interface FacilitatorDraft {
  name: string;
  email: string[];
  subject: string;
  p1: string;
}

const facilitators: FacilitatorDraft[] = [
  {
    name: 'Jamie Fitzgerald',
    email: ['jamie@inspiringperformance.co.nz'],
    subject: 'Executive Wilderness Workshops in NZ — Partnership with Traverse South',
    p1: 'I have followed your career with huge respect—from reaching the South Pole unsupported on foot to setting Atlantic Ocean rowing world records. Your work facilitating high-stakes alignment and performance for executive leadership teams and the 2011 Rugby World Cup sets an extraordinary benchmark.'
  },
  {
    name: 'James Castrission ("Cas")',
    email: ['info@myadventuregroup.com.au', 'marielle@myadventuregroup.com.au'],
    subject: 'Executive Wilderness Workshops in NZ — Partnership with Traverse South',
    p1: 'Your rare transition from Deloitte management consulting to completing the first unsupported kayak crossing of the Tasman Sea and the longest unsupported polar expedition is inspiring. Translating those high-consequence logistical achievements into actionable risk governance and resilience for executive leadership teams is exactly what caught our attention.'
  },
  {
    name: 'Guy Cotter',
    email: ['guy.cotter@adventure.co.nz', 'info@adventure.co.nz'],
    subject: 'Executive Wilderness Workshops in NZ — Traverse South & Adventure Consultants',
    p1: 'As an IFMGA mountain guide, five-time Everest summiter, and the leader who rebuilt Adventure Consultants with uncompromising risk management, your authority on crisis leadership under pressure is second to none. Your deep experience leading expeditions across the world\'s highest peaks provides an invaluable perspective for executive decision-making.'
  },
  {
    name: 'Adam Sellars',
    email: ['adam@thepressureproject.com.au'],
    subject: 'Executive Wilderness Workshops in NZ — Partnership with Traverse South',
    p1: 'Your work as an Australian freediving representative and instructor trainer, deconstructing the mammalian dive reflex into physiological pressure control, is brilliant. Teaching executive leadership teams how to regulate their nervous systems and maintain clarity under intense boardroom pressure is a powerful and necessary skill.'
  },
  {
    name: 'Mike Allsop',
    email: ['mike@mikeallsop.co.nz'],
    subject: 'Executive Wilderness Workshops in NZ — Partnership with Traverse South',
    p1: 'From unguided Everest summits and running seven marathons across seven continents in seven days to piloting active Air New Zealand flights, you embody supreme capability. Your ability to translate cockpit Crew Resource Management and high-consequence aviation safety protocols into everyday executive leadership is an exact fit for the teams we host.'
  },
  {
    name: 'Mark Mathews',
    email: ['hello@markmathews.com'],
    subject: 'Executive Wilderness Workshops in NZ — Partnership with Traverse South',
    p1: 'Your big-wave surfing achievements at Red Bull Cape Fear alongside your psychological frameworks for fear deconstruction and stress recovery have made an extraordinary impact across top global organizations. Teaching executive leaders how to systematically manage risk, overcome fear, and build authentic resilience under extreme pressure is truly world class.'
  },
  {
    name: 'Steve Gurney',
    email: ['steve@stevegurney.co.nz'],
    subject: 'Executive Wilderness Workshops in NZ — Partnership with Traverse South',
    p1: 'As a nine-time Coast to Coast multisport champion and mechanical engineer, your systematic problem-solving, custom equipment innovation, and marginal gains philosophy have shaped outdoor performance in New Zealand for decades. Applying your engineering-grade lateral thinking and NLP problem-solving strategies to executive team performance is an outstanding approach.'
  },
  {
    name: 'Grant "Axe" Rawlinson',
    email: ['grant@powerful-humans.com'],
    subject: 'Executive Wilderness Workshops in NZ — Partnership with Traverse South',
    p1: 'Your track record of human-powered exploration—from the North Ridge of Everest to crossing continents by human power—combined with your commitment to "Bold Unique Goals" (B.U.G.) is remarkable. That exact commitment architecture provides a phenomenal, high-impact blueprint for resource-constrained executive leadership teams.'
  },
  {
    name: 'Ben Logan',
    email: ['info@loganperformancegroup.co.nz'],
    subject: 'Executive Wilderness Workshops in NZ — Traverse South Operational Partnership',
    p1: 'As a fellow operator based directly in our Queenstown and Wānaka backyard, your combination of elite triathlon performance and wilderness survival mastery sets a benchmark for human optimization in the Southern Alps. Teaching executive teams the physiological and psychological fundamentals of outdoor survival and performance right in our local terrain is a natural fit.'
  },
  {
    name: 'Paul Nicholson',
    email: ['paul@newzeal.co.nz', 'teams@newzeal.co.nz'],
    subject: 'Executive Wilderness Workshops in NZ — Traverse South Strategic Partnership',
    p1: 'With over thirty years of outdoor leadership across alpine climbing, skiing, and rafting alongside your pioneering work in the Adventure Philosophy methodology, you have transformed outdoor facilitation across the South Island. Your multi-day wilderness retreats and NLP frameworks provide an exceptional environment for breaking limiting beliefs within executive leadership teams.'
  }
];

async function runBatch() {
  console.log(`Starting batch creation of ${facilitators.length} drafts inside contact@traversesouth.co.nz Outlook folder...\n`);

  for (let i = 0; i < facilitators.length; i++) {
    const f = facilitators[i];
    const htmlBody = `<p style="font-family: Arial, sans-serif; font-size: 14px; color: #222; line-height: 1.5; margin: 0;">Hi ${f.name.split(' ')[0].replace('("Cas")', 'Cas')},<br><br>${f.p1}<br><br>${STD_P2}<br><br>${STD_P3}</p>`;

    try {
      console.log(`[${i + 1}/10] Creating draft for ${f.name} (${f.email.join(', ')})...`);
      const res = await createDraft(f.email, f.subject, htmlBody, true, true);
      console.log(`   ✅ Success! Draft created.`);
    } catch (err: any) {
      console.error(`   ❌ Failed for ${f.name}:`, err.message || err);
    }
  }

  console.log('\n✅ All 10 facilitator drafts have been processed!');
}

runBatch();
