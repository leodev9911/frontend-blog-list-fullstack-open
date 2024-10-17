import { useState } from 'react'

export default function Blog({ blog, handleLikePost, user, deleteBlog }) {
    const [detailsVisibility, setDetailsVisibility] = useState(false)

    const toggleDetails = () => {
        setDetailsVisibility((prev) => !prev)
    }

    return (
        <li className="blog-card">
            <div>
                <span className="title">
                    {blog.title} {blog.author}
                </span>
                <button className="toggleButton" onClick={toggleDetails}>
                    {detailsVisibility ? 'hide' : 'view'}
                </button>
            </div>
            {detailsVisibility ? (
                <div className="blog-card-details">
                    <a
                        className="blog-url"
                        href={blog.url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {blog.url}
                    </a>
                    <p className="blog-likes">likes {blog.likes}</p>
                    <button
                        className="likeButton"
                        onClick={() => handleLikePost(blog.id, blog?.user?.id)}
                    >
                        like
                    </button>
                    <p>{blog?.user?.name}</p>
                    {user.username === blog?.user?.username && (
                        <button onClick={() => deleteBlog(blog.id)}>
                            remove
                        </button>
                    )}
                </div>
            ) : (
                <></>
            )}
        </li>
    )
}
