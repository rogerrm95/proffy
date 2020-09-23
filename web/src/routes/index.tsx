import React, { useContext, useEffect } from 'react'

// Contexts //
import AuthContext from './../contexts/auth'
import api from '../services/api'

// Routes //
import AuthRoutes from './AuthRoutes'
import AppStack from './AppStack'


const Routes: React.FC = () => {

    const context = useContext(AuthContext)

    useEffect(() => {

        const storage: any = localStorage.getItem('@proffyUser')
        const userData = JSON.parse(storage)

        api.post('/validate-token', userData)
            .then(res => {
                if (res.data) {
                    context.signIn(userData)
                } else {
                    context.signIn(null)
                    localStorage.removeItem('@proffyUser')
                }
            }).catch(e => alert(e))
    }, [])

    return context.signed ? <AppStack></AppStack> :  <AuthRoutes />
}

export default Routes;