import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { skills } from '../data/data';
import './SkillsView.css';

const CATEGORIES = ['All', 'Coding', 'Communication', 'Career'];

export default function SkillsView() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [cat, setCat] = useState('All');

    const filtered = skills.filter(s => {
        const matchQ = s.name.toLowerCase().includes(query.toLowerCase());
        const matchC = cat === 'All' || s.category === cat;
        return matchQ && matchC;
    });

    return (
        <div className="view-scroll">
            <div className="container">

                <div className="search-bar">
                    <span>🔍</span>
                    <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search skills…" />
                </div>

                <div className="filter-row">
                    {CATEGORIES.map(c => (
                        <button
                            key={c}
                            className={`filter-btn ${cat === c ? 'active' : ''}`}
                            onClick={() => setCat(c)}
                        >{c}</button>
                    ))}
                </div>

                {filtered.map(s => (
                    <div key={s.id} className="skill-card" onClick={() => navigate(`/skills/${s.id}`)}>
                        <div className="sk-icon" style={{ background: `${s.color}22`, fontSize: 28 }}>{s.icon}</div>
                        <div className="sk-info">
                            <div className="sk-name">{s.name}</div>
                            <div className="sk-meta">
                                <span className="tag" style={{ background: `${s.color}18`, color: s.color }}>{s.category}</span>
                                <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginLeft: 6 }}>
                                    {s.levels.length} Level{s.levels.length > 1 ? 's' : ''}
                                </span>
                            </div>
                        </div>
                        <div className="sk-chevron">›</div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="empty-state">
                        <div style={{ fontSize: 48 }}>⚡</div>
                        <p>No skills match your search.</p>
                    </div>
                )}

            </div>
        </div>
    );
}
