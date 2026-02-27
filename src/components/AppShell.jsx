import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import TabBar from './TabBar';
import Header from './Header';
import Chatbot from './Chatbot';
import './AppShell.css';

const titleMap = {
    '/home': 'Home',
    '/search': 'Search',
    '/analytics': 'My Progress',
    '/programs': 'Programs',
    '/universities': 'Universities',
    '/skills': 'Skills',
    '/profile': 'Profile',
};

export default function AppShell() {
    const location = useLocation();
    const [chatOpen, setChatOpen] = useState(false);

    const segments = location.pathname.split('/');
    const isDetail = segments.length > 2 && segments[2];
    const rootPath = '/' + segments[1];
    const title = titleMap[location.pathname] || titleMap[rootPath] || 'SP';

    return (
        <div className="app-shell">
            <Header title={title} isDetail={isDetail} />

            <main className="app-body">
                <Outlet />
            </main>

            <TabBar />

            <button
                className="chatbot-fab"
                onClick={() => setChatOpen(true)}
                aria-label="Open AI Guide"
            >
                💬
            </button>

            <Chatbot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
        </div>
    );
}
