/**
 * Vercel Serverless Function: /api/chat
 * Uses Google Gemini API (free tier — no credit card needed).
 *
 * Setup:
 *   1. Go to https://aistudio.google.com → Get API Key → Create API Key
 *   2. Local dev: add GEMINI_API_KEY=AIzaSy... to your .env.local file
 *   3. Vercel: Project → Settings → Environment Variables → add GEMINI_API_KEY
 *   4. Redeploy
 */

const SYSTEM_PROMPT = `You are SP Guide, a friendly AI assistant inside the Student Setup app — a platform helping Indian students choose the right university, program, and skills.

Your role:
- Help students discover programs (B.Tech, MBA, MBBS, B.Com, M.Sc, etc.)
- Explain entrance exams: JEE Main/Advanced, CAT, NEET, GATE, CUET, BITSAT, VITEEE, MET
- Compare universities: IITs, NITs, BITS Pilani, VIT, DU, JNU, BHU, Manipal, Amity
- Recommend skills based on career goals (Python, DSA, communication, resume, etc.)
- Give salary/placement insights and fee structures for Indian colleges
- Answer questions about eligibility, preparation tips, and deadlines

Tone: Warm, encouraging, concise. You're talking to students aged 16–25.
Format: Keep responses to 3–5 sentences max. Use 1–2 emojis per response max.
Never make up specific statistics you're unsure about. If unsure, say so and suggest checking the official source.`;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({
            error: 'Gemini API key not configured. Add GEMINI_API_KEY in your Vercel environment variables.'
        });
    }

    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Invalid request: messages array required' });
    }

    try {
        // Convert our message format to Gemini's format
        // Gemini uses "user" and "model" roles (not "assistant")
        const geminiMessages = messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
        }));

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: SYSTEM_PROMPT }]
                },
                contents: geminiMessages,
                generationConfig: {
                    maxOutputTokens: 300,
                    temperature: 0.7,
                },
                safetySettings: [
                    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                ]
            }),
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            const msg = err?.error?.message || `Gemini API error (${response.status})`;
            return res.status(response.status).json({ error: msg });
        }

        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) {
            return res.status(500).json({ error: 'No response from Gemini. Please try again.' });
        }

        return res.status(200).json({ reply });

    } catch (err) {
        console.error('Gemini API error:', err);
        return res.status(500).json({ error: 'Internal server error. Please try again.' });
    }
}
