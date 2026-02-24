import { useParams } from 'react-router-dom';
import { skills, userData } from '../data/data';
import './DetailView.css';

export default function SkillDetail() {
    const { id } = useParams();
    const s = skills.find(s => s.id === id);
    const progress = userData.skillProgress[id] ?? 0;

    if (!s) return (
        <div className="view-scroll"><div className="container empty-state">
            <div style={{ fontSize: 48 }}>⚡</div><p>Skill not found.</p>
        </div></div>
    );

    return (
        <div className="view-scroll">
            <div className="container">

                <div className="skill-detail-hero" style={{ background: `linear-gradient(135deg, ${s.color}22, ${s.color}08)`, border: `1px solid ${s.color}33` }}>
                    <div className="sdh-icon">{s.icon}</div>
                    <div>
                        <h1 className="sdh-title">{s.name}</h1>
                        <p className="sdh-desc">{s.description}</p>
                    </div>
                </div>

                {/* Your Progress */}
                {progress > 0 && (
                    <>
                        <div className="detail-section-title">Your Progress</div>
                        <div className="detail-text-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontWeight: 600 }}>
                                <span>{s.name}</span>
                                <span style={{ color: s.color }}>{progress}%</span>
                            </div>
                            <div className="progress-track">
                                <div className="progress-fill" style={{ width: `${progress}%`, background: s.color }} />
                            </div>
                        </div>
                    </>
                )}

                {/* Levels */}
                <div className="detail-section-title">Levels</div>
                <div className="levels-row">
                    {s.levels.map((lvl, i) => (
                        <div key={lvl} className="level-chip" style={{
                            background: `${s.color}${i === 0 ? 'ff' : i === 1 ? 'aa' : '66'}`,
                            color: 'white',
                            opacity: 0.9
                        }}>
                            {lvl}
                        </div>
                    ))}
                </div>

                {/* Topics */}
                <div className="detail-section-title">Topics Covered</div>
                <div className="list-group">
                    {s.topics.map((t, i) => (
                        <div key={t} className="info-row">
                            <span className="info-icon" style={{ background: `${s.color}18`, color: s.color, width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>
                                {i + 1}
                            </span>
                            <div className="info-value">{t}</div>
                        </div>
                    ))}
                </div>

                <button className="detail-cta" style={{ background: s.color }}>
                    🚀 Start Learning
                </button>

            </div>
        </div>
    );
}
