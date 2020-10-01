import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Páginas e Components //
import Landing from '../pages/Landing'
import TeacherForms from '../pages/TeacherForms';
import StudyTabs from './StudyTabs';
import SucessMessage from '../components/SuccessMessage';
import Perfil from '../pages/Perfil';

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="Landing" component={Landing} />
            <Screen name="Study" component={StudyTabs} />
            <Screen name="Give-Classes" component={TeacherForms} />
            <Screen name="Perfil" component={Perfil} />
            <Screen name="SucessMessage" component={SucessMessage} />
        </Navigator>
    )
}

export default AppStack;

