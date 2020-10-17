import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// Components //
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/TextArea'
import Select from '../../components/Select'

// Icones e Imagens //
import warningIcon from './../../assets/images/icons/warning.svg'
import avatarDefault from './../../assets/images/user.png'

// API e Context //
import api from '../../services/api'
import AuthContext from '../../contexts/auth'

// CSS //
import './style.css'

function TeacherForms() {

    // Pasta Estática //
    const url = 'http://localhost:8081/public'

    const { user } = useContext(AuthContext)
    const history = useHistory()

    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')

    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')
    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' },
    ])

    useEffect(() => {

        api.get('/perfil', {
            params: user
        })
            .then(res => {
                const data = res.data

                setAvatar(data.avatar)
                setName(data.name)
                setLastname(data.lastname)
                setWhatsapp(data.whatsapp)
                setBio(data.bio)
                setEmail(data.email)
            })
            .catch(e => {
                alert(e.response.data)
            })

    }, [user])

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            {
                week_day: 0, from: '', to: ''
            }
        ])
    }

    function deleteScheduleItens(index: number) {

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

    function handleCreateClass(e: FormEvent) {
        e.preventDefault()

        api.post('/classes', {
            email, whatsapp, bio, subject, cost, schedule: scheduleItems
        })
            .then(() => {
                history.push({
                    pathname: '/success-message',
                    state: {
                        title: 'Aula cadastrada!',
                        description: `
                        Tudo certo, sua aula ja foi cadastrada e você já está na nossa lista de professores.
                        Agora, basta ficar ligado no seu Whatsapp.
                            `,
                        buttonText: 'Home'
                    }
                })
            })
            .catch((e) => {
                alert(e.response.data)
            })
    }

    return (
        <div id="page-teacher-form">
            <PageHeader
                headerTitle='Dar Aulas'
                title='Que incrível que você quer dar aulas.'
                description='O primeiro passo é preencher este formulário de inscrição.'
            />

            <main>

                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>

                        <div id='forms-user'>

                            <img
                                src={avatar ? `${url}/${avatar}` : avatarDefault}
                                alt='Foto de Perfil' id='photo-user'
                            />

                            <span>{`${name} ${lastname}`}</span>

                            <Input
                                name='whatsapp'
                                label='WhatsApp'
                                value={whatsapp}
                                required
                                onChange={(e) => { setWhatsapp(e.target.value) }}
                            />

                            <Textarea
                                name='bio'
                                label='Biografia'
                                value={bio}
                                required
                                onChange={(e) => { setBio(e.target.value) }}
                            />

                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Dados da Aula</legend>

                        <div id='forms-subject'>
                            <Select
                                name='subject'
                                label='Matéria'
                                value={subject}
                                required
                                onChange={(e) => { setSubject(e.target.value) }}
                                options={[
                                    { value: "Artes", label: "Artes" },
                                    { value: "Matemática", label: "Matemática" },
                                    { value: "Português", label: "Português" },
                                    { value: "História", label: "História" },
                                    { value: "Química", label: "Química" },
                                    { value: "Física", label: "Física" },
                                    { value: "Educação Física", label: "Educação Física" },
                                    { value: "Sociologia", label: "Sociologia" },
                                ]} />
                            <Input
                                name='cost'
                                label='Custo hora/aula (em R$)'
                                value={cost}
                                onChange={(e) => { setCost(e.target.value) }}
                                required
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários Disponíveis
                        <button type='button' onClick={addNewScheduleItem}>+ Novo Horário</button>
                        </legend>

                        {
                            scheduleItems.map((scheduleItem, index) => {
                                return (
                                    <div key={index} className="schedule-item">
                                        <Select
                                            name='week_day'
                                            label='Dia da Semana'
                                            value={scheduleItem.week_day}
                                            required
                                            onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                            options={[
                                                { value: "0", label: "Domingo" },
                                                { value: "1", label: "Segunda-Feira" },
                                                { value: "2", label: "Terça-Feira" },
                                                { value: "3", label: "Quarta-Feira" },
                                                { value: "4", label: "Quinta-Feira" },
                                                { value: "5", label: "Sexta-Feira" },
                                                { value: "6", label: "Sábado" }
                                            ]} />

                                        <Input
                                            name='from'
                                            label='Das'
                                            type='time'
                                            value={scheduleItem.from}
                                            required
                                            onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                        />

                                        <Input
                                            name='to'
                                            label='Até'
                                            type='time'
                                            value={scheduleItem.to}
                                            required
                                            onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                        />

                                        <div id='schedule-line'>
                                            <button
                                                type='button'
                                                onClick={() => deleteScheduleItens(index)}>
                                                Excluir Horário
                                        </button>
                                        </div>

                                    </div>
                                )
                            })}

                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante" />
                        Importante !<br />
                        Preencha todos os dados
                        </p>

                        <button type='submit'>Salvar Cadastro</button>
                    </footer>

                </form>

            </main>

        </div>
    )
}

export default TeacherForms;