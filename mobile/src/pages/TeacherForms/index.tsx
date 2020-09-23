import React from 'react'
import { View, Text } from 'react-native'
import PageHeader from '../../components/PageHeader'
import TopBarHeader from '../../components/TopBarHeader'

// Estilo //
import styles from './styles'

function TeacherForms() {
    return (
        <View style={styles.container}>
            <PageHeader 
                title='Que incrível que você quer dar aulas.' 
                description="O primeiro passo, é preencher esse formulário de inscrição." 
                labelTop="Dar Aulas"/>

            <View style={styles.content}>

                <View style={styles.forms}>

                </View>

            </View>
        </View>
    )
}

export default TeacherForms;