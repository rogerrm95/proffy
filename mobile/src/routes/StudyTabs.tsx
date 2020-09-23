import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Components //
import Favorites from '../pages/Favorites';
import TeacherList from '../pages/TeacherList';

// Fonts and Icons //
import { Ionicons } from '@expo/vector-icons'
import { Archivo_700Bold } from '@expo-google-fonts/archivo';

const { Navigator, Screen } = createBottomTabNavigator()

function StudyTabs() {
    return (
        <Navigator tabBarOptions={{
            style: {
                elevation: 0,
                shadowOpacity: 0,
                height: 64,
            },
            tabStyle: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: 'center'
            },
            iconStyle: {
                flex: 0,
                width: 20,
                height: 20
            },
            labelStyle: {
                fontFamily: 'Archivo_700Bold',
                marginLeft: 16,
                fontSize: 13,
            },
            inactiveBackgroundColor: "#fafafc",
            activeBackgroundColor: "#ebebf5",
            inactiveTintColor: "#c1bbcc",
            activeTintColor: "#32264d"
        }}>
            <Screen name='TeacherList'
                component={TeacherList}
                options={{
                    tabBarLabel: "Proffy's",
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons
                                name='ios-easel'
                                size={size}
                                color={focused ? "#8257e5" : color}
                            />
                        )
                    }
                }}
            />
            
            <Screen
                name='Favorites'
                component={Favorites}
                options={{
                    tabBarLabel: "Favoritos",
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons
                                name='ios-heart'
                                size={size}
                                color={focused ? "#8257e5" : color}
                            />
                        )
                    }
                }}
            />

        </Navigator>
    )
}

export default StudyTabs;   