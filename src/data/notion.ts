import { Client } from '@notionhq/client';

const GOALS_DB_ID = '9ec4124b-97f8-43f2-a5c2-a8f59184d133';
const SPRINT_DB_ID = 'b0f5e826-a6db-4e7b-aca3-1ceb4600eb7a';

function getNotionClient() {
  return new Client({ auth: process.env.NOTION_API_KEY });
}

export interface NotionTask {
  id: string;
  name: string;
  status: 'backlog' | 'sprint' | 'in-progress' | 'done' | 'replanned';
  energy: '🔥' | '🔥🔥' | '🔥🔥🔥';
  priority: 'sales-wolf' | 'launch-blocker' | 'delegation' | 'polish';
  sprint: number;
  week?: string;
  completedDate?: string;
  connectsTo?: string;
}

export interface NotionQuarterGoal {
  title: string;
  keyResults: string[];
  progress: number;
}

export async function getQuarterGoal(): Promise<NotionQuarterGoal | null> {
  if (!process.env.NOTION_API_KEY) return null;

  try {
    const response = await getNotionClient().dataSources.query({
      data_source_id: GOALS_DB_ID,
      filter: {
        property: 'Status',
        select: {
          equals: 'Active',
        },
      },
    });

    if (response.results.length === 0) return null;

    const page: any = response.results[0];
    const properties = page.properties;

    const title = properties.Goal?.title?.[0]?.plain_text || 'Active Goal';
    const progress = properties.Progress?.number || 0;
    const keyResultsRaw = properties['Key Results']?.rich_text?.[0]?.plain_text || '';
    // Handle both literal string "\n" and actual newlines
    const keyResults = keyResultsRaw.split(/\\n|\n/).map(s => s.trim()).filter(Boolean);

    return {
      title,
      keyResults,
      progress,
    };
  } catch (error) {
    console.error('Error fetching Notion Goal:', error);
    return null;
  }
}

export async function getSprintData(sprintNumber: number): Promise<{ tasks: NotionTask[] }> {
  if (!process.env.NOTION_API_KEY) return { tasks: [] };

  try {
    const response = await getNotionClient().dataSources.query({
      data_source_id: SPRINT_DB_ID,
      filter: {
        property: 'Sprint',
        number: {
          equals: sprintNumber,
        },
      },
      sorts: [
        {
          property: 'Status',
          direction: 'ascending',
        },
      ],
    });

    const tasks: NotionTask[] = response.results.map((page: any) => {
      const p = page.properties;

      // Map Status string to internal type
      const statusMap: Record<string, NotionTask['status']> = {
        'Backlog': 'backlog',
        'This Sprint': 'sprint',
        'In Progress': 'in-progress',
        'Done': 'done',
        'Replanned': 'replanned',
      };
      const rawStatus = p.Status?.select?.name || 'Backlog';

      // Map Priority string to internal type
      const rawPriority = p.Priority?.select?.name || '';
      let priority: NotionTask['priority'] = 'polish';
      if (rawPriority.includes('Sales Wolf')) priority = 'sales-wolf';
      if (rawPriority.includes('Launch Blocker')) priority = 'launch-blocker';
      if (rawPriority.includes('Delegation')) priority = 'delegation';

      // Map Energy
      const rawEnergy = p.Energy?.select?.name || '';
      let energy: NotionTask['energy'] = '🔥';
      if (rawEnergy.includes('🔥🔥🔥')) energy = '🔥🔥🔥';
      else if (rawEnergy.includes('🔥🔥')) energy = '🔥🔥';

      return {
        id: page.id,
        name: p.Task?.title?.[0]?.plain_text || 'Untitled Task',
        status: statusMap[rawStatus] || 'backlog',
        energy,
        priority,
        sprint: p.Sprint?.number || sprintNumber,
        week: p.Week?.date?.start || undefined,
        completedDate: p.Completed?.date?.start || undefined,
        connectsTo: p['Connects To']?.select?.name || undefined,
      };
    });

    return { tasks };
  } catch (error) {
    console.error('Error fetching Notion Sprint Tasks:', error);
    return { tasks: [] };
  }
}

