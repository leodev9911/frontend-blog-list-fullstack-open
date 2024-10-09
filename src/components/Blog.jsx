import { useState } from 'react'

export default function Blog({ blog, handleLikePost, user, deleteBlog }) {
    const [detailsVisibility, setDetailsVisibility] = useState(false)

    const toggleDetails = () => {
        setDetailsVisibility((prev) => !prev)
    }

    return (
        <div className="blog-card">
            <p>
                {blog.title} {blog.author}
                <button onClick={toggleDetails}>
                    {detailsVisibility ? 'hide' : 'view'}
                </button>
            </p>
            {detailsVisibility ? (
                <>
                    <a href={blog.url} target='_blank' rel='noreferrer'>{blog.url}</a>
                    <p>
                        likes {blog.likes}{' '}
                        <button onClick={() => handleLikePost(blog.id, blog?.user?.id)}>
                            like
                        </button>
                    </p>
                    <p>{blog?.user?.name}</p>
                    {user.username === blog?.user?.username && <button onClick={() => deleteBlog(blog.id)}>remove</button>}
                </>
            ) : (
                <></>
            )}
        </div>
    )
}
