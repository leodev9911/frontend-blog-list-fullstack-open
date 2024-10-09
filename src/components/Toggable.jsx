import { useState, forwardRef, useImperativeHandle } from 'react'

export const Togabble = forwardRef(({ children, buttonLabel }, refs) => {
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
