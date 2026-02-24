import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const BOT_NAME = 'SP Guide';

const getResponse = (text) => {
    const t = text.toLowerCase();
    if (t.includes('course') || t.includes('program') || t.includes('degree'))
        return "Based on your profile, I'd suggest B.Tech CS or MBA. Check the Programs tab for full eligibility, exams, and career paths! 🎓";
    if (t.includes('university') || t.includes('college') || t.includes('iit') || t.includes('bits'))
        return "IIT Bombay and BITS Pilani are top picks for engineering. For commerce, DU's SRCC is unbeatable. Go to Universities tab to compare them! 🏛️";
    if (t.includes('exam') || t.includes('jee') || t.includes('cat') || t.includes('gate') || t.includes('neet'))
        return "JEE Main/Advanced for IITs & NITs. CAT for MBA (IIMs). GATE for M.Tech. NEET for MBBS. CUET for most central universities. Which one can I help with? 📝";
    if (t.includes('skill') || t.includes('python') || t.includes('coding') || t.includes('communication'))
        return "I recommend starting with Python Programming and English Fluency — they're the highest-demand skills for Indian students! Check the Skills tab. ⚡";
    if (t.includes('placement') || t.includes('salary') || t.includes('job') || t.includes('ctc'))
        return "IIT Bombay avg CTC is ₹21.8 LPA. BITS Pilani sees ₹30 LPA. For MBA, IIM grads average ₹30–50 LPA. Which stream interests you more?";
    if (t.includes('fee') || t.includes('cost') || t.includes('money') || t.includes('scholarship'))
        return "Govt colleges (IITs/NITs) are ₹1–2L/yr. Top private: ₹3–6L/yr. Scholarships like PM Vidyalakshmi and NSP are available for eligible students! 💰";
    if (t.includes('hello') || t.includes('hi') || t.includes('hey'))
        return "Hey there! 👋 I'm your AI education guide. Ask me about universities, programs, exams, salary, or skills — I've got you covered!";
    if (t.includes('thank'))
        return "You're welcome! Best of luck with your education journey. Feel free to ask me anything anytime! 🌟";
    return "Great question! I'm still learning more about that. Meanwhile, explore the tabs above — Programs, Universities, and Skills have a lot of detailed info. Is there something specific I can help you with? 🤔";
};

export default function Chatbot({ isOpen, onClose }) {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: "Hello! I'm your AI education guide. Ask me about programs, universities, exams, or skills! 🎓" }
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed) return;
        const userMsg = { sender: 'user', text: trimmed };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'bot', text: getResponse(trimmed) }]);
        }, 600);
    };

    return (
        <div className={`chatbot-overlay ${isOpen ? 'open' : ''}`}>
            <div className="chatbot-header">
                <div className="chatbot-header-info">
                    <div className="chatbot-avatar">🤖</div>
                    <div>
                        <div className="chatbot-name">{BOT_NAME}</div>
                        <div className="chatbot-status"><span className="status-dot" />Online</div>
                    </div>
                </div>
                <button className="chatbot-close" onClick={onClose} aria-label="Close">✕</button>
            </div>

            <div className="chatbot-messages">
                {messages.map((msg, i) => (
                    <div key={i} className={`bubble ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="chatbot-input-row">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Ask anything…"
                />
                <button onClick={handleSend} disabled={!input.trim()} aria-label="Send">➤</button>
            </div>
        </div>
    );
}
