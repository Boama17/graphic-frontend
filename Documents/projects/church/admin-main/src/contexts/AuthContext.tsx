import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "firebase/auth";
import { subscribeToAuthChanges } from "../firebase/auth";

// Define the shape of our context
interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    loading: true
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Subscribe to auth state changes
        const unsubscribe = subscribeToAuthChanges((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        // Clean up subscription on unmount
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;