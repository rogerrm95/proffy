import React, { useEffect, useState } from 'react'

// Icones //
import arrowDownIcon from './../../assets/images/icons/arrow-down.svg'

import './style.css'

interface SelectCustomProps {
    options: Array<any>
}

const SelectCustom: React.FC<SelectCustomProps> = ({ options }) => {

    const [label, setLabel] = useState(options[0])
    const [showOptions, setShowOptions] = useState(false)

    // Usando useEffect para fechar as opções do select quando o usuário clicar fora //
    useEffect(() => {

        // capturando o a div Root da aplicação //
        const root = document.getElementById('root') as HTMLElement

        // Adicionando um evento de click ao elemento root
        root.addEventListener('click', function () {

            // Ao clicar em qualquer parte do documento, Se as opções estiverem visíveis, feche-as //
            if (showOptions === true) {
                setShowOptions(false)
            }
        })
    }, [showOptions])

    return (
        <div className='select-custom-containter'>

            <p 
            onClick={() => setShowOptions(!showOptions)}>
                {label}
                <img src={arrowDownIcon} width='12' height='12'/>
            </p>

            <ul
                className='list'
                style={showOptions ? { display: "block" } : { display: "none" }}
            >
                {
                    options.map((item, index) => {
                        return (
                            <li
                                key={index}
                                value={label}
                                onClick={() => { setLabel(item) }}
                            >
                                {item}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default SelectCustom;