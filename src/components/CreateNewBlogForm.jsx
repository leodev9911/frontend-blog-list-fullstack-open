import { useState } from 'react'
import blogService from '../services/blogs'

export default function CreateNewBlog({ handleAddBlog, handleSetNotification, newNoteToggableRef }) {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: '',
    })

    const handleChange = (event) => {
        const { value, name } = event.target

        setNewBlog((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await blogService.create(newBlog)

            if (response) {
                setNewBlog({
                    title: '',
                    author: '',
                    url: '',
                })
                handleSetNotification(`a new blog ${response.title} added`, 'success')
                newNoteToggableRef.current.toggleVisibility()
                handleAddBlog(response)
            }
        } catch (error) {
            handleSetNotification('There was an error when trying to add a new note', 'error')
            console.log(error)
        }
    }

    return (
        <>
            <h1>create new</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={newBlog.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="author">Author</label>
                    <input
                        type="author"
                        id="author"
                        name="author"
                        onChange={handleChange}
                        value={newBlog.author}
                    />
                </div>
                <div>
                    <label htmlFor="url">Url</label>
                    <input
                        type="url"
                        id="url"
                        name="url"
                        onChange={handleChange}
                        value={newBlog.url}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    )
}
