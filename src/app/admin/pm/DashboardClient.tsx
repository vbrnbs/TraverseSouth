'use client';

import { NotionTask, NotionQuarterGoal } from '@/data/notion';

/* ─────────────────────────────────────────────
   Priority Badge
   ───────────────────────────────────────────── */
function PriorityBadge({ priority }: { priority: NotionTask['priority'] }) {
  const config = {
    'sales-wolf': { label: '🐺 Sales Wolf', bg: 'rgba(243, 100, 88, 0.12)', color: '#f36458' },
    'launch-blocker': { label: '🚀 Launch Blocker', bg: 'rgba(55, 205, 132, 0.12)', color: '#37cd84' },
    'delegation': { label: '🤖 Delegation', bg: 'rgba(85, 190, 255, 0.12)', color: '#55beff' },
    'polish': { label: '🔧 Polish', bg: 'rgba(121, 121, 121, 0.12)', color: '#797979' },
  };
  const c = config[priority];

  return (
    <span style={{
      fontSize: '10px',
      fontFamily: 'var(--font-ibm-plex-mono), monospace',
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      padding: '3px 8px',
      borderRadius: '99px',
      backgroundColor: c.bg,
      color: c.color,
      whiteSpace: 'nowrap',
    }}>
      {c.label}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Status Badge
   ───────────────────────────────────────────── */
function StatusBadge({ status }: { status: NotionTask['status'] }) {
  const config: Record<NotionTask['status'], { label: string; bg: string; color: string; dot: string }> = {
    'backlog': { label: 'Backlog', bg: 'rgba(121, 121, 121, 0.08)', color: '#797979', dot: '#797979' },
    'sprint': { label: 'This Sprint', bg: 'rgba(85, 190, 255, 0.08)', color: '#55beff', dot: '#55beff' },
    'in-progress': { label: 'In Progress', bg: 'rgba(243, 100, 88, 0.08)', color: '#f36458', dot: '#f36458' },
    'done': { label: 'Done', bg: 'rgba(55, 205, 132, 0.08)', color: '#37cd84', dot: '#37cd84' },
    'replanned': { label: 'Replanned', bg: 'rgba(121, 121, 121, 0.08)', color: '#797979', dot: '#797979' },
  };
  const c = config[status];

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '11px',
      fontFamily: 'var(--font-ibm-plex-mono), monospace',
      padding: '3px 10px',
      borderRadius: '99px',
      backgroundColor: c.bg,
      color: c.color,
    }}>
      <span style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: c.dot,
        flexShrink: 0,
      }} />
      {c.label}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Task Card
   ───────────────────────────────────────────── */
