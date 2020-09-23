import React from 'react'

// Estilos //
import './style.css'
import { useLocation, useHistory } from 'react-router'

function SucessMessage() {

    const { state }: any = useLocation()
    const history = useHistory()

    return (
        <div id="page-sucess-message" className='container'>
            <h1>{state.title}</h1>
            <p>{state.description}</p>
            <button
                className='button-active' onClick={() => history.push('/')}>
                {state.buttonText}
            </button>
        </div>
    )
}

export default SucessMessage;