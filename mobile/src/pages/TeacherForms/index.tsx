import React, { useState } from 'react'
import { View, Text, Image, SafeAreaView } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

// Componentes //
import TopBarHeader from '../../components/TopBarHeader'
import PageHeader from '../../components/PageHeader'
import Inputs from '../../components/Forms/Inputs'
import TextAreas from '../../components/Forms/TextAreas'
import FieldSets from '../../components/Forms/FieldSets'

// Icones //
import Icon from 'react-native-vector-icons/Feather'

// Estilo //
import styles from './styles'
import Select from '../../components/Forms/Select'
import { sub } from 'react-native-reanimated'

function TeacherForms() {

    const [weekDay, setWeekDay] = useState(0)
    const [subject, setSubject] = useState('')
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')

    const [cost, setCost] = useState('')
    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' },
    ])

    const weekOfDayArray = [
        "Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira",
        "Sexta-Feira", "Sábado"]

    const subjectsArray = ["Artes", "Educação Física", "Física", "História", "Matemática",
        "Português", "Química", "Sociologia"]

    return (
        <View style={styles.container}>

            <PageHeader
                title='Que incrível que você quer dar aulas.'
                description="O primeiro passo, é preencher esse formulário de inscrição."
                labelTop="Dar Aulas"
            />

            <View style={styles.content}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.formGroup}>

                        <FieldSets label="Seus dados" />
                        <View style={styles.profile}>
                            <Image source={{ uri: "https://avatars1.githubusercontent.com/u/56278484?s=460&v=4" }} style={styles.avatar} />
                            <View>
                                <Text style={styles.name}>Rogério Marques</Text>
                                <Text style={styles.subject}>Artes</Text>
                            </View>
                        </View>

                        <Inputs
                            label='WhatsApp'
                            keyboardType='number-pad'
                            placeholder='(XX) X-XXXX-XXXX'
                            onChangeText={(e) => setWhatsapp(e)}
                        />

                        <TextAreas
                            label='Biografia'
                            height={225}
                            textAlignVertical='top'
                            maxLength={200}
                            multiline={true}
                            placeholder='Conte-me mais sobre você...'
                            onChangeText={(e) => setBio(e)}
                        />
                    </View>

                    <View style={styles.formGroup}>

                        <FieldSets label="Sobre a aula" />
                        <Select
                            label='Matéria'
                            options={subjectsArray}
                            value={subject}
                            getLabel={((e: string) => setSubject(e))}
                        />

                        <Inputs
                            label='Custo da sua hora por aula'
                            placeholder='R$'
                            onChangeText={(e) => setCost(e)}
                        />
                    </View>


                    <View style={styles.formGroup}>

                        <FieldSets label="Horários Disponíveis">
                            <TouchableOpacity style={styles.buttonNewSchedule}>
                                <Text style={styles.buttonNewScheduleText}>+ Novo</Text>
                            </TouchableOpacity>
                        </FieldSets>

                        {
                            scheduleItems.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <Select
                                            label="Dia da Semana"
                                            options={weekOfDayArray}
                                            value={weekDay}
                                            getValue={(e: any) => setWeekDay(e)}
                                        />

                                        <View style={styles.timeInputs}>
                                            <Inputs label='Das' placeholder='Horas' />
                                            <Inputs label='Até' placeholder='Horas' />
                                        </View>

                                        <View style={styles.scheduleLine}>
                                            <TouchableOpacity style={styles.buttonDeleteItem}>
                                                <Text style={styles.buttonDeleteItemText}>Excluir Horário</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.buttonSubmit}>
                            <Text style={styles.buttonSubmitText}>Salvar cadastro</Text>
                        </TouchableOpacity>

                        <View style={styles.footerWarning}>
                            <Icon name='alert-octagon'
                                color={"#8257E5"}
                                size={35}
                                style={{ marginRight: 16 }}
                            />
                            <View>
                                <Text style={styles.importantText}>Importante !</Text>
                                <Text style={styles.legendText}>Preencha todos os dados</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default TeacherForms;