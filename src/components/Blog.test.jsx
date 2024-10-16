import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, describe, test, vi } from 'vitest'
import Blog from './Blog'

describe('Blog component', () => {
    let container 

    const blog = {
        id: '123',
        title: 'Test blog',
        author: 'Leonardo',
        url: 'https://localhots:8080',
        user: {
            username: 'leo',
            id: '1234',
        },
        likes: 1,
    }

    const user = {
        username: 'leo'
    }

    const handleLikePost = vi.fn()

    beforeEach(() => {
        container = render(<Blog blog={blog} user={user} handleLikePost={handleLikePost} />).container
    })

    test('renders only the blog title and author', () => {    
        const span = container.querySelector('.title')
        expect(span).toHaveTextContent('Test blog Leonardo')
    })
    
    test('when clicking the toggle button the blog\'s url and the number of likes are shown', async () => {
        const user = userEvent.setup()
        const button = container.querySelector('.toggleButton')
        await user.click(button)
        
        const detailsContainer = container.querySelector('.blog-card-details')
        const likes = container.querySelector('.blog-likes')
        const url = container.querySelector('.blog-url')

        expect(detailsContainer).toBeInTheDocument()
        expect(likes).toBeInTheDocument()
        expect(url).toBeInTheDocument()
    })

    test('when clicking the like button twice the event handler that it receives is called twice', async () => {
        const user = userEvent.setup()
        const toggleButton = container.querySelector('.toggleButton')
        await user.click(toggleButton)

        const likeButton = container.querySelector('.likeButton')
        
        await user.click(likeButton)
        await user.click(likeButton)
        
        expect(handleLikePost.mock.calls).toHaveLength(2)
    })
})

