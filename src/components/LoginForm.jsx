import { useState } from 'react'
import loginService from '../services/login'

export default function LoginForm({ handleSetUser }) {
    const [logInForm, setLogInForm] = useState({
        username: '',
        password: '',
    })

    const handleChange = (event) => {
        const { value, name } = event.target

        setLogInForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login(logInForm)
            handleSetUser(user)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>  
            <h1>log in to application</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </>
    )
}
