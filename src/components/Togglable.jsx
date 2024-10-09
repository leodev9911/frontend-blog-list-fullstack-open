import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

export const Togglable = forwardRef(({ children, buttonLabel }, refs) => {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => {
        setIsVisible((prev) => !prev)
    }

    useImperativeHandle(refs, () => ({
        toggleVisibility
    }))

    return (
        <>
            {!isVisible ? (
                <button onClick={toggleVisibility}>{buttonLabel}</button>
            ) : (
                <>
                    {children}
                    <button onClick={toggleVisibility}>cancel</button>
                </>
            )}
        </>
    )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}