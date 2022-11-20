import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import style from './Login.module.css'

export const Login = ({ setAuth }) => {
    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = useNavigate()

    const handleUserLogin = (event) => {
        setUserLogin(event.target.value)
    }

    const handleUserPassword = (event) => {
        setUserPassword(event.target.value)
    }

    const handleClick = () => {
        const login = Cookies.get('login')
        const password = Cookies.get('password')
        if (login === userLogin && password === userPassword) {
            setAuth(true)
            Cookies.set("user", "loginTrue")
        } else {
            alert('wrong login or password')
        }
    }

    const handleRegister = () => {
        navigate('/register')
    }

    return (
        <form className={style.form}>
            <div>
                <input
                    className={style.input}
                    value={userLogin}
                    onChange={handleUserLogin}
                    type="text"
                    placeholder='login' />
            </div>
            <div>
                <input
                    className={style.input}
                    value={userPassword}
                    onChange={handleUserPassword}
                    type="password"
                    placeholder='password' />
            </div>
            <div>
                <button className={style.button} onClick={handleClick}>
                    Login
                </button>
            </div>
            <div>
                <button className={style.button} onClick={handleRegister}>
                    Register
                </button>
            </div>
        </form>
    )
}