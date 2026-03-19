import React, { createContext, useContext } from 'react';

// Auth is now handled via localStorage (frontend-only).
// This context is kept as a no-op so existing imports don't break.
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
