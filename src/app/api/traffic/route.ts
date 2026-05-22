import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const LOG_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'traffic-logs.json');

// Interface for Traffic Logs
interface TrafficEntry {
  pathname: string;
  referrer: string;
  language: string;
  screenSize: string;
  userAgent: string;
  sessionToken: string;
  timestamp: string;
}

// Read logs safely
async function getLogs(): Promise<TrafficEntry[]> {
  try {
    const data = await fs.readFile(LOG_FILE_PATH, 'utf-8');
    return JSON.parse(data) as TrafficEntry[];
  } catch (error) {
    // If file doesn't exist or is invalid JSON, return empty array
    return [];
  }
}

// Write logs safely
async function saveLogs(logs: TrafficEntry[]): Promise<void> {
  // Cap logs to last 5000 entries to prevent memory/file bloat in production
  const cappedLogs = logs.slice(-5000);
  await fs.writeFile(LOG_FILE_PATH, JSON.stringify(cappedLogs, null, 2), 'utf-8');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pathname, referrer, language, screenSize, userAgent, sessionToken } = body;

    if (!pathname) {
      return NextResponse.json({ error: 'Pathname is required' }, { status: 400 });
    }

    const newEntry: TrafficEntry = {
      pathname,
      referrer: referrer || 'Direct',
      language: language || 'unknown',
      screenSize: screenSize || 'unknown',
      userAgent: userAgent || 'unknown',
      sessionToken: sessionToken || 'unknown',
      timestamp: new Date().toISOString(),
    };

    const logs = await getLogs();
    logs.push(newEntry);
    await saveLogs(logs);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving traffic log:', error);
    return NextResponse.json({ error: 'Failed to record traffic log', details: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const logs = await getLogs();

    // 1. Total views
    const totalViews = logs.length;

    // 2. Unique sessions
    const uniqueSessions = new Set(logs.map(log => log.sessionToken)).size;

    // 3. Page popularity distribution
    const pageCounts: Record<string, number> = {};
    logs.forEach(log => {
      pageCounts[log.pathname] = (pageCounts[log.pathname] || 0) + 1;
    });

    const pagePopularity = Object.entries(pageCounts).map(([path, count]) => ({
      path,
      count,
    })).sort((a, b) => b.count - a.count);

    // 4. Sector metrics (Fiordland, QT & Mt. Cook, Relax)
    // Map pathnames containing 'fiordland', 'qt-mtcook', or 'relax'
    let fiordlandHits = 0;
    let qtHits = 0;
    let relaxHits = 0;
    let homepageHits = 0;

    logs.forEach(log => {
      const p = log.pathname.toLowerCase();
      if (p.includes('fiordland')) {
        fiordlandHits++;
      } else if (p.includes('qt-mtcook')) {
        qtHits++;
      } else if (p.includes('relax')) {
        relaxHits++;
      } else if (p === '/' || p === '/packages') {
        homepageHits++;
      }
    });

    const sectors = {
      fiordland: { name: 'Fiordland Wilderness', count: fiordlandHits },
      qtMtCook: { name: 'QT-Mt. Cook Glacial', count: qtHits },
      relax: { name: 'Relax & Recover', count: relaxHits },
      homepage: { name: 'Lodge Gateway / Home', count: homepageHits },
    };

    // 5. Active Flight manifest slots (recent activity formatted with military aviation codes)
    const recentActivity = logs.slice(-25).map((log, index) => {
      // Extract segment from pathname to generate aviation code
      const segment = log.pathname.split('/').pop() || 'HOME';
      const flightCode = `TS-${segment.substring(0, 3).toUpperCase()}-${100 + (index % 900)}`;
      
      // Determine sector status
      let altitude = 'DEPARTED';
      let coordinates = '45.0312° S, 168.6626° E'; // QT default
      if (segment.includes('fiordland')) {
        altitude = 'ALTITUDE SECURED';
        coordinates = '44.6414° S, 167.8974° E';
      } else if (segment.includes('qt-mtcook')) {
        altitude = 'CRUISING ENVELOPE';
        coordinates = '43.7342° S, 170.0962° E';
      } else if (segment.includes('relax')) {
        altitude = 'APPROACH INBOUND';
        coordinates = '45.0312° S, 168.6626° E';
      } else {
        altitude = 'GATEWAY ACTIVE';
      }

      return {
        flightCode,
        pathname: log.pathname,
        coordinates,
        altitude,
        timestamp: log.timestamp,
        sessionToken: log.sessionToken,
        screenSize: log.screenSize,
        referrer: log.referrer,
      };
    }).reverse(); // newest first

    // 6. Device breakdown based on screen sizes
    let mobileCount = 0;
    let tabletCount = 0;
    let desktopCount = 0;

    logs.forEach(log => {
      if (log.screenSize && log.screenSize !== 'unknown') {
        const width = parseInt(log.screenSize.split('x')[0], 10);
        if (width < 768) mobileCount++;
        else if (width < 1024) tabletCount++;
        else desktopCount++;
      } else {
        desktopCount++; // default
      }
    });

    const devices = {
      mobile: mobileCount,
      tablet: tabletCount,
      desktop: desktopCount,
    };

    return NextResponse.json({
      totalViews,
      uniqueSessions,
      sectors,
      pagePopularity,
      recentActivity,
      devices,
    });
  } catch (error: any) {
    console.error('Error generating traffic report:', error);
    return NextResponse.json({ error: 'Failed to aggregate traffic metrics', details: error.message }, { status: 500 });
  }
}
