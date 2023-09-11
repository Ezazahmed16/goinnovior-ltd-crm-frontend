// AuthContext.js
import React, { createContext, useContext } from 'react';
import { AuthProvider } from 'react-auth-kit';

const AuthContext = createContext();

export function AuthWrapper({ children }) {
    return (
        <AuthProvider
            authStorageType={'cookie'}
            authStorageName={'_auth'}
            cookieDomain={window.location.hostname}
            cookieSecure={window.location.protocol === "https:"}
            // authTimeStorageName="myAppAuthTime"
        >
            <AuthContext.Provider value={useAuth}>{children}</AuthContext.Provider>
        </AuthProvider>
    );
}

export const useAuth = () => useContext(AuthContext);
