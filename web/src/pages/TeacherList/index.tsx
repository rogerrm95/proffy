import React, { useState, FormEvent } from 'react'

// Components //
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

// Icones //
import alertIcon from './../../assets/images/icons/alert-triangle.svg'
import userIcon from './../../assets/images/icons/users.svg'

// API //
import api from '../../services/api'

// CSS //
import './style.css'

function TeacherList() {

    const [teachers, setTeachers] = useState([])
    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    function searchTeachers(e: FormEvent) {
        e.preventDefault()
        
        api.get('/classes', {
            params: {
                subject, week_day, time
            }
        })
            .then(res => {
                const classes = res.data

                setTeachers(classes)
            })
            .catch(err => {
                alert(err.response.data)
            })
    }

    return (
        <div id="page-teacher-list" className='container'>

            <PageHeader
                title='Estes são os proffys disponíveis.'
                headerTitle='Estudar'>


                <form id='search-teachers' onSubmit={searchTeachers}>
                    <Select
                        name='subject'
                        label='Matéria'
                        value={subject}
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

                    <Select
                        name='week_day'
                        label='Dia da Semana'
                        value={week_day}
                        onChange={(e) => { setWeekDay(e.target.value) }}
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
                        name='time'
                        type='time'
                        label='Hora'
                        value={time}
                        onChange={(e) => { setTime(e.target.value) }}
                    />

                    <button type='submit'>Buscar</button>
                </form>

            </PageHeader>

            <main>
                {
                    teachers.map((teacher: Teacher) => {
                        return <TeacherItem key={teacher.id} info={teacher} />
                    })
                }

                {teachers.length === 0 ?
                    <p className='result-search'>
                        Sem resultados <img src={alertIcon} alt="Sem Resultados" />
                    </p>
                    :
                    <p className='result-search'>
                        Estes são os resultados encontrados <img src={userIcon} alt="Sem Resultados" />
                    </p>

                }
            </main>

        </div>
    )
}

export default TeacherList;