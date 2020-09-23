import React, { useState } from 'react'

// Logo // 
import logoImg from '../../assets/images/logo.svg'

import './style.css'

interface PageLoginProps {
    isDisplayReverse: Boolean
}

const PageLogin: React.FC<PageLoginProps> = ({ isDisplayReverse, children }) => {


    const [flexDirection] = useState(isDisplayReverse ? 'reverse' : 'normal')

    return (
        <div id="page-login" className={`container ${flexDirection}`}>

            <div id="header">
                <img src={logoImg} alt='Proffy' />
                <h2>Sua plataforma de estudos online.</h2>
            </div>

            <div id='content'>
                {children}
            </div>

        </div>
    )
}

export default PageLogin;