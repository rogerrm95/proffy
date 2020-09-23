import React, { TextareaHTMLAttributes } from 'react'

import './style.css'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;
    legend?: string
}

const Textarea: React.FC<TextareaProps> = ({ label, name, legend, ...rest }) => {
    return (
        <div className='textarea-block'>
            <label htmlFor={name}> {label} {legend ?
                <span>{legend}</span> : null}
            </label>

            <textarea id={name} {...rest}/>
        </div>
    )
}

export default Textarea;