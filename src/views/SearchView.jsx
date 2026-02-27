import { useSearchParams, useNavigate } from 'react-router-dom';
import { programs, universities, skills } from '../data/data';
import './SearchView.css';

export default function SearchView() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const q = searchParams.get('q')?.toLowerCase().trim() || '';

    if (!q) {
        return (
            <div className="view-scroll">
                <div className="container">
                    <div className="empty-state">
                        <div style={{ fontSize: 48 }}>🔍</div>
                        <p>Type something to search across programs, universities, and skills.</p>
                    </div>
                </div>
            </div>
        );
    }

    const matchedPrograms = programs.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.careers.some(c => c.toLowerCase().includes(q)) ||
        p.exams.some(e => e.toLowerCase().includes(q))
    );

    const matchedUniversities = universities.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.shortName.toLowerCase().includes(q) ||
        u.location.toLowerCase().includes(q) ||
        u.type.toLowerCase().includes(q)
    );

    const matchedSkills = skills.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.topics.some(t => t.toLowerCase().includes(q))
    );

    const totalCount = matchedPrograms.length + matchedUniversities.length + matchedSkills.length;

    return (
        <div className="view-scroll">
            <div className="container">

                <div className="search-result-header">
                    <span className="search-query">"{searchParams.get('q')}"</span>
                    <span className="search-count">{totalCount} result{totalCount !== 1 ? 's' : ''}</span>
                </div>

                {totalCount === 0 && (
                    <div className="empty-state">
                        <div style={{ fontSize: 48 }}>😕</div>
                        <p>No results found. Try searching for "B.Tech", "IIT", "Python", or "JEE".</p>
                    </div>
                )}

                {/* Programs */}
                {matchedPrograms.length > 0 && (
                    <>
                        <div className="section-title">
                            Programs
                            <span className="result-badge">{matchedPrograms.length}</span>
                        </div>
                        {matchedPrograms.map(p => (
                            <div
                                key={p.id}
                                className="search-card"
                                onClick={() => navigate(`/programs/${p.id}`)}
                                style={{ borderLeft: `4px solid ${p.color}` }}
                            >
                                <div className="sc-icon" style={{ background: `${p.color}18`, color: p.color }}>📚</div>
                                <div className="sc-body">
                                    <div className="sc-title">{p.title}</div>
                                    <div className="sc-meta">{p.level} · {p.duration} · {p.exams[0]}</div>
                                </div>
                                <span className="sc-chevron">›</span>
                            </div>
                        ))}
                    </>
                )}

                {/* Universities */}
                {matchedUniversities.length > 0 && (
                    <>
                        <div className="section-title">
                            Universities
                            <span className="result-badge">{matchedUniversities.length}</span>
                        </div>
                        {matchedUniversities.map(u => (
                            <div
                                key={u.id}
                                className="search-card"
                                onClick={() => navigate(`/universities/${u.id}`)}
                                style={{ borderLeft: `4px solid ${u.accentColor}` }}
                            >
                                <div className="sc-icon" style={{ background: `${u.accentColor}18`, color: u.accentColor }}>🏛️</div>
                                <div className="sc-body">
                                    <div className="sc-title">{u.shortName}</div>
                                    <div className="sc-meta">{u.location} · {u.type}</div>
                                </div>
                                <span className="sc-chevron">›</span>
                            </div>
                        ))}
                    </>
                )}

                {/* Skills */}
                {matchedSkills.length > 0 && (
                    <>
                        <div className="section-title">
                            Skills
                            <span className="result-badge">{matchedSkills.length}</span>
                        </div>
                        {matchedSkills.map(s => (
                            <div
                                key={s.id}
                                className="search-card"
                                onClick={() => navigate(`/skills/${s.id}`)}
                                style={{ borderLeft: `4px solid ${s.color}` }}
                            >
                                <div className="sc-icon" style={{ background: `${s.color}18`, fontSize: 20 }}>{s.icon}</div>
                                <div className="sc-body">
                                    <div className="sc-title">{s.name}</div>
                                    <div className="sc-meta">{s.category} · {s.levels.length} Level{s.levels.length > 1 ? 's' : ''}</div>
                                </div>
                                <span className="sc-chevron">›</span>
                            </div>
                        ))}
                    </>
                )}

            </div>
        </div>
    );
}
