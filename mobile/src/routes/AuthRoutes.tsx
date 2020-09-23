import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// Páginas //
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import ForgotPassword from '../pages/ForgotPassword'
import Intro from '../pages/Intro'

// Componentes //
import SuccessMessage from '../components/SuccessMessage'

const { Navigator, Screen } = createStackNavigator()

const AuthRoutes: React.FC = () => {
    return (
        <Navigator screenOptions={{ headerShown: false, }}>
            <Screen name='SignIn' component={SignIn} />
            <Screen name='SignUp' component={SignUp} />
            <Screen name='SuccessMessage' component={SuccessMessage}/>
            <Screen name='ForgotPassword' component={ForgotPassword}/>
        </Navigator>
    )
}

export default AuthRoutes;