import userEvent from '@testing-library/user-event'
import { expect, describe, test, beforeEach, vi } from 'vitest'
import { fireEvent } from '@testing-library/react'
import { render } from '@testing-library/react'
import LoginForm from './LoginForm'

describe('LoginForm', () => {
    let container

    const notification = {
        error: '',
        success: '',
    }

    const handleSetUser = vi.fn()
    const handleSetNotification = vi.fn()
    const handleLogin = vi.fn()

    beforeEach(() => {
        container = render(
            <LoginForm
                notification={notification}
                handleSetUser={handleSetUser}
                handleSetNotification={handleSetNotification}
                handleLogin={handleLogin}
            />
        ).container
    })

    test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
        const user = userEvent.setup()
        const usernameInput = container.querySelector('#username')
        const passwordInput = container.querySelector('#password')
        const submitButton = container.querySelector('button')

        fireEvent.change(usernameInput, { target: { value: 'leo' } })
        fireEvent.change(passwordInput, { target: { value: 'password' } })

        await user.click(submitButton)
        await user.click(submitButton)

        expect(handleLogin).toHaveBeenCalledWith({
            username: 'leo',
            password: 'password'
        })
    })
})
