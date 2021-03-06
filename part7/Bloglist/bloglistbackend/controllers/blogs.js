const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('comments')
        .populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body

        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)

        if (!body.title || !body.url) {
            return response
                .status(400)
                .json({
                    error: 'title or url missing'
                })
        }

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user._id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
    } catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const blog = await Blog.findById(request.params.id)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({
            error: 'missing or invalid token'
        })
    }
    try {
        if (blog.user.toString() === decodedToken.id.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            response.status(401).json({
                error: 'blog can only be deleted by its creator'
            })
        }
    } catch (error) {
        response.status(400).end()
        next(error)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.status(200).json(updatedBlog.toJSON())
        })
        .catch(error => next(error))
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
    const body = request.body

    if (!body.comment) {
        return response.status(400).json({ error: 'No comment added' })
    }

    try {
        const blog = await Blog.findById(request.params.id)
        if (!blog) {
            return response.status(400).json({ error: 'Blog you are commenting does not exist' })
        }
        const comment = new Comment({
            comment: body.comment,
            blog: blog._id
        })
        const savedComment = await comment.save()
        blog.comments = blog.comments.concat(savedComment._id)
        await blog.save()
        response.status(201).json(savedComment)
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter