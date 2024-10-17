import { useState } from 'react'
import Notification from './Notification'

export default function LoginForm({
    handleSetUser,
    handleSetNotification,
    notification,
    handleLogin
}) {
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
            const user = await handleLogin(logInForm)
            window.localStorage.setItem('usserSession', JSON.stringify(user))
            handleSetUser(user)
            setLogInForm({
                username: '',
                password: '',
            })
        } catch (error) {
            handleSetNotification('incorrect username or password', 'error')
            console.log(error)
        }
    }

    return (
        <>
            <h1>log in to application</h1>
            {(notification.error || notification.success) && (
                <Notification
                    error={notification.error}
                    success={notification.success}
                />
            )}
            <form>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={logInForm.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={logInForm.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>login</button>
            </form>
        </>
    )
}
