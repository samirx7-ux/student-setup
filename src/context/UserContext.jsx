import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const UserContext = createContext(null);

const DEFAULT_USER = {
    name: "Student",
    level: "12th Grade",
    targetDegree: "Bachelor",
    interests: ["Technology", "Business"],
    savedUniversities: ["iitb", "bits"],
    savedPrograms: ["btech-cs", "mba"],
    examAlerts: true,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: null,
    skillProgress: {
        "python": 45,
        "english": 30,
        "resume": 70,
        "public-speaking": 20
    }
};

export function UserProvider({ children }) {
    const [userData, setUserData] = useLocalStorage('sp_user_data', DEFAULT_USER);

    // ── Skill Progress ──────────────────────────────────────────
    const updateSkillProgress = (skillId, pct) => {
        setUserData(prev => ({
            ...prev,
            skillProgress: {
                ...prev.skillProgress,
                [skillId]: Math.min(100, Math.max(0, pct))
            }
        }));
    };

    // ── Saved Universities ──────────────────────────────────────
    const toggleSavedUniversity = (uniId) => {
        setUserData(prev => {
            const saved = prev.savedUniversities || [];
            return {
                ...prev,
                savedUniversities: saved.includes(uniId)
                    ? saved.filter(id => id !== uniId)
                    : [...saved, uniId]
            };
        });
    };

    const isSavedUniversity = (uniId) =>
        (userData.savedUniversities || []).includes(uniId);

    // ── Saved Programs ──────────────────────────────────────────
    const toggleSavedProgram = (programId) => {
        setUserData(prev => {
            const saved = prev.savedPrograms || [];
            return {
                ...prev,
                savedPrograms: saved.includes(programId)
                    ? saved.filter(id => id !== programId)
                    : [...saved, programId]
            };
        });
    };

    const isSavedProgram = (programId) =>
        (userData.savedPrograms || []).includes(programId);

    // ── Profile Editing ─────────────────────────────────────────
    const updateProfile = (fields) => {
        setUserData(prev => ({ ...prev, ...fields }));
    };

    const resetUserData = () => {
        setUserData(DEFAULT_USER);
    };

    const toggleExamAlerts = () => {
        setUserData(prev => ({ ...prev, examAlerts: !prev.examAlerts }));
    };

    // ── Streak Tracking ─────────────────────────────────────────
    // Call this whenever the user does something meaningful (open app, update skill, etc.)
    const updateStreak = () => {
        const today = new Date().toDateString();
        setUserData(prev => {
            if (prev.lastActiveDate === today) return prev; // already counted today

            const yesterday = new Date(Date.now() - 86400000).toDateString();
            const isConsecutive = prev.lastActiveDate === yesterday;
            const newStreak = isConsecutive ? (prev.currentStreak || 0) + 1 : 1;
            const newLongest = Math.max(newStreak, prev.longestStreak || 0);

            return {
                ...prev,
                lastActiveDate: today,
                currentStreak: newStreak,
                longestStreak: newLongest,
            };
        });
    };

    return (
        <UserContext.Provider value={{
            userData,
            updateSkillProgress,
            toggleSavedUniversity,
            isSavedUniversity,
            toggleSavedProgram,
            isSavedProgram,
            updateProfile,
            resetUserData,
            toggleExamAlerts,
            updateStreak,
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error('useUser must be used within a UserProvider');
    return ctx;
}
