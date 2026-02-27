import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { skills, universities, programs } from '../data/data';
import { useUser } from '../context/UserContext';
import './AnalyticsView.css';

// SVG circular progress ring
function RingProgress({ pct, size = 140, stroke = 10, color = 'var(--blue)' }) {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (pct / 100) * circ;
    return (
        <svg width={size} height={size} className="ring-svg">
            {/* Track */}
            <circle
                cx={size / 2} cy={size / 2} r={r}
                fill="none" stroke="var(--border)" strokeWidth={stroke}
            />
            {/* Fill */}
            <circle
                cx={size / 2} cy={size / 2} r={r}
                fill="none"
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={offset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                className="ring-fill"
            />
        </svg>
    );
}

// Mini horizontal bar for category breakdown
function CategoryBar({ label, count, total, color }) {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    return (
        <div className="cat-bar-row">
            <div className="cat-bar-label">
                <span>{label}</span>
                <span style={{ color }} className="cat-bar-count">{count} skill{count !== 1 ? 's' : ''}</span>
            </div>
            <div className="progress-track">
                <div
                    className="progress-fill cat-fill"
                    style={{ width: `${pct}%`, background: color }}
                />
            </div>
        </div>
    );
}

export default function AnalyticsView() {
    const navigate = useNavigate();
    const { userData, updateStreak } = useUser();

    // Mark user as active today when they visit this page
    useEffect(() => {
        updateStreak();
    }, []);

    const skillProgress = userData.skillProgress || {};
    const trackedEntries = Object.entries(skillProgress);
    const trackedCount = trackedEntries.length;

    // Overall average completion across ALL skills (not just tracked)
    const totalPct = trackedCount > 0
        ? Math.round(trackedEntries.reduce((sum, [, v]) => sum + v, 0) / trackedCount)
        : 0;

    // Skills sorted by progress descending
    const sortedSkills = trackedEntries
        .map(([id, pct]) => ({ skill: skills.find(s => s.id === id), pct }))
        .filter(s => s.skill)
        .sort((a, b) => b.pct - a.pct);

    // Category breakdown — only tracked skills
    const cats = { Coding: 0, Communication: 0, Career: 0 };
    trackedEntries.forEach(([id]) => {
        const s = skills.find(sk => sk.id === id);
        if (s && cats[s.category] !== undefined) cats[s.category]++;
    });
    const catColors = { Coding: 'var(--blue)', Communication: 'var(--orange)', Career: 'var(--green)' };

    // Streak
    const streak = userData.currentStreak || 0;
    const longest = userData.longestStreak || 0;

    // Completion buckets
    const completed = sortedSkills.filter(s => s.pct >= 100).length;
    const inProgress = sortedSkills.filter(s => s.pct > 0 && s.pct < 100).length;
    const notStarted = sortedSkills.filter(s => s.pct === 0).length;

    return (
        <div className="view-scroll">
            <div className="container">

                {/* Hero — overall ring */}
                <div className="analytics-hero">
                    <div className="ring-wrapper">
                        <RingProgress
                            pct={totalPct}
                            size={148}
                            stroke={12}
                            color={totalPct >= 75 ? 'var(--green)' : totalPct >= 40 ? 'var(--blue)' : 'var(--orange)'}
                        />
                        <div className="ring-center">
                            <div className="ring-pct">{totalPct}%</div>
                            <div className="ring-label">Overall</div>
                        </div>
                    </div>
                    <div className="hero-text">
                        <h2 className="hero-title">Your Progress</h2>
                        <p className="hero-sub">
                            {trackedCount === 0
                                ? 'Start a skill to track your progress here.'
                                : `Tracking ${trackedCount} skill${trackedCount !== 1 ? 's' : ''}`}
                        </p>
                        <div className="hero-chips">
                            {completed > 0 && <span className="hchip green">✓ {completed} done</span>}
                            {inProgress > 0 && <span className="hchip blue">⏳ {inProgress} in progress</span>}
                            {notStarted > 0 && <span className="hchip grey">○ {notStarted} not started</span>}
                        </div>
                    </div>
                </div>

                {/* Streak cards */}
                <div className="streak-row">
                    <div className="streak-card">
                        <div className="streak-icon">🔥</div>
                        <div className="streak-num">{streak}</div>
                        <div className="streak-label">Day Streak</div>
                    </div>
                    <div className="streak-card">
                        <div className="streak-icon">🏆</div>
                        <div className="streak-num">{longest}</div>
                        <div className="streak-label">Best Streak</div>
                    </div>
                    <div className="streak-card">
                        <div className="streak-icon">🔖</div>
                        <div className="streak-num">{(userData.savedUniversities || []).length}</div>
                        <div className="streak-label">Saved Unis</div>
                    </div>
                    <div className="streak-card">
                        <div className="streak-icon">📚</div>
                        <div className="streak-num">{(userData.savedPrograms || []).length}</div>
                        <div className="streak-label">Saved Progs</div>
                    </div>
                </div>

                {/* Skill breakdown */}
                {sortedSkills.length > 0 && (
                    <>
                        <div className="section-title">Skill Breakdown</div>
                        <div className="analytics-card">
                            {sortedSkills.map(({ skill, pct }, i) => (
                                <div
                                    key={skill.id}
                                    className="skill-analytics-row"
                                    style={{ animationDelay: `${i * 0.05}s` }}
                                    onClick={() => navigate(`/skills/${skill.id}`)}
                                >
                                    <div className="sar-left">
                                        <span className="sar-icon">{skill.icon}</span>
                                        <div>
                                            <div className="sar-name">{skill.name}</div>
                                            <div className="sar-cat">{skill.category}</div>
                                        </div>
                                    </div>
                                    <div className="sar-right">
                                        <div className="sar-pct" style={{ color: skill.color }}>{pct}%</div>
                                        <div className="sar-bar-track">
                                            <div
                                                className="sar-bar-fill"
                                                style={{ width: `${pct}%`, background: skill.color }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Category breakdown */}
                {trackedCount > 0 && (
                    <>
                        <div className="section-title">By Category</div>
                        <div className="analytics-card" style={{ padding: '16px' }}>
                            {Object.entries(cats).map(([cat, count]) => (
                                <CategoryBar
                                    key={cat}
                                    label={cat}
                                    count={count}
                                    total={trackedCount}
                                    color={catColors[cat]}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* Saved summary */}
                <div className="section-title">Saved Items</div>
                <div className="saved-summary-grid">
                    <div className="ss-card" onClick={() => navigate('/universities')}>
                        <div className="ss-num" style={{ color: 'var(--blue)' }}>
                            {(userData.savedUniversities || []).length}
                        </div>
                        <div className="ss-label">Universities</div>
                        <div className="ss-sub">
                            {(userData.savedUniversities || [])
                                .slice(0, 2)
                                .map(id => universities.find(u => u.id === id)?.shortName)
                                .filter(Boolean)
                                .join(', ') || 'None saved yet'}
                        </div>
                    </div>
                    <div className="ss-card" onClick={() => navigate('/programs')}>
                        <div className="ss-num" style={{ color: 'var(--purple)' }}>
                            {(userData.savedPrograms || []).length}
                        </div>
                        <div className="ss-label">Programs</div>
                        <div className="ss-sub">
                            {(userData.savedPrograms || [])
                                .slice(0, 2)
                                .map(id => programs.find(p => p.id === id)?.title.split('–')[1]?.trim() || programs.find(p => p.id === id)?.title)
                                .filter(Boolean)
                                .join(', ') || 'None saved yet'}
                        </div>
                    </div>
                </div>

                {/* Empty state */}
                {trackedCount === 0 && (
                    <div className="analytics-empty">
                        <div className="ae-icon">📊</div>
                        <h3>No data yet</h3>
                        <p>Start tracking skills to see your analytics here. Head to the Skills tab to begin!</p>
                        <button className="ae-btn" onClick={() => navigate('/skills')}>
                            Explore Skills →
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
