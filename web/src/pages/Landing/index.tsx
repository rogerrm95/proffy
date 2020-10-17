import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

// Icons and Images //
import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'
import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcons from '../../assets/images/icons/purple-heart.svg'
import logoutIcon from './../../assets/images/icons/power.svg'
import userDefault from './../../assets/images/user.png'

// API //
import api from '../../services/api'
import AuthContext from '../../contexts/auth'

// CSS //
import "./style.css"

function Landing() {

    // Pasta Estática //
    const url = 'http://localhost:8081/public'

    
    const context = useContext(AuthContext)
    
    const [totalConnections, setTotalConnections] = useState(0)
    const [avatar, setAvatar] = useState('')
    const [name, setName] = useState('')
    
    useEffect(() => {

        api.get('/connections').then(res => {
            const { total } = res.data

            setTotalConnections(total)
        })
    }, [])

    useEffect(() => {
        const storage: any = localStorage.getItem('@proffyUser')
        const data = JSON.parse(storage)

        setAvatar(data.avatar)
        setName(`${data.name} ${data.lastname}`)

    }, [])
    
    function handleToLogout() {

        localStorage.removeItem('@proffyUser')

        context.signIn(null)
    }

    return (
        <div id="page-landing">

            <div id="page-langing-header" className="container">

                <div className='top-bar'>

                    <Link to='/perfil' className='perfil'>
                        <img
                            src={avatar ? `${url}/${avatar}` : userDefault}
                            alt='Foto de Perfil'
                        />
                        <span>{name}</span>
                    </Link>

                    <button onClick={handleToLogout}>
                        <img src={logoutIcon} alt='Sair' />
                    </button>

                </div>

                <div className="logo-container">
                    <img src={logoImg} alt="ProFFy" />
                    <h2>Sua plataforma de estudos online.</h2>
                </div>

                <img
                    src={landingImg}
                    alt="Plataforma de Estudos"
                    className='hero-image'
                />

            </div>

            <div id="page-langing-content" className="container">

                <h2 className='content-title'>Seja bem-vindo. <br></br>
                    <strong> O que deseja fazer?</strong>
                </h2>

                <div className="buttons-container">
                    <Link to="/study" className='study'>
                        <img src={studyIcon} alt="Estudar" />
                        Estudar
                    </Link>

                    <Link to="/give-classes" className='give-classes'>
                        <img src={giveClassesIcon} alt="Dar Aulas" />
                        Dar Aulas
                    </Link>
                </div>

                <span className="total-connections">
                    Total de {totalConnections} conexões já realizadas.
                    <img src={purpleHeartIcons} alt="Coração Roxo" />
                </span>

            </div>

        </div >
    )
}

export default Landing;