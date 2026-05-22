'use client';

import React, { useState, useEffect, useCallback } from 'react';
import './traffic-monitor.css';

// Interface for API responses
interface SectorMetric {
  name: string;
  count: number;
}

interface ActivityItem {
  flightCode: string;
  pathname: string;
  coordinates: string;
  altitude: string;
  timestamp: string;
  sessionToken: string;
  screenSize: string;
  referrer: string;
}

interface AnalyticsReport {
  totalViews: number;
  uniqueSessions: number;
  sectors: {
    fiordland: SectorMetric;
    qtMtCook: SectorMetric;
    relax: SectorMetric;
    homepage: SectorMetric;
  };
  pagePopularity: { path: string; count: number }[];
  recentActivity: ActivityItem[];
  devices: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

export default function TrafficMonitorDashboard() {
  const [report, setReport] = useState<AnalyticsReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrafficData = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/traffic');
      if (!response.ok) {
        throw new Error(`Operational reporting failure: ${response.status}`);
      }
      const data = await response.json();
      setReport(data);
    } catch (err: any) {
      console.error('Failed to fetch traffic stats:', err);
      setError(err.message || 'System telemetry link broken');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Poll for real-time analytics updates
  useEffect(() => {
    fetchTrafficData();

    const interval = setInterval(() => {
      fetchTrafficData(true); // background/silent polling
    }, 6000);

    return () => clearInterval(interval);
  }, [fetchTrafficData]);

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    fetchTrafficData(false);
  };

  // Safe percentage helper for gauge rendering
  const getPercentage = (value: number, total: number) => {
    if (!total || total === 0) return '0%';
    const pct = (value / total) * 100;
    return `${Math.min(100, Math.max(0, Math.round(pct)))}%`;
  };

  // Safe split helper for device metrics
  const totalViews = report?.totalViews || 0;
  const uniqueSessions = report?.uniqueSessions || 0;
  const sectors = report?.sectors || {
    fiordland: { name: 'Fiordland Wilderness', count: 0 },
    qtMtCook: { name: 'QT-Mt. Cook Glacial', count: 0 },
    relax: { name: 'Relax & Recover', count: 0 },
    homepage: { name: 'Lodge Gateway / Home', count: 0 },
  };

  const activity = report?.recentActivity || [];
  const devices = report?.devices || { mobile: 0, tablet: 0, desktop: 0 };
  const popularPages = report?.pagePopularity || [];

