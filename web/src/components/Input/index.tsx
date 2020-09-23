import React, { InputHTMLAttributes } from 'react'

import './style.css'

interface InputsProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    icon?: string
}

const Input: React.FC<InputsProps> = ({ label, name, icon, ...rest }) => {
    return (

        <div className='input-block' id={`input-block-${name}`}>
            <label htmlFor={name}>
                {icon ? <img src={icon} width='16' alt='Ícone'/> : null} {label}
            </label>

            <input type="text" id={name} {...rest} />
        </div>
    )
}

export default Input;