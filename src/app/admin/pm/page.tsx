import { cookies } from 'next/headers';
import { PinGateClient } from './PinGateClient';
import { DashboardClient } from './DashboardClient';
import { getQuarterGoal, getSprintData } from '@/data/notion';

export default async function PMDashboardPage() {
  // Check if authenticated
  const authCookie = (await cookies()).get('pm_auth');

  if (!authCookie) {
    // Render the PIN gate
    return <PinGateClient />;
  }

  // Fetch Notion Data
  const quarter = await getQuarterGoal();
  const sprintData = await getSprintData(1); // Fetching Sprint 1

  return <DashboardClient quarter={quarter} tasks={sprintData.tasks} />;
}
