import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { universities } from '../data/data';
import './UniversitiesView.css';

const TYPES = ['All', 'Government', 'Private', 'Private (Deemed)'];

export default function UniversitiesView() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [type, setType] = useState('All');

    const filtered = universities.filter(u => {
        const matchQ = u.name.toLowerCase().includes(query.toLowerCase()) ||
            u.location.toLowerCase().includes(query.toLowerCase());
        const matchT = type === 'All' || u.type === type;
        return matchQ && matchT;
    });

    return (
        <div className="view-scroll">
            <div className="container">

                <div className="search-bar">
                    <span>🔍</span>
                    <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name or location…" />
                </div>

                <div className="filter-row" style={{ overflowX: 'auto', paddingBottom: 4 }}>
                    {TYPES.map(t => (
                        <button
                            key={t}
                            className={`filter-btn ${type === t ? 'active' : ''}`}
                            onClick={() => setType(t)}
                            style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                <p className="result-count">{filtered.length} Universities</p>

                {filtered.map(u => (
                    <div key={u.id} className="uv-card" onClick={() => navigate(`/universities/${u.id}`)}>
                        <img src={u.image} alt={u.name} className="uv-img" />
                        <div className="uv-body">
                            <div className="uv-toprow">
                                <span className="uv-type" style={{
                                    color: u.type === 'Government' ? 'var(--green)' : 'var(--blue)',
                                    background: u.type === 'Government' ? 'rgba(52,199,89,0.12)' : 'rgba(0,122,255,0.12)'
                                }}>{u.type}</span>
                                <span className="uv-rank">📊 {u.ranking}</span>
                            </div>
                            <div className="uv-name">{u.name}</div>
                            <div className="uv-loc">📍 {u.location}</div>
                            <p className="uv-overview">{u.overview.substring(0, 90)}…</p>
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="empty-state">
                        <div style={{ fontSize: 48 }}>🏛️</div>
                        <p>No universities match your filter.</p>
                    </div>
                )}

            </div>
        </div>
    );
}
