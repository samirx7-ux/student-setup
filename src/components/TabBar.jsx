import { NavLink } from 'react-router-dom';
import './TabBar.css';

const tabs = [
    { to: '/home', icon: '🏠', label: 'Home' },
    { to: '/programs', icon: '📚', label: 'Programs' },
    { to: '/universities', icon: '🏛️', label: 'Universities' },
    { to: '/skills', icon: '⚡', label: 'Skills' },
    { to: '/profile', icon: '👤', label: 'Profile' },
];

export default function TabBar() {
    return (
        <nav className="tab-bar" role="tablist">
            {tabs.map(tab => (
                <NavLink
                    key={tab.to}
                    to={tab.to}
                    className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}
                    role="tab"
                >
                    <span className="tab-icon">{tab.icon}</span>
                    <span className="tab-label">{tab.label}</span>
                </NavLink>
            ))}
        </nav>
    );
}
