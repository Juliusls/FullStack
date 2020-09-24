import blogService from '../services/blogs'

const sort = state => state.sort((a, b) => b.likes - a.likes)

const blogReducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT_BLOGS':
        return sort(action.data)
    case 'ADD_LIKE':
        return sort(state.map(blog => blog.id !== action.data.id ? blog : action.data))
    case 'REMOVE_BLOG':
        return state.filter(blog => blog.id !== action.data)
    default:
        return state
    }
}

export const createBlog = (newBlog) => {
    return async dispatch => {
        const response = blogService.create(newBlog)
        dispatch ({
            type: 'CREATE_BLOG',
            data: response
        })
    }
}

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch ({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addLikeToBlog = (blog, token) => {
    return async dispatch => {
        await blogService.setToken(token)
        const changedBlog = { ...blog[0], likes: blog[0].likes + 1 }
        const likedBlog = await blogService.update(blog[0].id, changedBlog)
        dispatch({
            type: 'ADD_LIKE',
            data: likedBlog
        })
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: id
        })
    }
}

export default blogReducer