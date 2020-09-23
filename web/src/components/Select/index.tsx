import React, { SelectHTMLAttributes } from 'react'

import './style.css'

interface SelectsProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    options: Array<{
        value: string,
        label: string,
    }>
}

const Select: React.FC<SelectsProps> = ({ label, name, options, ...rest }) => {
    return (
        <div className='select-block' id={`select-block-${name}`}>

            <label htmlFor={name}> {label}</label>

            <select value='' id={name} {...rest}>
                <option value='' disabled>Selecione uma opção</option>

                {options.map((option, index) => {
                    return <option
                        value={option.value}
                        key={index}
                        label={option.label} />
                })}
            </select>

        </div>
    )
}

export default Select;