import React, { InputHTMLAttributes, useState } from 'react'

// Icones e Imagens //
import eye from './../../assets/images/icons/eye.svg'
import eyeOff from './../../assets/images/icons/eye-off.svg'

import './style.css'

interface InputsProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string
}

const InputPassword: React.FC<InputsProps> = ({ name, label, ...rest }) => {

    const [hidePassword, setHidePassword] = useState(true)

    function toggleHidePassword() {
        setHidePassword(!hidePassword)
    }

    return (

        <div id="input-pass-block">
            
            <span>{label}</span>
            <div id='input-box-password'>
                <input type={hidePassword ? 'password' : 'text'} name={name} {...rest} />
                <img src={hidePassword ? eye : eyeOff} onClick={toggleHidePassword} alt='Esconder Senha'/>
            </div>

        </div>
    )
}

export default InputPassword;