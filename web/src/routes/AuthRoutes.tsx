import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

// Páginas //
import ResetPassword from './../pages/ResetPassword'
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import SucessMessage from '../pages/SuccessMessage';

function AuthRoutes() {
    return (
        <BrowserRouter>
            <Route path='/' exact component={SignIn} />
            <Route path='/reset-pass' component={ResetPassword} />
            <Route path='/signup' component={SignUp} />
            <Route path='/forgot-pass' component={ForgotPassword} />
            <Route path='/success-message' component={SucessMessage} />
        </BrowserRouter>
    )
}

export default AuthRoutes;