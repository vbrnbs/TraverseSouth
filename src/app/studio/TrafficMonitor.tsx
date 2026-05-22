'use client';

import React, { useState, useEffect, useCallback } from 'react';
import './traffic-monitor.css';

// Interface for API responses
interface SectorMetric {
  name: string;
  count: number;
}

interface ActivityItem {
  visitorId: string;
  pathname: string;
  region: string;
  activityAction: string;
  timestamp: string;
  sessionToken: string;
  screenSize: string;
  referrer: string;
}

interface AnalyticsReport {
  totalViews: number;
  uniqueSessions: number;
  activeVisitors: number;
  viewsTimeSeries: { label: string; value: number }[];
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

  // Poll for real-time analytics updates every 6 seconds
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

  const totalViews = report?.totalViews || 0;
  const uniqueSessions = report?.uniqueSessions || 0;
  const activeVisitors = report?.activeVisitors || 0;
  const viewsTimeSeries = report?.viewsTimeSeries || [];

  const sectors = report?.sectors || {
    fiordland: { name: 'Fiordland Wilderness', count: 0 },
    qtMtCook: { name: 'QT-Mt. Cook Glacial', count: 0 },
    relax: { name: 'Relax & Recover', count: 0 },
    homepage: { name: 'Lodge Gateway / Home', count: 0 },
  };

  const activity = report?.recentActivity || [];
  const devices = report?.devices || { mobile: 0, tablet: 0, desktop: 0 };
  const popularPages = report?.pagePopularity || [];
  
  // Calculate average page views per session
  const avgViewsPerSession = uniqueSessions > 0 ? (totalViews / uniqueSessions).toFixed(1) : '0.0';

  // Group devices for custom layout
  const totalDeviceCount = devices.mobile + devices.tablet + devices.desktop;

