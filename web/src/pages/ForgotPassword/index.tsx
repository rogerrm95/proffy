import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

// Componentes //
import PageLogin from '../../components/PageLogin'
import Input from '../../components/Input'

// Icones e Imagens //
import backIcon from './../../assets/images/icons/back.svg'

// Estilos //
import './style.css'
import api from '../../services/api'

const ForgotPassword: React.FC = () => {

    const history = useHistory()

    const [email, setEmail] = useState('')
    const [isDisable, setIsDisable] = useState(true)

    useEffect(() => {
        if (email === '') {
            setIsDisable(true)
        } else {
            setIsDisable(false)
        }
    }, [email])

    function handleToBack() {
        history.goBack()
    }

    function handleToInviteEmail() {
        api.post('/forgot-pass', { email })
            .then(() => {
                history.push({
                    pathname: '/success-message',
                    state: {
                        title: 'Redefinição Enviada!',
                        description: `
                            Boa, agora é só checar o e-mail que foi enviado para você redefinir sua
                            senha e aproveitar os estudos.`,
                        buttonText: 'Voltar ao Login'
                    }
                })
            }).catch(error => {
                alert(error.response.data)
            })
    }

    return (
        <PageLogin isDisplayReverse={true}>

            <div id="forgot-pass-content">
                <img
                    src={backIcon}
                    width='40'
                    onClick={handleToBack}
                    alt='voltar'
                />

                <h2>Eita, esqueceu sua senha?</h2>
                <p>Não esquenta, vamos dar um jeito nisso.</p>

                <form>
                    <Input
                        label='E-mail'
                        name='email'
                        value={email}
                        required
                        onChange={text => setEmail(text.target.value)} />
                </form>

                <button
                    className={isDisable ? 'button-disable' : 'button-active'}
                    disabled={isDisable ? true : false}
                    onClick={handleToInviteEmail}>
                    Enviar
                </button>
            </div>

        </PageLogin>
    )
}

export default ForgotPassword;