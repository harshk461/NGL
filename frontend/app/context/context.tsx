'use client'

import { ReactNode, createContext, useContext, useState } from "react";

interface ContextData {
    username: string;
}

interface UserContextType {
    username: ContextData;
    updateUsername: (newUsername: React.SetStateAction<ContextData>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<ContextData>({
        'username': '',
    })

    const updateUsername = (newUser: React.SetStateAction<ContextData>) => {
        setUsername(newUser);
    };

    return (
        <UserContext.Provider value={{ username, updateUsername }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
};
