import { useParams, useNavigate } from 'react-router-dom';
import { universities } from '../data/data';
import './DetailView.css';

export default function UniversityDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const u = universities.find(u => u.id === id);

    if (!u) return (
        <div className="view-scroll"><div className="container empty-state">
            <div style={{ fontSize: 48 }}>🏛️</div><p>University not found.</p>
        </div></div>
    );

    const infoRows = [
        { icon: '📍', label: 'Location', value: u.location },
        { icon: '📊', label: 'NIRF Ranking', value: u.ranking },
        { icon: '🏷️', label: 'Type', value: u.type },
        { icon: '🎓', label: 'Admission', value: u.admission },
        { icon: '💼', label: 'Placements', value: u.placements },
    ];

    return (
        <div className="view-scroll">
            <div className="container">

                <div className="detail-hero" style={{ background: u.accentColor }}>
                    <img src={u.image} alt={u.name} className="detail-hero-img" />
                    <div className="detail-hero-overlay">
                        <h1 className="detail-hero-title">{u.shortName}</h1>
                        <p className="detail-hero-sub">{u.location}</p>
                    </div>
                </div>

                <p className="detail-overview">{u.overview}</p>

                <div className="detail-section-title">Quick Info</div>
                <div className="list-group">
                    {infoRows.map(r => (
                        <div key={r.label} className="info-row">
                            <span className="info-icon">{r.icon}</span>
                            <div>
                                <div className="info-label">{r.label}</div>
                                <div className="info-value">{r.value}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="detail-section-title">Courses Offered</div>
                <div className="tag-row">
                    {u.courses.map(c => <span key={c} className="tag blue">{c}</span>)}
                </div>

                <div className="detail-section-title">Campus Life</div>
                <div className="detail-text-card">{u.campus}</div>

                <a
                    href={u.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-cta"
                    style={{ background: u.accentColor }}
                >
                    🌐 Visit Official Website
                </a>

            </div>
        </div>
    );
}
