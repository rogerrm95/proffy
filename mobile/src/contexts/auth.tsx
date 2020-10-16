import React, { createContext, useState } from 'react'

import api from '../services/api'

interface AuthContextData {
    signed: boolean,
    user: object | null,
    signIn: Function
}

export interface User {
    iat?: number,
    exp?: number,
    name: string,
    lastname: string,
    email: string,
    avatar?: string,
    token?: string,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = useState<object | null>(null)

    function signIn(data: User | null){
        setUser(data)
    }

    return (
        <AuthContext.Provider
            value={{ signed: !!user, user, signIn }}>

            {children}

        </AuthContext.Provider>
    )
}

export default AuthContext; 