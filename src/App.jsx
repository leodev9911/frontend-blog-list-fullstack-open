import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    const handleSetUser = (u) => {
        setUser(u)
    }

    const fetchBlogs = async () => {
        try {
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <div>
            {user ? (
                <>
                    <h2>blogs</h2>
                    <p>{user.name} logged in</p>
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </>
            ) : (
                <LoginForm handleSetUser={handleSetUser} />
            )}
        </div>
    )
}

export default App
