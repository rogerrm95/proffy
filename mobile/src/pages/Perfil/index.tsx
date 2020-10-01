import React, { useContext, useEffect, useState } from 'react'
import { View, Image, Text, ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';

// Componentes //
import PageHeader from '../../components/PageHeader';
import ErrorMessage from '../../components/ErrorMessage';
import FieldSets from '../../components/Forms/FieldSets';
import Inputs from '../../components/Forms/Inputs';
import Select from '../../components/Forms/Select';
import TextAreas from '../../components/Forms/TextAreas';

// Icones e Imagens //
import avatarDefault from './../../assets/images/user.png'
import Icon from 'react-native-vector-icons/Feather'
import topBackground from './../../assets/images/backgroundPerfil.png'

// Utils //
import { subjectsList, weekDayList } from './../../utils/subjectsList'

// API e Contexto //
import AuthContext from '../../contexts/auth';
import api from '../../services/api';

// Estilos //
import styles from './styles'
import style from '../../components/ErrorMessage/styles';
import { useNavigation } from '@react-navigation/native';

interface OptionProps {
    subject: string,
    cost: number,
    id: string,
    timeOfClass: Array<timeProps>
}

interface timeProps {
    week_day: number,
    to: string,
    from: string,
    class_id: number
}

function Perfil() {

    const { user } = useContext(AuthContext)
    const { navigate } = useNavigation()

    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [oldEmail, setOldEmail] = useState('')
    const [isPopupVisible, setIsPopupVisible] = useState(false)

    // Usuário //
    const [avatar, setAvatar] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [whatsapp, setWhatsapp] = useState('')

    // Máteria //
    const [subjects, setSubjects] = useState([])
    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')

    // Horários //
    const [times, setTimes] = useState([] as any)

    // Carrega os dados do usuário //
    useEffect(() => {

        api.get('/perfil', { params: user })
            .then(res => {
                const data = res.data

                const timeOfClass = data.subjects
                setOldEmail(data.email)

                setAvatar(data.avatar)
                setName(data.name)
                setLastname(data.lastname)
                setBio(data.bio)
                setEmail(data.email)
                setWhatsapp(data.whatsapp)

                setSubjects(data.subjects)

                timeOfClass.map((e: any) => {
                    return times.push(e)
                })
            })
            .catch(e => {
                alert(e.response.data)
            })
    }, [])

    function loadingCostAndTimes(value: string) {

        times.length = 0

        subjects.forEach((option: OptionProps) => {

            if (value == option.subject) {

                setCost(option.cost.toString())
                setSubject(option.subject)

                option.timeOfClass.forEach((time: timeProps) => {
                    times.push(time)
                })
            }
        })
    }

    function handleDeleteTime(id: Number, classId: Number) {

        api.delete('/perfil', {
            params: {
                id, class_id: classId
            }
        }).then(res => {
            setTimes(res.data)
        }).catch(e => {
            alert(e.response.data)
        })
    }

    async function handleSubmit() {

        api.put('/perfil', {
            oldEmail, name, lastname, avatar, email, whatsapp, bio, cost, subject
        })
            .then(async res => {

                const storage = JSON.parse(await SecureStore.getItemAsync('proffyUser') as string)
                const newData = {
                    name, lastname, avatar, email
                } as Object

                const newStorage = { ...storage, ...newData }

                await SecureStore.setItemAsync('proffyUser', JSON.stringify(newStorage))

                navigate('SucessMessage', {
                    title: 'Cadastro Atualizado',
                    description: `Tudo certo, seu cadastro está na nossa lista de professores.
                    \nAgora é só ficar de olho no seu WhatsApp.`,
                    buttonText: 'Home'
                })

            })
            .catch(error => {
                alert(error.response.data)
            })
    }

    return (
        <View style={styles.container}>
            <PageHeader labelTop='Perfil'>
                <ImageBackground style={styles.photoBox} source={topBackground} resizeMode='contain'>
                    <Image source={avatarDefault} style={styles.photo} />
                    <Text style={styles.name}>Rogério Marques</Text>
                </ImageBackground>
            </PageHeader>

            <View style={styles.content}>
                <ScrollView style={styles.scrollForms}>
                    <View style={styles.formGroup}>
                        <FieldSets label='Seus Dados' />

                        <Inputs
                            label="Nome *"
                            placeholder='Nome'
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                        <Inputs
                            label="Sobrenome *"
                            placeholder='Sobrenome'
                            value={lastname}
                            onChangeText={(text) => setLastname(text)}
                        />
                        <Inputs
                            label="E-mail *"
                            value={email}
                            placeholder='@'
                            onChangeText={(text) => setEmail(text)}
                        />
                        <Inputs
                            label="WhatsApp *"
                            value={whatsapp}
                            placeholder="(XX) X-XXXX-XXXX"
                            onChangeText={(text) => setWhatsapp(text)}
                        />

                        <TextAreas
                            label="Biografia *"
                            height={225}
                            placeholder="Conte-me mais sobre você..."
                            value={bio}
                            onChangeText={(text) => setBio(text)} />

                    </View>

                    <View style={styles.formGroup}>
                        <FieldSets label='Sobre a aula' />

                        <Select
                            label="Matéria *"
                            selectedValue={subject}
                            onValueChange={((text: any) => loadingCostAndTimes(text))}
                            options={
                                subjects.map((option: OptionProps, index) => {
                                    return option.subject
                                })}
                        />
                        <Inputs
                            label="Custo da sua hora por aula *"
                            placeholder="R$ 0,00"
                            value={cost}
                            onChangeText={(text) => setLastname(text)}
                        />
                    </View>

                    <View style={styles.formGroup}>

                        <FieldSets label="Horários Disponíveis" />
                        {
                            times.length !== 0 ?
                                times.map((scheduleItem: any, index: number) => {
                                    return (
                                        <View key={index}>
                                            <Select
                                                label="Dia da Semana"
                                                options={weekDayList}
                                                selectedValue={weekDayList[scheduleItem.week_day]}
                                            />

                                            <View style={styles.timeInputs}>
                                                <Inputs
                                                    label='Das'
                                                    placeholder='00h00'
                                                    value={scheduleItem.from}
                                                />
                                                <Inputs
                                                    label='Até'
                                                    placeholder='00h00'
                                                    value={scheduleItem.to}
                                                />
                                            </View>

                                            <View style={styles.scheduleLine}>
                                                <TouchableOpacity
                                                    style={styles.buttonDeleteItem}
                                                    onPress={() => { handleDeleteTime(scheduleItem.id, scheduleItem.class_id) }}>

                                                    <Text style={styles.buttonDeleteItemText}>
                                                        Excluir Horário
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                })
                                :
                                <View style={styles.noTime}>
                                    <Text style={styles.noTimeText}>
                                        Nenhum horário cadastrado
                                    </Text>
                                    <Icon name="x-circle" size={20} color="#8257E5" />
                                </View>
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
            </View >
            {
                showMessage ? <ErrorMessage text={message} /> : null
            }

        </View >
    )
}

export default Perfil;