  // Generate SVG coordinates for professional trend line chart
  const chartHeight = 140;
  const chartWidth = 600;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const getChartData = () => {
    if (viewsTimeSeries.length === 0) return { linePath: '', areaPath: '', points: [] };

    const maxVal = Math.max(...viewsTimeSeries.map(d => d.value), 20);
    const minVal = 0;
    const valueRange = maxVal - minVal;
    
    const usableWidth = chartWidth - paddingLeft - paddingRight;
    const usableHeight = chartHeight - paddingTop - paddingBottom;

    const points = viewsTimeSeries.map((d, index) => {
      const x = paddingLeft + (index / (viewsTimeSeries.length - 1)) * usableWidth;
      const y = chartHeight - paddingBottom - ((d.value - minVal) / valueRange) * usableHeight;
      return { x, y, label: d.label, value: d.value };
    });

    const linePath = points.reduce((path, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${path} L ${p.x} ${p.y}`;
    }, '');

    const areaPath = points.length > 0
      ? `${linePath} L ${points[points.length - 1].x} ${chartHeight - paddingBottom} L ${points[0].x} ${chartHeight - paddingBottom} Z`
      : '';

    return { linePath, areaPath, points };
  };

  const { linePath, areaPath, points } = getChartData();

  return (
    <div className="traffic-monitor-container">
      {/* Title/Header Area */}
      <header className="monitor-header">
        <div className="monitor-title-area">
          <span className="monitor-eyebrow">// AUDIENCE REPORT</span>
          <h1 className="monitor-title">Web Traffic & Engagement</h1>
        </div>
        <div className="monitor-controls">
          <div className="radar-status">
            <span className="radar-pulse-dot" />
            <span>Live Stream Active</span>
          </div>
          <button
            onClick={handleRefreshClick}
            disabled={isRefreshing || isLoading}
            className="refresh-button"
          >
            {isRefreshing ? 'Syncing...' : 'Sync Live'}
          </button>
        </div>
      </header>

      {error && (
        <div className="telemetry-error-alert">
          // DISCONNECTION DETECTED: {error} (Verify network links or environment setup)
        </div>
      )}

      {isLoading && !report ? (
        <div className="telemetry-loading-state">
          <div className="telemetry-spinner" />
          <span className="telemetry-loading-text">
            // COMPILING AUDIENCE INSIGHTS
          </span>
        </div>
      ) : (
        <>
          {/* Telemetry Stat Cards */}
          <section className="telemetry-grid">
            <div className="telemetry-card">
              <span className="telemetry-label">// ACTIVE VISITORS</span>
              <div className="telemetry-value-row">
                <span className="active-pulse-indicator" />
                <h3 className="telemetry-value" style={{ color: '#37cd84' }}>{activeVisitors}</h3>
              </div>
              <span className="telemetry-sub">Live sessions online now</span>
            </div>
            <div className="telemetry-card">
              <span className="telemetry-label">// TOTAL PAGE VIEWS</span>
              <h3 className="telemetry-value">{totalViews}</h3>
              <span className="telemetry-sub">Overall visitor actions</span>
            </div>
            <div className="telemetry-card">
              <span className="telemetry-label">// UNIQUE SESSIONS</span>
              <h3 className="telemetry-value">{uniqueSessions}</h3>
              <span className="telemetry-sub">Unique audience footprint</span>
            </div>
            <div className="telemetry-card">
              <span className="telemetry-label">// ENGAGEMENT RATIO</span>
              <h3 className="telemetry-value">{avgViewsPerSession}</h3>
              <span className="telemetry-sub">Avg views per visitor session</span>
            </div>
          </section>

          {/* Time Series Analytics Chart Card */}
          <section className="chart-panel-card">
            <div className="panel-header-simple">
              <h4 className="panel-title">// Audience Traffic Trend (Last 7 Days)</h4>
              <span className="chart-legend-label">Daily Views Trend</span>
            </div>
            
            <div className="chart-container-wrapper">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="svg-analytics-chart">
                <defs>
                  <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f36458" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#f36458" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                
                {/* Horizontal Grid lines */}
                <line x1={paddingLeft} y1={paddingTop} x2={chartWidth - paddingRight} y2={paddingTop} className="chart-grid-line" />
                <line x1={paddingLeft} y1={(chartHeight - paddingTop - paddingBottom) / 2 + paddingTop} x2={chartWidth - paddingRight} y2={(chartHeight - paddingTop - paddingBottom) / 2 + paddingTop} className="chart-grid-line" strokeDasharray="3,3" />
                <line x1={paddingLeft} y1={chartHeight - paddingBottom} x2={chartWidth - paddingRight} y2={chartHeight - paddingBottom} className="chart-grid-line" />

                {/* SVG Curves */}
                {areaPath && (
                  <path d={areaPath} fill="url(#chartAreaGradient)" />
                )}
                {linePath && (
                  <path d={linePath} fill="none" stroke="#f36458" strokeWidth="2.5" strokeLinecap="round" />
                )}

                {/* Point markers & hover glow */}
                {points.map((p, idx) => (
                  <g key={idx} className="chart-point-group">
                    <circle cx={p.x} cy={p.y} r="5" fill="#f36458" stroke="#0b0b0b" strokeWidth="1.5" />
                    <circle cx={p.x} cy={p.y} r="10" fill="transparent" className="hover-trigger-circle" />
                    {/* Hover text flag */}
                    <text x={p.x} y={p.y - 12} textAnchor="middle" className="chart-point-tooltip">
                      {p.value}
                    </text>
                  </g>
                ))}

                {/* Axis Labels */}
                {points.map((p, idx) => (
                  <text key={idx} x={p.x} y={chartHeight - 10} textAnchor="middle" className="chart-axis-label">
                    {p.label}
                  </text>
                ))}
              </svg>
            </div>
          </section>

          {/* Two-Column Mid-Tier Information Panel */}
          <div className="dashboard-columns">
            {/* Column 1: Top Pages Table */}
            <div className="panel-card">
              <div className="panel-title-area">
                <h4 className="panel-title">// Top Visited Pages</h4>
              </div>
              <div className="popularity-list">
                {popularPages.slice(0, 5).map((item, idx) => (
                  <div key={idx} className="popular-page-row">
                    <div className="page-meta-row">
                      <span className="page-path">{item.path}</span>
                      <span className="page-count">{item.count} views</span>
                    </div>
                    <div className="page-bar-track">
                      <div 
                        className="page-bar-fill" 
                        style={{ width: getPercentage(item.count, Math.max(...popularPages.map(p => p.count), 1)) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Regional & Device footprint details */}
            <div className="panel-card">
              <div className="panel-title-area">
                <h4 className="panel-title">// Device & Region Footprint</h4>
              </div>

              {/* Devices progress block */}
              <div className="device-progress-section">
                <h5 className="sub-section-title">// Access Devices</h5>
                <div className="device-bar-multi">
                  <div 
                    className="device-segment ds-desktop" 
                    style={{ width: getPercentage(devices.desktop, totalDeviceCount) }} 
                    title={`Desktop: ${devices.desktop}`} 
                  />
                  <div 
                    className="device-segment ds-tablet" 
                    style={{ width: getPercentage(devices.tablet, totalDeviceCount) }} 
                    title={`Tablet: ${devices.tablet}`} 
                  />
                  <div 
                    className="device-segment ds-mobile" 
                    style={{ width: getPercentage(devices.mobile, totalDeviceCount) }} 
                    title={`Mobile: ${devices.mobile}`} 
                  />
                </div>
                <div className="device-legend-row">
                  <span className="legend-item"><span className="legend-color-dot ds-desktop-dot" />Desktop: {getPercentage(devices.desktop, totalDeviceCount)}</span>
                  <span className="legend-item"><span className="legend-color-dot ds-tablet-dot" />Tablet: {getPercentage(devices.tablet, totalDeviceCount)}</span>
                  <span className="legend-item"><span className="legend-color-dot ds-mobile-dot" />Mobile: {getPercentage(devices.mobile, totalDeviceCount)}</span>
                </div>
              </div>

              {/* Region interests */}
              <div style={{ marginTop: '28px', borderTop: '1px solid #353535', paddingTop: '20px' }}>
                <h5 className="sub-section-title">// Regional Sector Distribution</h5>
                <div className="sector-list-simple">
                  <div className="sector-inline-item">
                    <span className="sector-inline-name">{sectors.fiordland.name}</span>
                    <span className="sector-inline-val" style={{ color: '#37cd84' }}>{sectors.fiordland.count} hits</span>
                  </div>
                  <div className="sector-inline-item">
                    <span className="sector-inline-name">{sectors.qtMtCook.name}</span>
                    <span className="sector-inline-val" style={{ color: '#f36458' }}>{sectors.qtMtCook.count} hits</span>
                  </div>
                  <div className="sector-inline-item">
                    <span className="sector-inline-name">{sectors.relax.name}</span>
                    <span className="sector-inline-val" style={{ color: '#55beff' }}>{sectors.relax.count} hits</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Web Navigation Stream */}
          <section className="detail-table-panel">
            <div className="panel-title-area" style={{ borderBottom: 'none', paddingBottom: '0', marginBottom: '20px' }}>
              <h4 className="panel-title">// Live Traffic Audit Stream</h4>
              <span className="stream-badge-pulse">REAL-TIME INFLOW</span>
            </div>
            
            <div className="manifest-scroll-container">
              <div className="manifest-list">
                {activity.length === 0 ? (
                  <div className="empty-manifest-placeholder">
                    // WAITING FOR WEBAUDIENCE TRAFFIC ACTIVITY
                  </div>
                ) : (
                  activity.map((item, idx) => {
                    let actionColor = '#b9b9b9';
                    if (item.activityAction.includes('Fiordland')) actionColor = '#37cd84';
                    else if (item.activityAction.includes('QT')) actionColor = '#f36458';
                    else if (item.activityAction.includes('Relax')) actionColor = '#55beff';
                    else if (item.activityAction.includes('CMS')) actionColor = '#a78bfa';

                    return (
                      <div key={idx} className="manifest-item">
                        <div className="manifest-time-cell">
                          {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </div>
                        <div className="manifest-visitor-cell">
                          <span className="visitor-badge">{item.visitorId}</span>
                        </div>
                        <div className="manifest-action-cell">
                          <span style={{ color: actionColor, fontWeight: 500 }}>{item.activityAction}</span>
                          <span className="manifest-sub-path">{item.pathname}</span>
                        </div>
                        <div className="manifest-region-cell">
                          {item.region}
                        </div>
                        <div className="manifest-screen-cell">
                          {item.screenSize}
                        </div>
                        <div className="manifest-referrer-cell" title={item.referrer}>
                          via {item.referrer.replace('http://localhost:3000/', 'localhost')}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

// Tool Registration structure matching Sanity defineConfig type
export const TrafficMonitorTool = {
  name: 'traffic-analytics',
  title: 'Analytics',
  icon: () => (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ fontSize: '1.2em' }}
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  component: TrafficMonitorDashboard,
};
