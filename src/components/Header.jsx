import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header({ title, isDetail }) {
    const navigate = useNavigate();
    return (
        <header className="app-header">
            {isDetail && (
                <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">
                    ‹
                </button>
            )}
            <h1 className="header-title">{title}</h1>
        </header>
    );
}
