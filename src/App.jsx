import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import CreateNewBlog from './components/CreateNewBlogForm'
import Notification from './components/Notification'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(
        window.localStorage.getItem('usserSession')
            ? JSON.parse(window.localStorage.getItem('usserSession'))
            : null
    )
    const [notification, setNotification] = useState({
        error: '',
        success: '',
    })

    const handleSetNotification = (message, type) => {
        setNotification((prev) => ({
            ...prev,
            [type]: message,
        }))

        setTimeout(() => {
            setNotification({
                error: '',
                success: '',
            })
        }, 5000)
    }

    const handleAddBlog = (newBlog) => {
        setBlogs((prev) => [...prev, newBlog])
    }

    useEffect(() => {
        if (user) {
            blogService.setToken(user.token)
            fetchBlogs()
        }
    }, [user])

    const handleSetUser = (u) => {
        setUser(u)
    }

    const handleLogOut = () => {
        handleSetUser(null)
        window.localStorage.removeItem('usserSession')
    }

    const fetchBlogs = async () => {
        try {
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            {user ? (
                <>
                    <h2>blogs</h2>
                    {(notification.error || notification.success) && (
                        <Notification
                            error={notification.error}
                            success={notification.success}
                        />
                    )}
                    <div>
                        <span>{user.name} logged in</span>
                        <button onClick={handleLogOut}>logout</button>
                    </div>
                    <CreateNewBlog
                        handleAddBlog={handleAddBlog}
                        handleSetNotification={handleSetNotification}
                    />
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </>
            ) : (
                <LoginForm
                    handleSetUser={handleSetUser}
                    handleSetNotification={handleSetNotification}
                    notification={notification}
                />
            )}
        </div>
    )
}

export default App
