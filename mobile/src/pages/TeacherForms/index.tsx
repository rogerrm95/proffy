import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image, SafeAreaView } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

// Componentes //
import TopBarHeader from '../../components/TopBarHeader'
import PageHeader from '../../components/PageHeader'
import ErrorMessage from '../../components/ErrorMessage'
import Inputs from '../../components/Forms/Inputs'
import TextAreas from '../../components/Forms/TextAreas'
import FieldSets from '../../components/Forms/FieldSets'
import Select from '../../components/Forms/Select'

// Icones //
import Icon from 'react-native-vector-icons/Feather'
import defaultAvatar from './../../assets/images/user.png'

// API | contexto | schema //
import api from '../../services/api'
import AuthContext from '../../contexts/auth'
import Schema from './schema'

// Estilo //
import styles from './styles'

function TeacherForms() {

    const { user } = useContext(AuthContext)
    const { navigate } = useNavigation()

    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')

    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [cost, setCost] = useState('')
    const [subject, setSubject] = useState('')
    const [weekDay, setWeekDay] = useState(0)
    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' },
    ])

    const weekOfDayArray = [
        "Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira",
        "Sexta-Feira", "Sábado"]

    const subjectsArray = ["Artes", "Educação Física", "Física", "História", "Matemática",
        "Português", "Química", "Sociologia"]

    // Carregando os dados através da API //
    useEffect(() => {

        api.get('/perfil', {
            params: user
        })
            .then(res => {
                const data = res.data

                setName(data.name)
                setLastname(data.lastname)
                setAvatar(data.avatar)
                setWhatsapp(data.whatsapp)
                setBio(data.bio)
                setEmail(data.email)
                setSubject(data.subjects[0].subject)

            })
            .catch(e => {
                alert(e.response.data)
            })
    }, [])

    function addNewScheduleItem() {
        setScheduleItems([...scheduleItems, {
            week_day: 0, from: '', to: ''
        }])
    }

    function deleteScheduleItem(index: number) {
        if (scheduleItems.length > 1) {
            delete scheduleItems[index]

            const filtered = scheduleItems.filter(item => {
                return item !== undefined
            })

            setScheduleItems(filtered)
        }
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem
        })

        setScheduleItems(updateScheduleItems)
    }

    function handleSubmit() {

        // Validação //
        // Irá comparar os dados do formulário com o schema definido no arquivo schema.js //
        Schema.validate({
            whatsapp, bio, subject, cost, schedule: scheduleItems
        }).then(() => {

            api.post('/classes', {
                email, whatsapp, bio, subject, cost, schedule: scheduleItems
            })
                .then(() => {
                    navigate('SucessMessage', {
                        title: 'Aula cadastrada!',
                        description: "Tudo certo, sua aula ja foi cadastrada e você já está na nossa lista de professores. \n\n Agora, basta ficar ligado no seu Whatsapp.",
                        buttonText: 'Home'
                    })
                })
                .catch((e) => {
                    alert(e)
                })
        }).catch(e => {

            // Exibirá um aviso caso a validação falhe //
            setShowMessage(true)
            setMessage(e.errors)

            setTimeout(() => {
                setShowMessage(false)
            }, 4500)
        })
    }

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
                            <Image source={avatar ? { uri: avatar } : defaultAvatar} style={styles.avatar} />
                            <View>
                                <Text style={styles.name}>{`${name} ${lastname}`}</Text>
                                <Text style={styles.subject}>{subject}</Text>
                            </View>
                        </View>

                        <Inputs
                            label='WhatsApp'
                            keyboardType='number-pad'
                            placeholder='(XX) X-XXXX-XXXX'
                            value={whatsapp}
                            onChangeText={(e) => setWhatsapp(e)}
                        />

                        <TextAreas
                            label='Biografia'
                            height={225}
                            textAlignVertical='top'
                            maxLength={200}
                            multiline={true}
                            placeholder='Conte-me mais sobre você...'
                            value={bio}
                            onChangeText={(e) => setBio(e)}
                        />
                    </View>

                    <View style={styles.formGroup}>

                        <FieldSets label="Sobre a aula" />
                        <Select
                            label='Matéria'
                            options={subjectsArray}
                            selectedValue={subject}
                            onValueChange={((e: string) => setSubject(e))}
                        />

                        <Inputs
                            label='Custo da sua hora por aula'
                            placeholder='R$'
                            onChangeText={(e) => setCost(e)}
                        />
                    </View>


                    <View style={styles.formGroup}>

                        <FieldSets label="Horários Disponíveis">
                            <TouchableOpacity style={styles.buttonNewSchedule} onPress={addNewScheduleItem}>
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
                                            selectedValue={item.week_day}
                                            onValueChange={(text: any) => setScheduleItemValue(index, 'week_day', text)}
                                        />

                                        <View style={styles.timeInputs}>
                                            <Inputs
                                                label='Das'
                                                placeholder='00h00'
                                                value={item.from}
                                                onChangeText={text => setScheduleItemValue(index, 'from', text)}
                                            />
                                            <Inputs
                                                label='Até'
                                                placeholder='00h00'
                                                value={item.to}
                                                onChangeText={text => setScheduleItemValue(index, 'to', text)}
                                            />
                                        </View>

                                        <View style={styles.scheduleLine}>
                                            <TouchableOpacity style={styles.buttonDeleteItem} onPress={() => deleteScheduleItem(index)}>
                                                <Text style={styles.buttonDeleteItemText}>Excluir Horário</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmit}>
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

            {
                showMessage ? <ErrorMessage text={message} /> : null
            }
        </View>
    )
}

export default TeacherForms;