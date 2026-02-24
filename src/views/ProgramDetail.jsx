import { useParams } from 'react-router-dom';
import { programs } from '../data/data';
import './DetailView.css';

export default function ProgramDetail() {
    const { id } = useParams();
    const p = programs.find(p => p.id === id);

    if (!p) return (
        <div className="view-scroll"><div className="container empty-state">
            <div style={{ fontSize: 48 }}>📚</div><p>Program not found.</p>
        </div></div>
    );

    return (
        <div className="view-scroll">
            <div className="container">

                <div className="detail-banner" style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}99)` }}>
                    <div className="detail-banner-level">{p.level}</div>
                    <h1 className="detail-banner-title">{p.title}</h1>
                    <p className="detail-banner-sub">{p.duration}</p>
                </div>

                <div className="detail-section-title">Eligibility</div>
                <div className="detail-text-card">{p.eligibility}</div>

                <div className="detail-section-title">Entrance Exams</div>
                <div className="tag-row">
                    {p.exams.map(e => <span key={e} className="tag" style={{ color: p.color, background: `${p.color}18` }}>{e}</span>)}
                </div>

                <div className="detail-section-title">Fee Structure</div>
                <div className="detail-text-card">{p.fees}</div>

                <div className="detail-section-title">Career Opportunities</div>
                <div className="career-grid">
                    {p.careers.map(c => (
                        <div key={c} className="career-chip" style={{ borderLeft: `3px solid ${p.color}` }}>
                            {c}
                        </div>
                    ))}
                </div>

                <div className="detail-section-title">Top Universities</div>
                <div className="list-group">
                    {p.topUnis.map(uni => (
                        <div key={uni} className="info-row">
                            <span className="info-icon">🏛️</span>
                            <div className="info-value">{uni}</div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
