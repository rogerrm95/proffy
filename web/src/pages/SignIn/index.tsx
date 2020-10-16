import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';

// Componentes //
import PageLogin from '../../components/PageLogin';
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';

// Icone //
import heartIcon from './../../assets/images/icons/purple-heart.svg'

// API e Contextos //
import api from '../../services/api';
import AuthContext from '../../contexts/auth';

// Estilos //
import './style.css'

const SignIn: React.FC = () => {

    const context = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isDisable, setIsDisable] = useState(true)
    const [isRemember, setIsRemember] = useState(false)

    useEffect(() => {

        if (email === '' || password === '') {
            setIsDisable(true)
        } else {
            setIsDisable(false)
        }
    }, [email, password])

    function handleToSignIn() {

        api.post('/signin', { email, password })
            .then(res => {
                const userData = JSON.stringify(res.data)

                localStorage.setItem('@proffyUser', userData)

                context.signIn(res.data)
            })
            .catch(error => {
                alert(error.response.data)
            })
    }

    return (
        <PageLogin isDisplayReverse={false}>

            <div id='login-content'>

                <h2>Fazer Login</h2>

                <form>
                    <Input
                        label='E-mail'
                        name='email'
                        value={email}
                        onChange={text => setEmail(text.target.value)} />

                    <InputPassword
                        name='password'
                        label='Senha'
                        value={password}
                        onChange={text => setPassword(text.target.value)} />

                </form>

                <span id='checkbox'>
                    <input
                        type='checkbox'
                        name='remember'
                        onChange={() => setIsRemember(!isRemember)}
                    />
                    <label htmlFor='remember'>Lembrar-me</label>
                </span>

                <Link
                    to='/forgot-pass'
                    className='link'
                    id='forgot-pass'>
                    Esqueci minha senha
                </Link>

                <button
                    className={isDisable ? 'button-disable' : 'button-active'}
                    disabled={isDisable ? true : false}
                    onClick={handleToSignIn}>
                    Entrar
                </button>


                <footer id='login-footer'>
                    <p>
                        Não tem conta? <br />
                        <Link
                            to='/signup'
                            className='link'
                            id='link-signup'>
                            Cadastra-se
                        </Link>
                    </p>

                    <p>É de graça <img src={heartIcon} alt='Coração Roxo' /></p>
                </footer>

            </div>
        </PageLogin>
    )
}

export default SignIn;