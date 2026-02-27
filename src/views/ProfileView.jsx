import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { skills } from '../data/data';
import { useUser } from '../context/UserContext';
import './ProfileView.css';

const LEVELS = ['9th Grade', '10th Grade', '11th Grade', '12th Grade', 'Undergraduate', 'Graduate'];
const DEGREES = ['Bachelor', 'Master', 'PhD', 'Diploma'];

export default function ProfileView() {
    const navigate = useNavigate();
    const { userData, updateProfile, updateSkillProgress, resetUserData } = useUser();
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState({});

    const initials = (userData.name || 'S').charAt(0).toUpperCase();

    const startEdit = () => {
        setDraft({
            name: userData.name,
            level: userData.level,
            targetDegree: userData.targetDegree,
        });
        setEditing(true);
    };

    const saveEdit = () => {
        if (draft.name?.trim()) {
            updateProfile(draft);
        }
        setEditing(false);
    };

    const cancelEdit = () => setEditing(false);

    return (
        <div className="view-scroll">
            <div className="container">

                {/* Avatar + Name */}
                <div className="profile-hero">
                    <div className="profile-avatar">{initials}</div>

                    {editing ? (
                        <div className="profile-edit-form">
                            <input
                                className="profile-edit-input"
                                value={draft.name}
                                onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
                                placeholder="Your name"
                                maxLength={30}
                            />
                            <select
                                className="profile-edit-select"
                                value={draft.level}
                                onChange={e => setDraft(d => ({ ...d, level: e.target.value }))}
                            >
                                {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                            <select
                                className="profile-edit-select"
                                value={draft.targetDegree}
                                onChange={e => setDraft(d => ({ ...d, targetDegree: e.target.value }))}
                            >
                                {DEGREES.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                            <div className="profile-edit-actions">
                                <button className="edit-btn save" onClick={saveEdit}>Save</button>
                                <button className="edit-btn cancel" onClick={cancelEdit}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h2 className="profile-name">{userData.name}</h2>
                            <p className="profile-meta">{userData.level} · {userData.targetDegree} Aspirant</p>
                            <div className="profile-interests">
                                {(userData.interests || []).map(i => (
                                    <span key={i} className="tag blue">{i}</span>
                                ))}
                            </div>
                            <button className="profile-edit-btn" onClick={startEdit}>✏️ Edit Profile</button>
                        </>
                    )}
                </div>

                {/* Skill Progress */}
                <div className="section-title">Skill Progress</div>
                <div className="list-group">
                    {Object.entries(userData.skillProgress || {}).length === 0 && (
                        <div style={{ padding: '16px', color: 'var(--text-secondary)', fontSize: 14 }}>
                            No skills tracked yet. Start a skill from the Skills tab!
                        </div>
                    )}
                    {Object.entries(userData.skillProgress || {}).map(([id, pct]) => {
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
                                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                                    {(userData.savedUniversities || []).length} saved
                                </div>
                            </div>
                        </div>
                        <span style={{ color: 'var(--text-tertiary)', fontSize: 22 }}>›</span>
                    </div>
                    <div className="list-row" onClick={() => navigate('/programs')}>
                        <div className="list-row-left">
                            <div className="list-row-icon" style={{ background: 'var(--purple)' }}>📚</div>
                            <div>
                                <div style={{ fontWeight: 600 }}>Saved Programs</div>
                                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                                    {(userData.savedPrograms || []).length} saved
                                </div>
                            </div>
                        </div>
                        <span style={{ color: 'var(--text-tertiary)', fontSize: 22 }}>›</span>
                    </div>
                </div>

                {/* Settings */}
                <div className="section-title">Settings</div>
                <div className="list-group">
                    <div className="list-row" onClick={startEdit}>
                        <div className="list-row-left">
                            <div className="list-row-icon" style={{ background: 'var(--orange)' }}>🎯</div>
                            <div style={{ fontWeight: 600 }}>Target Degree</div>
                        </div>
                        <span style={{ color: 'var(--blue)', fontSize: 14 }}>{userData.targetDegree} ›</span>
                    </div>
                    <div className="list-row" onClick={startEdit}>
                        <div className="list-row-left">
                            <div className="list-row-icon" style={{ background: 'var(--green)' }}>🎓</div>
                            <div style={{ fontWeight: 600 }}>Academic Level</div>
                        </div>
                        <span style={{ color: 'var(--blue)', fontSize: 14 }}>{userData.level} ›</span>
                    </div>
                    <div className="list-row" onClick={() => {
                        if (window.confirm('Reset all your data to defaults?')) resetUserData();
                    }}>
                        <div className="list-row-left">
                            <div className="list-row-icon" style={{ background: 'var(--red)' }}>🔄</div>
                            <div style={{ fontWeight: 600 }}>Reset My Data</div>
                        </div>
                        <span style={{ color: 'var(--red)', fontSize: 14 }}>Reset ›</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
