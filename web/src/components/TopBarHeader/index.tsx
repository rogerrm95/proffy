import React from 'react'
import { Link } from 'react-router-dom';

// Icons //
import backIcon from '../../assets/images/icons/back.svg'
import logoIcon from '../../assets/images/logo.svg'

// Estilos //
import './style.css'

interface TopBarHeaderProps {
    title: string
}

const TopBarHeader: React.FC<TopBarHeaderProps> = ({ title }) => {
    return (
        <div className='top-bar-container'>
            <Link to='/'>
                <img src={backIcon} alt="Voltar" />
            </Link>

            <span>{title}</span>

            <img src={logoIcon} alt="Logo" />
        </div>
    )
}

export default TopBarHeader;