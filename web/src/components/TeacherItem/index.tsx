import React from 'react'

// Componentes //
import DayOfWeekItem, { DayOfWeekItemProps } from './../DayOfWeekItem'

// Icon //
import whatsappIcon from './../../assets/images/icons/whatsapp.svg'

// API //
import api from '../../services/api'

// CSS //
import './style.css'

export interface Teacher {
    id: number,
    name: string
    avatar: string,
    bio: string,
    cost: number,
    subject: string,
    whatsapp: string,
    times: Array<object>
}

interface TeacherItemProps {
    info: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ info }) => {

    const weekDay = [
        "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
    ]

    const times = info.times as Array<any>

    function createConnections() {
        api.post('/connections', {
            user_id: info.id
        })
    }

    return (
        <article className='teacher-item'>
            <header>
                <img
                    src={info.avatar}
                    alt="Avatar" />

                <div>
                    <strong>{info.name}</strong>
                    <span>{info.subject}</span>
                </div>
            </header>

            <p>{info.bio}</p>

            <div className='week-container'>
                {
                    weekDay.map((week: string, index) => {

                        let item;
                        const arrayOfTime = [] as Array<any>

                        times.map((time: DayOfWeekItemProps) => {

                            if (time.week_day === index) {
                                const item = `De: ${time.from}h${'\n'}Às: ${time.to}h`


                                arrayOfTime.push(item)
                            }

                            return item = <DayOfWeekItem keys={index} times={arrayOfTime} week={week} key={index} />
                        })
                        return item
                    })
                }
            </div>


            <footer>
                <p>
                    Preço por Hora: <strong>R${info.cost},00</strong>
                </p>

                <a
                    href={`https://wa.me/${info.whatsapp}`}
                    onClick={createConnections}
                    target='blank'>

                    <img src={whatsappIcon} alt="WhatsApp" />
                    Entrar em Contato
                </a>
            </footer>

        </article>
    )
}

export default TeacherItem;