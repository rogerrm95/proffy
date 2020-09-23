import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

// Páginas //
import Landing from '../pages/Landing'
import TeacherList from '../pages/TeacherList'
import TeacherForms from '../pages/TeacherForms'
import UserPerfil from '../pages/UserPerfil'
import SucessMessage from '../pages/SuccessMessage'

function AppStack() {
    return (
        <BrowserRouter>
            <Route path='/' exact component={Landing} />
            <Route path='/study' component={TeacherList} />
            <Route path='/give-classes' component={TeacherForms} />
            <Route path='/perfil' component={UserPerfil} />
            <Route path='/success-message' component={SucessMessage} />
        </BrowserRouter>
    )
}
export default AppStack;