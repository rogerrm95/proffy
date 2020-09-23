import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Components //
import Landing from '../pages/Landing'
import TeacherForms from '../pages/TeacherForms';
import StudyTabs from './StudyTabs';
import SucessMessage from '../components/SuccessMessage';

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="Landing" component={Landing} />
            <Screen name="Study" component={StudyTabs} />
            <Screen name="Give-Classes" component={TeacherForms} />
            <Screen name="SucessMessage" component={SucessMessage} />
        </Navigator>
    )
}

export default AppStack;

