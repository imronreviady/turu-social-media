import axios from 'axios'
import { useHistory } from 'react-router'
import './register.css'

export default function Register() {
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const email = e.target.email.value
        const password = e.target.password.value
        const passwordConfirm = e.target.passwordConfirm.value

        if (passwordConfirm !== password) {
            alert('Password confirmation does not match')
        } else {
            const user = {
                username,
                email,
                password
            }

            try {
                await axios.post('/api/auth/register', user)
                history.push('/login')
            } catch (error) {
                console.log(error);
            }
        }
        
        //login({ email, password }, dispatch)
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
                        <input placeholder="Username" type="text" name="username" className="loginInput" required />
                        <input placeholder="Email" type="email" name="email" className="loginInput" required />
                        <input placeholder="Password" type="password" name="password" className="loginInput" required />
                        <input placeholder="Confirm Password" type="password" name="passwordConfirm" className="loginInput" required />
                        <button className="loginButton" type="submit">Sign Up</button>
                        <button className="loginRegisterButton">Login to your account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