function TaskCard({ task }: { task: NotionTask }) {
  return (
    <div style={{
      backgroundColor: '#212121',
      border: '1px solid #353535',
      borderRadius: '6px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      transition: 'border-color 0.2s',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '12px',
      }}>
        <span style={{
          fontSize: '14px',
          fontWeight: 500,
          color: '#fff',
          lineHeight: 1.4,
          flex: 1,
        }}>
          {task.name}
        </span>
        <span style={{
          fontSize: '14px',
          flexShrink: 0,
        }}>
          {task.energy}
        </span>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
      }}>
        <StatusBadge status={task.status} />
        <PriorityBadge priority={task.priority} />
        {task.connectsTo && (
          <span style={{
            fontSize: '10px',
            color: '#797979',
            fontFamily: 'var(--font-ibm-plex-mono), monospace',
          }}>
            → {task.connectsTo}
          </span>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Progress Ring (SVG)
   ───────────────────────────────────────────── */
function ProgressRing({ progress, size = 80 }: { progress: number; size?: number }) {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#353535"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#f36458"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Section Header
   ───────────────────────────────────────────── */
function SectionHeader({ label, children }: { label: string; children?: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-ibm-plex-mono), monospace',
        fontSize: '11px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: '#797979',
        fontWeight: 500,
      }}>
        {label}
      </h2>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   DashboardClient Main Component
   ───────────────────────────────────────────── */
export function DashboardClient({
  quarter,
  tasks
}: {
  quarter: NotionQuarterGoal | null,
  tasks: NotionTask[]
}) {
  const tasksByStatus = (status: NotionTask['status']) =>
    tasks.filter(t => t.status === status);

  const totalTasks = tasks.length;
  const doneTasks = tasksByStatus('done').length;
  const inProgressTasks = tasksByStatus('in-progress').length;
  const sprintProgress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  // Calculate Time Tracking Stats
  const getTimeStats = () => {
    const now = new Date();

    // Define Q3 2026 (July 1, 2026 - Sept 30, 2026)
    const quarterStart = new Date(2026, 6, 1); // July 1st
    const quarterEnd = new Date(2026, 8, 30, 23, 59, 59); // Sept 30th

    const totalQuarterMs = quarterEnd.getTime() - quarterStart.getTime();
    let quarterElapsedMs = now.getTime() - quarterStart.getTime();

    if (quarterElapsedMs < 0) quarterElapsedMs = 0;
    if (quarterElapsedMs > totalQuarterMs) quarterElapsedMs = totalQuarterMs;

    const quarterPercent = Math.round((quarterElapsedMs / totalQuarterMs) * 100);
    const quarterDaysLeft = Math.ceil((quarterEnd.getTime() - Math.max(now.getTime(), quarterStart.getTime())) / (1000 * 60 * 60 * 24));

    // Calculate relative to the active sprint number fetched from the tasks
    const sprintNumber = tasks[0]?.sprint || 1;
    const sprintStartRef = new Date(2026, 6, 1); // Sprint 1 starts July 1st, 2026
    const msPerDay = 1000 * 60 * 60 * 24;
    const msPerSprint = 14 * msPerDay;

    const activeSprintStart = new Date(sprintStartRef.getTime() + (sprintNumber - 1) * msPerSprint);
    const activeSprintEnd = new Date(activeSprintStart.getTime() + msPerSprint - 1000); // 14 days later minus 1s

    let sprintElapsedMs = now.getTime() - activeSprintStart.getTime();
    if (sprintElapsedMs < 0) sprintElapsedMs = 0;
    if (sprintElapsedMs > msPerSprint) sprintElapsedMs = msPerSprint;

    const sprintPercent = Math.round((sprintElapsedMs / msPerSprint) * 100);
    const sprintDaysLeft = Math.ceil((activeSprintEnd.getTime() - Math.max(now.getTime(), activeSprintStart.getTime())) / msPerDay);

    return {
      sprintPercent,
      sprintDaysLeft: Math.max(sprintDaysLeft, 0),
      quarterPercent,
      quarterDaysLeft: Math.max(quarterDaysLeft, 0)
    };
  };

  const timeStats = getTimeStats();

  // Check if there's a "sales wolf" task in the sprint
  const salesWolfTasks = tasks.filter(t => t.priority === 'sales-wolf');
  const hasSalesWolfInProgress = salesWolfTasks.some(t => t.status === 'in-progress' || t.status === 'done');

  return (
    <div style={{
      maxWidth: '640px',
      margin: '0 auto',
      padding: '24px 16px 64px',
      fontFamily: 'var(--font-inter), sans-serif',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '32px',
        paddingBottom: '16px',
        borderBottom: '1px solid #353535',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#f36458',
          }} />
          <span style={{
            fontWeight: 600,
            fontSize: '16px',
            color: '#fff',
            letterSpacing: '-0.3px',
          }}>
            PM Dashboard
          </span>
        </div>
        <span style={{
          fontFamily: 'var(--font-ibm-plex-mono), monospace',
          fontSize: '11px',
          color: '#797979',
        }}>
          {new Date().toLocaleDateString('en-NZ', { weekday: 'short', day: 'numeric', month: 'short' })}
        </span>
      </div>

      {/* ── Quarter Goal ──────────────────── */}
      {quarter ? (
        <section style={{ marginBottom: '32px' }}>
          <SectionHeader label="// Quarterly Goal" />
          <div style={{
            backgroundColor: '#212121',
            border: '1px solid #353535',
            borderRadius: '6px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}>
            <ProgressRing progress={quarter.progress} />
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#fff',
                marginBottom: '8px',
                letterSpacing: '-0.3px',
              }}>
                {quarter.title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {quarter.keyResults.map((kr, i) => (
                  <span key={i} style={{
                    fontSize: '12px',
                    color: '#b9b9b9',
                    lineHeight: 1.5,
                  }}>
                    {kr}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div style={{ padding: '20px', color: '#797979', border: '1px dashed #353535', marginBottom: '32px', borderRadius: '6px' }}>
          No active Quarter Goal found in Notion.
        </div>
      )}

      {/* ── Sales Wolf Alert ──────────────── */}
      {!hasSalesWolfInProgress && totalTasks > 0 && (
        <div style={{
          backgroundColor: 'rgba(243, 100, 88, 0.06)',
          border: '1px solid rgba(243, 100, 88, 0.2)',
          borderRadius: '6px',
          padding: '14px 16px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <span style={{ fontSize: '16px' }}>🐺</span>
          <span style={{
            fontSize: '12px',
            color: '#f36458',
            fontWeight: 500,
            lineHeight: 1.4,
          }}>
            No Sales Wolf task in progress. Are you building instead of selling?
          </span>
        </div>
      )}

      {/* ── Active Sprint ─────────────────── */}
      <section style={{ marginBottom: '32px' }}>
        <SectionHeader label="// Active Sprint">
          <span style={{
            fontSize: '12px',
            fontFamily: 'var(--font-ibm-plex-mono), monospace',
            color: '#55beff',
          }}>
            {doneTasks}/{totalTasks} done
          </span>
        </SectionHeader>

        {totalTasks === 0 ? (
          <div style={{ padding: '20px', color: '#797979', border: '1px dashed #353535', borderRadius: '6px' }}>
            No tasks found in the current sprint.
          </div>
        ) : (
          <>
            <div style={{
              backgroundColor: '#212121',
              border: '1px solid #353535',
              borderRadius: '6px',
              padding: '16px',
              marginBottom: '16px',
            }}>
              {/* Sprint progress bar */}
              <div style={{
                height: '4px',
                backgroundColor: '#353535',
                borderRadius: '2px',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${sprintProgress}%`,
                  backgroundColor: '#37cd84',
                  borderRadius: '2px',
                  transition: 'width 0.5s ease',
                }} />
              </div>
            </div>

            {/* Task columns */}
            {(['in-progress', 'sprint', 'backlog'] as const).map(status => {
              const statusTasks = tasksByStatus(status);
              if (statusTasks.length === 0) return null;
              return (
                <div key={status} style={{ marginBottom: '16px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                  }}>
                    <StatusBadge status={status} />
                    <span style={{
                      fontSize: '11px',
                      color: '#797979',
                      fontFamily: 'var(--font-ibm-plex-mono), monospace',
                    }}>
                      ({statusTasks.length})
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {statusTasks.map(task => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Done tasks (collapsed) */}
            {doneTasks > 0 && (
              <div style={{ marginTop: '8px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px',
                }}>
                  <StatusBadge status="done" />
                  <span style={{
                    fontSize: '11px',
                    color: '#797979',
                    fontFamily: 'var(--font-ibm-plex-mono), monospace',
                  }}>
                    ({doneTasks})
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {tasksByStatus('done').map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* ── Stats Row ─────────────────────── */}
      <section style={{ marginBottom: '32px' }}>
        <SectionHeader label="// Task Progress" />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          marginBottom: '20px',
        }}>
          {[
            { label: 'In Progress', value: inProgressTasks, color: '#f36458' },
            { label: 'Sprint Done', value: sprintProgress + '%', color: '#37cd84' },
            { label: 'Quarter Done', value: (quarter?.progress ?? 0) + '%', color: '#55beff' },
          ].map((stat, i) => (
            <div key={i} style={{
              backgroundColor: '#212121',
              border: '1px solid #353535',
              borderRadius: '6px',
              padding: '16px',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: '24px',
                fontWeight: 700,
                color: stat.color,
                letterSpacing: '-1px',
                fontFamily: 'var(--font-inter), sans-serif',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '10px',
                color: '#797979',
                fontFamily: 'var(--font-ibm-plex-mono), monospace',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginTop: '4px',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <SectionHeader label="// Time tracking" />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
        }}>
          {[
            { label: 'Days Left', value: `${timeStats.sprintDaysLeft}d`, color: '#f36458' },
            { label: 'Sprint Time', value: `${timeStats.sprintPercent}%`, color: '#37cd84' },
            { label: 'Quarter Time', value: `${timeStats.quarterPercent}%`, color: '#55beff' },
          ].map((stat, i) => (
            <div key={i} style={{
              backgroundColor: '#212121',
              border: '1px solid #353535',
              borderRadius: '6px',
              padding: '16px',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: '24px',
                fontWeight: 700,
                color: stat.color,
                letterSpacing: '-1px',
                fontFamily: 'var(--font-inter), sans-serif',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '10px',
                color: '#797979',
                fontFamily: 'var(--font-ibm-plex-mono), monospace',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginTop: '4px',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ────────────────────────── */}
      <div style={{
        textAlign: 'center',
        padding: '16px 0',
        borderTop: '1px solid #353535',
      }}>
        <p style={{
          fontSize: '11px',
          color: '#797979',
          fontFamily: 'var(--font-ibm-plex-mono), monospace',
          fontStyle: 'italic',
        }}>
          &ldquo;Good enough and live beats perfect and invisible.&rdquo;
        </p>
      </div>
    </div>
  );
}