  return (
    <div className="traffic-monitor-container">
      {/* Title/Header Area */}
      <header className="monitor-header">
        <div className="monitor-title-area">
          <span className="monitor-eyebrow">// TRAVERSE SOUTH FLIGHT CENTER</span>
          <h1 className="monitor-title">Telemetry & Radar Dashboard</h1>
        </div>
        <div className="monitor-controls">
          <div className="radar-status">
            <span className="radar-pulse-dot" />
            <span>Active Sector Radar Status: Nominal</span>
          </div>
          <button
            onClick={handleRefreshClick}
            disabled={isRefreshing || isLoading}
            className="refresh-button"
          >
            {isRefreshing ? 'Re-aligning Sweep...' : 'Refresh Radar'}
          </button>
        </div>
      </header>

      {error && (
        <div
          style={{
            border: '1px solid #dd0000',
            backgroundColor: 'rgba(221,0,0,0.05)',
            padding: '16px',
            borderRadius: '4px',
            color: '#ffffff',
            fontSize: '13px',
            fontFamily: 'var(--font-ibm-plex-mono), monospace',
            marginBottom: '32px',
          }}
        >
          // ERROR DEPLOYED: {error} (Check Next.js logs or environment link)
        </div>
      )}

      {/* Loading overlay for major refreshing states */}
      {isLoading && !report ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              border: '2px solid rgba(243,100,88,0.1)',
              borderTop: '2px solid #f36458',
              borderRadius: '50%',
              animation: 'studio-spin 1s linear infinite',
            }}
          />
          <span style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '11px', color: '#797979' }}>
            // RESOLVING ENCRYPTED SATELLITE COMMS
          </span>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes studio-spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}} />
        </div>
      ) : (
        <>
          {/* Telemetry Stat Cards */}
          <section className="telemetry-grid">
            <div className="telemetry-card">
              <span className="telemetry-label">// TOTAL SECTOR HITS</span>
              <h3 className="telemetry-value">{totalViews}</h3>
              <span className="telemetry-sub">Raw request footprints</span>
            </div>
            <div className="telemetry-card">
              <span className="telemetry-label">// DISPATCHED CHARTERS</span>
              <h3 className="telemetry-value">{uniqueSessions}</h3>
              <span className="telemetry-sub">Unique visitor sessions tracked</span>
            </div>
            <div className="telemetry-card">
              <span className="telemetry-label">// FLIGHT ENVELOPES</span>
              <h3 className="telemetry-value">
                {sectors.fiordland.count + sectors.qtMtCook.count + sectors.relax.count}
              </h3>
              <span className="telemetry-sub">Bespoke regional interactions</span>
            </div>
            <div className="telemetry-card">
              <span className="telemetry-label">// PLATFORM COVENANT</span>
              <h3 className="telemetry-value">
                {totalViews > 0
                  ? Math.round(
                      ((sectors.fiordland.count + sectors.qtMtCook.count + sectors.relax.count) / totalViews) *
                        100
                    )
                  : 0}
                %
              </h3>
              <span className="telemetry-sub">Engagement Conversion Ratio</span>
            </div>
          </section>

          {/* Two-Column Main Content Panel */}
          <div className="dashboard-columns">
            {/* Column 1: Sector Interest Distribution & Device breakdown */}
            <div className="panel-card">
              <div className="panel-title-area">
                <h4 className="panel-title">// Package Sector Distribution</h4>
              </div>

              <div className="sector-list">
                {/* Fiordland */}
                <div className="sector-item">
                  <div className="sector-meta">
                    <span className="sector-name">{sectors.fiordland.name}</span>
                    <span className="sector-val-label" style={{ color: '#37cd84' }}>
                      {sectors.fiordland.count} ({getPercentage(sectors.fiordland.count, totalViews)})
                    </span>
                  </div>
                  <div className="gauge-track">
                    <div
                      className="gauge-bar fiordland-gauge"
                      style={{ width: getPercentage(sectors.fiordland.count, totalViews) }}
                    />
                  </div>
                </div>

                {/* QT Mt Cook */}
                <div className="sector-item">
                  <div className="sector-meta">
                    <span className="sector-name">{sectors.qtMtCook.name}</span>
                    <span className="sector-val-label" style={{ color: '#f36458' }}>
                      {sectors.qtMtCook.count} ({getPercentage(sectors.qtMtCook.count, totalViews)})
                    </span>
                  </div>
                  <div className="gauge-track">
                    <div
                      className="gauge-bar qt-gauge"
                      style={{ width: getPercentage(sectors.qtMtCook.count, totalViews) }}
                    />
                  </div>
                </div>

                {/* Relax */}
                <div className="sector-item">
                  <div className="sector-meta">
                    <span className="sector-name">{sectors.relax.name}</span>
                    <span className="sector-val-label" style={{ color: '#55beff' }}>
                      {sectors.relax.count} ({getPercentage(sectors.relax.count, totalViews)})
                    </span>
                  </div>
                  <div className="gauge-track">
                    <div
                      className="gauge-bar relax-gauge"
                      style={{ width: getPercentage(sectors.relax.count, totalViews) }}
                    />
                  </div>
                </div>

                {/* Homepage */}
                <div className="sector-item">
                  <div className="sector-meta">
                    <span className="sector-name">{sectors.homepage.name}</span>
                    <span className="sector-val-label" style={{ color: '#797979' }}>
                      {sectors.homepage.count} ({getPercentage(sectors.homepage.count, totalViews)})
                    </span>
                  </div>
                  <div className="gauge-track">
                    <div
                      className="gauge-bar homepage-gauge"
                      style={{ width: getPercentage(sectors.homepage.count, totalViews) }}
                    />
                  </div>
                </div>
              </div>

              {/* Animated Radar Sweep Decoration */}
              <div className="radar-sweep-panel">
                <div className="radar-sweep-circle" />
                <span className="radar-label">Realtime Sweep Tracking</span>
              </div>

              {/* Device breakdown */}
              <div style={{ marginTop: '32px', borderTop: '1px solid #353535', paddingTop: '24px' }}>
                <h4 className="panel-title" style={{ marginBottom: '16px' }}>// Device Footprint Breakdown</h4>
                <div className="device-stats">
                  <div className="device-stat-item">
                    <span className="device-stat-val">{devices.desktop}</span>
                    <span className="device-stat-lbl">Desktop</span>
                  </div>
                  <div className="device-stat-item" style={{ borderLeft: '1px solid #353535', paddingLeft: '24px' }}>
                    <span className="device-stat-val">{devices.tablet}</span>
                    <span className="device-stat-lbl">Tablet</span>
                  </div>
                  <div className="device-stat-item" style={{ borderLeft: '1px solid #353535', paddingLeft: '24px' }}>
                    <span className="device-stat-val">{devices.mobile}</span>
                    <span className="device-stat-lbl">Mobile</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Active flight slots manifest */}
            <div className="panel-card">
              <div className="panel-title-area">
                <h4 className="panel-title">// Active Flight Slot Manifest</h4>
                <span style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '10px', color: '#f36458' }}>
                  [ LIVE RADAR FEED ]
                </span>
              </div>

              <div className="manifest-list">
                {activity.length === 0 ? (
                  <div
                    style={{
                      fontFamily: 'var(--font-ibm-plex-mono), monospace',
                      fontSize: '11px',
                      color: '#797979',
                      textAlign: 'center',
                      padding: '40px 0',
                    }}
                  >
                    // WAITING FOR VISITOR SECTOR Footprint
                  </div>
                ) : (
                  activity.map((item, idx) => {
                    let statusClass = 'status-gateway';
                    if (item.altitude.includes('SECURED')) statusClass = 'status-secured';
                    else if (item.altitude.includes('CRUISING')) statusClass = 'status-cruising';
                    else if (item.altitude.includes('APPROACH')) statusClass = 'status-inbound';

                    return (
                      <div key={idx} className="manifest-item">
                        <span className="manifest-code">{item.flightCode}</span>
                        <span className="manifest-path" title={item.pathname}>
                          {item.pathname}
                        </span>
                        <span className="manifest-coords">{item.coordinates}</span>
                        <span className={`manifest-status ${statusClass}`}>
                          {item.altitude}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Detailed raw logs table at bottom */}
          <section className="detail-table-panel">
            <h4 className="panel-title" style={{ marginBottom: '20px' }}>// Comprehensive Navigation Ledger</h4>
            <div style={{ overflowX: 'auto' }}>
              <table className="detail-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Ident</th>
                    <th>Aviation Path</th>
                    <th>Terminal Spec</th>
                    <th>Aviation Source / Referrer</th>
                  </tr>
                </thead>
                <tbody>
                  {activity.slice(0, 10).map((item, idx) => (
                    <tr key={idx}>
                      <td className="detail-time">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </td>
                      <td style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '11px' }}>
                        {item.sessionToken.substring(8, 14).toUpperCase()}
                      </td>
                      <td className="detail-path">{item.pathname}</td>
                      <td>{item.screenSize}</td>
                      <td>{item.referrer}</td>
                    </tr>
                  ))}
                  {activity.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '24px 0', color: '#797979', fontFamily: 'var(--font-ibm-plex-mono), monospace' }}>
                        // LEDGER EMPTY. ENGAGE EXPEDITIONS.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

// Tool Registration structure matching Sanity defineConfig type
export const TrafficMonitorTool = {
  name: 'traffic-monitor',
  title: 'Traffic Radar',
  icon: () => (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 25 25"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      style={{ fontSize: '1.2em' }}
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" strokeDasharray="2,2" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <line x1="12" y1="12" x2="18" y2="6" strokeWidth="2" />
    </svg>
  ),
  component: TrafficMonitorDashboard,
};
