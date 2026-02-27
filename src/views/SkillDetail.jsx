import { useParams } from 'react-router-dom';
import { skills } from '../data/data';
import { useUser } from '../context/UserContext';
import './DetailView.css';
import './SkillDetail.css';

export default function SkillDetail() {
    const { id } = useParams();
    const { userData, updateSkillProgress } = useUser();
    const s = skills.find(s => s.id === id);
    const progress = userData.skillProgress?.[id] ?? 0;

    if (!s) return (
        <div className="view-scroll"><div className="container empty-state">
            <div style={{ fontSize: 48 }}>⚡</div><p>Skill not found.</p>
        </div></div>
    );

    const handleProgressChange = (e) => {
        updateSkillProgress(id, Number(e.target.value));
    };

    const handleStartLearning = () => {
        if (progress === 0) {
            updateSkillProgress(id, 5); // Mark as started
        }
    };

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

                {/* Progress — editable */}
                <div className="detail-section-title">Your Progress</div>
                <div className="detail-text-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontWeight: 600 }}>
                        <span>{s.name}</span>
                        <span style={{ color: s.color }}>{progress}%</span>
                    </div>
                    <div className="progress-track" style={{ marginBottom: 14 }}>
                        <div className="progress-fill" style={{ width: `${progress}%`, background: s.color }} />
                    </div>
                    {/* Slider to update progress */}
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={progress}
                        onChange={handleProgressChange}
                        className="progress-slider"
                        style={{ '--slider-color': s.color }}
                        aria-label="Update progress"
                    />
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 6, textAlign: 'center' }}>
                        Drag to update your progress — it saves automatically
                    </p>
                </div>

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

                <button
                    className="detail-cta"
                    style={{ background: s.color }}
                    onClick={handleStartLearning}
                >
                    {progress > 0 ? '📖 Continue Learning' : '🚀 Start Learning'}
                </button>

            </div>
        </div>
    );
}
