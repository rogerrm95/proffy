import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

// Componentes //
import PageLogin from '../../components/PageLogin';
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';

// Icones e Imagens //
import backIcon from './../../assets/images/icons/back.svg'

// Estilos //
import './style.css'
import api from '../../services/api';

const SignUp: React.FC = () => {

    const history = useHistory()

    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isDisable, setIsDisable] = useState(true)

    useEffect(() => {
        if (name === '' || lastname === '' || email === '' || password === '') {
            setIsDisable(true)
        } else {
            setIsDisable(false)
        }
    }, [name, lastname, email, password])

    function handleToBack() {
        history.goBack()
    }

    async function handleToRegister() {
        await api.post('/signup', { name, lastname, email, password })
            .then(() => {
                history.push({
                    pathname: '/success-message',
                    state: {
                        title: 'Cadastro Concluído',
                        description: `
                        Agora você faz parte da plataforma Proffy.
                        Tenha uma ótima experiência.
                            `,
                        buttonText: 'Fazer Login'
                    }
                })
            })
            .catch(error => { alert(error.response.data) })
    }

    return (
        <PageLogin isDisplayReverse={true}>
            <div id="signup-content">

                <img src={backIcon}
                    width='40'
                    onClick={handleToBack}
                    alt='voltar' />

                <h2>Cadastro</h2>
                <p>Preencha os dados abaixo para podermos começar.</p>

                <form>
                    <Input
                        name='name'
                        label='Nome'
                        value={name}
                        required
                        onChange={text => setName(text.target.value)} />

                    <Input
                        name='lastname'
                        label='Sobrenome'
                        value={lastname}
                        required
                        onChange={text => setLastname(text.target.value)} />

                    <Input
                        name='email'
                        label='E-mail'
                        value={email}
                        required
                        onChange={text => setEmail(text.target.value)} />

                    <InputPassword
                        name='password'
                        label='Senha'
                        value={password}
                        required
                        onChange={text => setPassword(text.target.value)} />
                </form>

                <button
                    id='signup-button'
                    className={isDisable ? 'button-disable' : 'button-active'}
                    onClick={handleToRegister}>
                    Concluir Cadastro
                </button>

            </div>
        </PageLogin>
    )
}

export default SignUp;