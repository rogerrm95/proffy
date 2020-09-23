import React, { useContext, useEffect, useState, FormEvent } from 'react'

// Componentes //
import TopBarHeader from '../../components/TopBarHeader'
import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import Select from '../../components/Select'

// Contexto e API//
import AuthContext from './../../contexts/auth'
import api from '../../services/api'

// Icones e Imagens //
import userDefault from './../../assets/images/user.png'
import cameraIcon from './../../assets/images/icons/camera.svg'
import linkIcon from './../../assets/images/icons/purple-link.svg'
import warningIcon from './../../assets/images/icons/warning.svg'
import noTimeIcon from './../../assets/images/icons/x-circle.svg'

// Estilos //
import './style.css'

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

function UserPerfil() {

    const { user } = useContext(AuthContext)
    const [oldEmail, setOldEmail] = useState('')

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

    const [isPopupVisible, setIsPopupVisible] = useState(false)
    const [hasScheduleItem, setHasScheduleItem] = useState(false)

    useEffect(() => {

        api.get('/perfil', {
            params: user
        })
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

                setHasScheduleItem(true)
            }
        })
    }

    function handleUpdateData(e: FormEvent) {
        e.preventDefault()

        api.put('/perfil', {
            oldEmail, name, lastname, avatar, email, whatsapp, bio, cost, subject
        }).then(res => {

            const storage = JSON.parse(localStorage.getItem('@proffyUser') as string)

            const newData = {
                name, lastname, avatar, email
            } as Object


            const newStorage = { ...storage, ...newData }

            localStorage.setItem('@proffyUser', JSON.stringify(newStorage))

            window.location.reload()
        })
            .catch(error => {
                alert(error.response.data)
            })
    }

    function handleDeleteTime(id: Number, classId: Number) {

        api.delete('/perfil', {
            params: {
                id, class_id: classId
            }
        }).then(res => {
            alert('X - Registro Apagado !')
            window.location.reload()
        }).catch(e => {
            alert(e.response.data)
        })
    }

    return (
        <div id="page-perfil">
            <TopBarHeader title='Perfil' />

            <div className="perfil-info">
                <img
                    src={avatar ? avatar : userDefault}
                    alt='Foto de Perfil'
                    id='info-photo' />
                <img
                    src={cameraIcon}
                    alt='Adicionar Foto'
                    id='info-camera'
                    onClick={() => setIsPopupVisible(true)} />
                <h2>
                    {`${name} ${lastname}`}
                </h2>
            </div>

            <main className="perfil-forms">

                <form onSubmit={handleUpdateData}>

                    <fieldset id='forms-user'>
                        <legend>Seus dados</legend>

                        <div>
                            <Input
                                name='name'
                                label='Nome *'
                                value={name}
                                required
                                onChange={(e) => { setName(e.target.value) }}
                            />

                            <Input
                                name='lastname'
                                label='Sobrenome *'
                                value={lastname}
                                required
                                onChange={(e) => { setLastname(e.target.value) }}
                            />


                            <Input
                                name='email'
                                label='E-mail *'
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />

                            <Input
                                name='whatsapp'
                                label='WhatsApp *'
                                value={whatsapp}
                                required
                                onChange={(e) => { setWhatsapp(e.target.value) }}
                            />

                            <TextArea
                                name='bio'
                                label='Biografia *'
                                legend='(Máximo de 300 caracteres)'
                                value={bio}
                                required
                                onChange={(e) => { setBio(e.target.value) }}
                            />
                        </div>
                    </fieldset>

                    <fieldset id='forms-subjects'>
                        <legend>Sobre a aula</legend>
                        <div>
                            <Select
                                name='subject'
                                label='Matéria'
                                value={subject}
                                onChange={(e) => loadingCostAndTimes(e.target.value)}
                                options={
                                    subjects.map((option: OptionProps, index) => {
                                        return {
                                            label: option.subject, value: option.subject, key: index
                                        }
                                    })}
                            />

                            <Input
                                name='cost'
                                label='Custo da sua hora por aula   (em R$)'
                                value={cost}
                                required
                                onChange={(e) => { setCost(e.target.value) }}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários Disponíveis
                        </legend>

                        {
                            hasScheduleItem ?
                                times.map((scheduleItem: any, index: number) => {

                                    return (
                                        <div key={index} className="schedule-item">
                                            <Select
                                                name='week_day'
                                                label='Dia da Semana'
                                                value={scheduleItem.week_day}
                                                disabled
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
                                                type='text'
                                                value={scheduleItem.from}
                                                disabled
                                            />

                                            <Input
                                                name='to'
                                                label='Até'
                                                type='text'
                                                value={scheduleItem.to}
                                                disabled
                                            />

                                            <div id='schedule-line'>
                                                <button
                                                    type='button'
                                                    onClick={() => {
                                                        handleDeleteTime(scheduleItem.id, scheduleItem.class_id)
                                                    }}>
                                                    Excluir Horário
                                                </button>
                                            </div>

                                        </div>
                                    )
                                })
                                :
                                <div id='no-time'>
                                    Nenhum horário cadastrado! <img src={noTimeIcon} alt='Sem Horários' />
                                </div>
                        }

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

            {
                isPopupVisible ?
                    <div id='pop-up'>
                        <div className='window'>

                            <h2>Adicionar Foto:</h2>

                            <Input label='URL' name='url' icon={linkIcon}/>

                            <div className="buttons-container">
                                <button
                                    id='save'
                                    onClick={() => {
                                        const url = (document.querySelector('#url')) as HTMLInputElement
                                        setAvatar(url.value)
                                        setIsPopupVisible(false)
                                    }}>
                                    Salvar
                                </button>

                                <button
                                    id='delete'
                                    onClick={() => { setAvatar('') }}>
                                    Excluir
                                </button>

                                <button
                                    id='close'
                                    onClick={() => { setIsPopupVisible(false) }}>
                                    Fechar
                                </button>

                            </div>
                        </div>
                    </div>
                    : null
            }
        </div >
    )
}

export default UserPerfil;