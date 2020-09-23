import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// Componentes //
import PageLogin from '../../components/PageLogin'
import InputPassword from '../../components/InputPassword'

// API //
import api from '../../services/api'

// Icones e Imagens //
import backIcon from './../../assets/images/icons/back.svg'

// Estilos //
import './style.css'

function ResetPassword() {

    const history = useHistory()

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
    const [isDisable, setIsDisable] = useState(true)

    useEffect(() => {
        getDataURL()

        if (password === '' || confirmPassword === '') {
            setIsDisable(true)
        } else {
            setIsDisable(false)
        }
    }, [password, confirmPassword])

    function handleToChangePassword() {
        api.post('/reset-pass', { password, confirmPassword, email, token })
            .then(() => {
                history.push({
                    pathname: '/success-message',
                    state: {
                        title: 'Senha alterada!',
                        description: `
                            Prontinho, sua nova senha foi cadastrada.
                            Tente logar novamente e bons estudos.
                            `,
                        buttonText: 'Fazer Login'
                    }
                })
            })
            .catch(e => alert(e.response.data))
    }

    function handleToBack() {
        history.goBack()
    }

    function getDataURL() {

        const query = window.location.search.slice(1);
        const parts = query.split('&');
        const values = [] as Array<string>

        parts.forEach((part: string) => {
            const keyValue = part.split('=');
            const value = keyValue[1];
            values.push(value)
        });

        setEmail(values[1])
        setToken(values[2])
    }

    return (
        <PageLogin isDisplayReverse={false}>

            <div id='reset-pass-content'>

                <img src={backIcon} id='back-icon' onClick={handleToBack} alt='Voltar' />

                <h2>Definição de uma nova senha:</h2>

                <form>
                    <InputPassword
                        onChange={text => setPassword(text.target.value)}
                        name='password'
                        value={password}
                        label='Nova Senha:'
                        required
                    />

                    <InputPassword
                        onChange={text => setConfirmPassword(text.target.value)}
                        name='confirm-password'
                        label='Confirmação de senha:'
                        value={confirmPassword}
                        required
                    />
                </form>

                <button
                    onClick={handleToChangePassword}
                    disabled={isDisable}
                    className={isDisable ? 'button-disable' : 'button-active'}>
                    Resetar
                    </button>

            </div>

        </PageLogin>
    )
}
export default ResetPassword;