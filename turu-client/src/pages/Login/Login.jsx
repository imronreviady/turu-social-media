import './login.css'
import { login } from '../../api'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@material-ui/core'

export default function Login() {
    const { user, isFatching, error, dispatch } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        
        login({ email, password }, dispatch)
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Turu Social</h3>
                    <span className="loginDesc">Connect with people and world around you!</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input placeholder="Email" required type="email" name="email" className="loginInput" />
                        <input placeholder="Password" minLength="5" required type="password" name="password" className="loginInput" />
                        <button type="submit" className="loginButton" disabled={isFatching}>{ isFatching ? <CircularProgress color="white" /> : "Log In" }</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">{ isFatching ? <CircularProgress color="white" /> : "Create a new account" }</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
