import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { programs } from '../data/data';
import './ProgramsView.css';

const LEVELS = ['All', 'Bachelor', 'Master'];

export default function ProgramsView() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initQ = searchParams.get('q') || '';
    const [query, setQuery] = useState(initQ);
    const [level, setLevel] = useState('All');

    const filtered = programs.filter(p => {
        const matchQ = p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.careers.some(c => c.toLowerCase().includes(query.toLowerCase()));
        const matchL = level === 'All' || p.level === level;
        return matchQ && matchL;
    });

    return (
        <div className="view-scroll">
            <div className="container">

                <div className="search-bar">
                    <span>🔍</span>
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search by name or career…"
                    />
                </div>

                {/* Scrollable filter row — no overflow on mobile */}
                <div className="filter-scroll-wrapper">
                    <div className="filter-row">
                        {LEVELS.map(l => (
                            <button
                                key={l}
                                className={`filter-btn ${level === l ? 'active' : ''}`}
                                onClick={() => setLevel(l)}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                </div>

                <p className="result-count">{filtered.length} Program{filtered.length !== 1 ? 's' : ''}</p>

                {filtered.map(p => (
                    <div
                        key={p.id}
                        className="program-card"
                        onClick={() => navigate(`/programs/${p.id}`)}
                    >
                        <div className="pc-accent" style={{ background: p.color }} />
                        <div className="pc-body">
                            <div className="pc-header">
                                <span className="pc-level-tag" style={{ color: p.color, background: `${p.color}18` }}>
                                    {p.level}
                                </span>
                                <span className="pc-duration">{p.duration}</span>
                            </div>
                            <div className="pc-title">{p.title}</div>
                            <div className="pc-eligibility">Eligibility: {p.eligibility}</div>
                            <div className="pc-exams">
                                {p.exams.slice(0, 3).map(e => <span key={e} className="tag">{e}</span>)}
                            </div>
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="empty-state">
                        <div style={{ fontSize: 48 }}>🔍</div>
                        <p>No programs match your search.</p>
                    </div>
                )}

            </div>
        </div>
    );
}
