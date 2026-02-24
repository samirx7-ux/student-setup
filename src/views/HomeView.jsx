import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { universities, programs, skills, userData } from '../data/data';
import './HomeView.css';

export default function HomeView() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/programs?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <div className="view-scroll">
            <div className="container">

                {/* Welcome */}
                <div className="home-welcome">
                    <p className="welcome-greeting">Good morning 👋</p>
                    <h2 className="welcome-heading">
                        Hello, <span>{userData.name}!</span>
                    </h2>
                    <p className="welcome-sub">Your education journey starts here.</p>
                </div>

                {/* Quick Search */}
                <form className="search-bar" onSubmit={handleSearch}>
                    <span>🔍</span>
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search programs, universities, skills…"
                    />
                </form>

                {/* Quick Stats */}
                <div className="stats-row">
                    <div className="stat-card">
                        <div className="stat-num">8+</div>
                        <div className="stat-label">Universities</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-num">8+</div>
                        <div className="stat-label">Programs</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-num">10+</div>
                        <div className="stat-label">Skills</div>
                    </div>
                </div>

                {/* Recommended Programs */}
                <div className="section-title">
                    Recommended Programs
                    <span className="see-all" onClick={() => navigate('/programs')}>See All</span>
                </div>
                <div className="h-scroll">
                    {programs.slice(0, 5).map(p => (
                        <div
                            key={p.id}
                            className="prog-card"
                            style={{ borderTop: `4px solid ${p.color}` }}
                            onClick={() => navigate(`/programs/${p.id}`)}
                        >
                            <div className="prog-level" style={{ color: p.color }}>{p.level}</div>
                            <div className="prog-title">{p.title}</div>
                            <div className="prog-meta">{p.duration} • {p.exams[0]}</div>
                        </div>
                    ))}
                </div>

                {/* Top Universities */}
                <div className="section-title">
                    Top Universities
                    <span className="see-all" onClick={() => navigate('/universities')}>See All</span>
                </div>
                {universities.slice(0, 3).map(u => (
                    <div key={u.id} className="uni-card" onClick={() => navigate(`/universities/${u.id}`)}>
                        <img src={u.image} alt={u.name} className="uni-card-img" />
                        <div className="uni-card-body">
                            <div className="uni-card-name">{u.name}</div>
                            <div className="uni-card-meta">{u.location}</div>
                            <div className="uni-card-rank">{u.ranking}</div>
                            <div className="tag" style={{ marginTop: 8, background: u.type === 'Government' ? 'rgba(52,199,89,0.12)' : 'rgba(0,122,255,0.12)', color: u.type === 'Government' ? 'var(--green)' : 'var(--blue)' }}>
                                {u.type}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Continue Skills */}
                <div className="section-title">
                    Your Skills
                    <span className="see-all" onClick={() => navigate('/skills')}>See All</span>
                </div>
                {Object.entries(userData.skillProgress).slice(0, 3).map(([id, pct]) => {
                    const skill = skills.find(s => s.id === id);
                    if (!skill) return null;
                    return (
                        <div key={id} className="skill-progress-card" onClick={() => navigate(`/skills/${id}`)}>
                            <div className="skill-progress-top">
                                <span style={{ fontSize: 22 }}>{skill.icon}</span>
                                <div className="skill-progress-info">
                                    <div className="skill-progress-name">{skill.name}</div>
                                    <div className="skill-progress-cat">{skill.category}</div>
                                </div>
                                <div className="skill-pct" style={{ color: skill.color }}>{pct}%</div>
                            </div>
                            <div className="progress-track" style={{ marginTop: 8 }}>
                                <div className="progress-fill" style={{ width: `${pct}%`, background: skill.color }} />
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}
