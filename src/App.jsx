import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import CreateNewBlog from './components/CreateNewBlogForm'
import Notification from './components/Notification'
import { Togglable } from './components/Togglable'
import loginService from './services/login'

const App = () => {
    const newNoteToggableRef = useRef()
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

    const handleLikePost = async (id, userId) => {
        try {
            const blogToEdit = blogs.findIndex((blog) => blog.id === id)
            const blogsCopy = [...blogs]

            const edittedBlog = {
                user: userId,
                likes: blogs[blogToEdit].likes + 1,
                author: blogs[blogToEdit].author,
                title: blogs[blogToEdit].title,
                url: blogs[blogToEdit].url,
            }

            const response = await blogService.addLike(id, edittedBlog)

            if (response) {
                blogsCopy[blogToEdit].likes += 1
                setBlogs(blogsCopy)
            }
        } catch (error) {
            handleSetNotification(
                'There was an error when trying to edit the note',
                'error'
            )
            console.log(error)
        }
    }

    const handleLogin = async (loginForm) => {
        const res = await loginService.login(loginForm)
        return res
    }

    const deleteBlog = async (id) => {
        try {
            const blogToEdit = blogs.find((blog) => blog.id === id)
            let blogsCopy = [...blogs]

            if (
                window.confirm(
                    `Remove blog ${blogToEdit.title} by ${blogToEdit.author}`
                )
            ) {
                await blogService.deleteBlog(id)

                blogsCopy = blogsCopy.filter((blog) => blog.id !== blogToEdit.id)
                setBlogs(blogsCopy)
            } else {
                return
            }
        } catch (error) {
            handleSetNotification(
                'There was an error when trying to delete the note',
                error
            )
            console.log(error)
        }
    }

    useEffect(() => {
        if (user) {
            blogService.setToken(user.token)
            fetchBlogs()
        }
    }, [user])

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

    console.log(user)

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
                    <Togglable buttonLabel="new note" ref={newNoteToggableRef}>
                        <CreateNewBlog
                            handleAddBlog={handleAddBlog}
                            handleSetNotification={handleSetNotification}
                            newNoteToggableRef={newNoteToggableRef}
                        />
                    </Togglable>
                    {blogs
                        .sort((a, b) => Number(b.likes) - Number(a.likes))
                        .map((blog) => (
                            <Blog
                                key={blog.id}
                                blog={blog}
                                handleLikePost={handleLikePost}
                                deleteBlog={deleteBlog}
                                user={user}
                            />
                        ))}
                </>
            ) : (
                <LoginForm
                    handleSetUser={handleSetUser}
                    handleSetNotification={handleSetNotification}
                    notification={notification}
                    handleLogin={handleLogin}
                />
            )}
        </div>
    )
}

export default App
