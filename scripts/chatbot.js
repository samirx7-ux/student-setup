document.addEventListener('DOMContentLoaded', () => {
    const fabButton = document.getElementById('chatbot-fab');
    const overlay = document.getElementById('chatbot-overlay');
    const closeBtn = document.getElementById('chatbot-close');
    const sendBtn = document.getElementById('chatbot-send');
    const inputField = document.getElementById('chatbot-input-field');
    const messagesContainer = document.getElementById('chatbot-messages');

    // Toggle Chatbot
    fabButton.addEventListener('click', () => {
        overlay.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    const addMessage = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.textContent = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    const handleSend = () => {
        const text = inputField.value.trim();
        if (!text) return;

        // Add user message
        addMessage(text, 'user');
        inputField.value = '';

        // Simulate AI thinking and responding
        setTimeout(() => {
            const lowerText = text.toLowerCase();
            let response = "I'm still learning! You can ask me about AI course recommendations or university rankings.";

            if (lowerText.includes('course') || lowerText.includes('program')) {
                response = "Based on your 12th-grade profile, I recommend looking into B.Tech in Computer Science or B.Com. Would you like me to show top universities for these?";
            } else if (lowerText.includes('university') || lowerText.includes('college')) {
                response = "IIT Bombay and BITS Pilani are excellent for Engineering. DU is fantastic for Commerce. Check the 'Universities' tab for detailed profiles!";
            } else if (lowerText.includes('skill')) {
                response = "Improving 'Python Programming' and 'Communication' are highly recommended. Go to the Skills tab to start your journey.";
            }

            addMessage(response, 'bot');
        }, 800);
    };

    sendBtn.addEventListener('click', handleSend);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});
