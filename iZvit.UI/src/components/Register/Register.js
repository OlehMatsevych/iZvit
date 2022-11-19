import Cookies from "js-cookie";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import style from '../Login/Login.module.css'

const Register = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = (event) => {
        setLogin(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleClick = (e) => {
        if (login.length && password.length) {
            Cookies.set("login", login)
            Cookies.set("password", password)
            navigate('/')
        } else {
            e.preventDefault()
            alert('wrong login or password')
        }
    }

    return (
        <div>
            <form className={style.form}>
                <div>
                    <input
                        className={style.input}
                        value={login}
                        onChange={handleLogin}
                        type='text'
                        placeholder="login" />
                </div>
                <div>
                    <input
                        className={style.input}
                        value={password}
                        onChange={handlePassword}
                        type="password"
                        placeholder="password" />
                </div>
                <div>
                    <button className={style.button} onClick={handleClick}>
                        register
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Register