import { useNavigate } from 'react-router-dom';
import { userData, skills } from '../data/data';
import './ProfileView.css';

export default function ProfileView() {
    const navigate = useNavigate();
    const initials = userData.name.charAt(0).toUpperCase();

    return (
        <div className="view-scroll">
            <div className="container">

                {/* Avatar + Name */}
                <div className="profile-hero">
                    <div className="profile-avatar">{initials}</div>
                    <h2 className="profile-name">{userData.name}</h2>
                    <p className="profile-meta">{userData.level} · {userData.targetDegree} Aspirant</p>
                    <div className="profile-interests">
                        {userData.interests.map(i => (
                            <span key={i} className="tag blue">{i}</span>
                        ))}
                    </div>
                </div>

                {/* Skill Progress */}
                <div className="section-title">Skill Progress</div>
                <div className="list-group">
                    {Object.entries(userData.skillProgress).map(([id, pct]) => {
                        const skill = skills.find(s => s.id === id);
                        if (!skill) return null;
                        return (
                            <div key={id} className="skill-prog-row" onClick={() => navigate(`/skills/${id}`)}>
                                <div className="spr-left">
                                    <span style={{ fontSize: 20 }}>{skill.icon}</span>
                                    <div>
                                        <div className="spr-name">{skill.name}</div>
                                        <div className="spr-cat">{skill.category}</div>
                                    </div>
                                </div>
                                <div className="spr-right">
                                    <div className="spr-pct" style={{ color: skill.color }}>{pct}%</div>
                                    <div className="progress-track" style={{ width: 60 }}>
                                        <div className="progress-fill" style={{ width: `${pct}%`, background: skill.color }} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Saved */}
                <div className="section-title">Saved</div>
                <div className="list-group">
                    <div className="list-row" onClick={() => navigate('/universities')}>
                        <div className="list-row-left">
                            <div className="list-row-icon" style={{ background: 'var(--blue)' }}>🏛️</div>
                            <div>
                                <div style={{ fontWeight: 600 }}>Saved Universities</div>
                                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{userData.savedUniversities.length} saved</div>
                            </div>
                        </div>
                        <span style={{ color: 'var(--text-tertiary)', fontSize: 22 }}>›</span>
                    </div>
                    <div className="list-row" onClick={() => navigate('/programs')}>
                        <div className="list-row-left">
                            <div className="list-row-icon" style={{ background: 'var(--purple)' }}>📚</div>
                            <div>
                                <div style={{ fontWeight: 600 }}>Saved Programs</div>
                                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{userData.savedPrograms.length} saved</div>
                            </div>
                        </div>
                        <span style={{ color: 'var(--text-tertiary)', fontSize: 22 }}>›</span>
                    </div>
                </div>

                {/* Settings */}
                <div className="section-title">Settings</div>
                <div className="list-group">
                    <div className="list-row">
                        <div className="list-row-left">
                            <div className="list-row-icon" style={{ background: 'var(--orange)' }}>🎯</div>
                            <div style={{ fontWeight: 600 }}>Target Degree</div>
                        </div>
                        <span style={{ color: 'var(--blue)', fontSize: 14 }}>{userData.targetDegree} ›</span>
                    </div>
                    <div className="list-row">
                        <div className="list-row-left">
                            <div className="list-row-icon" style={{ background: 'var(--green)' }}>🎓</div>
                            <div style={{ fontWeight: 600 }}>Academic Level</div>
                        </div>
                        <span style={{ color: 'var(--blue)', fontSize: 14 }}>{userData.level} ›</span>
                    </div>
                    <div className="list-row">
                        <div className="list-row-left">
                            <div className="list-row-icon" style={{ background: 'var(--red)' }}>🔔</div>
                            <div style={{ fontWeight: 600 }}>Exam Alerts</div>
                        </div>
                        <span style={{ color: 'var(--blue)', fontSize: 14 }}>On ›</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
