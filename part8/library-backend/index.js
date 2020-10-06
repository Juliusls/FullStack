const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const config = require('./utilities/config')

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }
    
    type Token {
        value: String!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int!
        id: ID!
    }  

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]
        allAuthors: [Author!]!
        me: User
    } 
    
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            born: Int!
        ): Author
        createUser(
            username: String!
            favoriteGenre: String!
          ): User
        login(
            username: String!
            password: String!
        ): Token
    }
    type Subscription {
        bookAdded: Book!
      }  
`

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            let books = await Book.find({})
            if (args.genre && args.author) {
                books = books.filter(book => book.genres.includes(args.genre))
                const author = await Author.findOne({ name: args.author })
                books = books.filter(book => {
                    return book.author.equals(author._id)
                })
            }
            else if (args.genre) {
                books = books.filter(book => book.genres.includes(args.genre))
            }
            else if (args.author) {
                const author = await Author.findOne({ name: args.author })
                books = books.filter(book => {
                    return book.author.equals(author._id)
                })
            }
            return books.map(async book => {
                return {
                    title: book.title,
                    published: book.published,
                    genres: book.genres,
                    author: await Author.findById(book.author),
                    id: book._id
                }
            })
        },
        allAuthors: async () => {
            const authors = await Author.find({}).populate('books')
            return authors.map( async a => {
                return {
                    name: a.name,
                    born: a.born,
                    id: a._id,
                    bookCount: await Book.find({ author: a.id }).countDocuments()
                }
            })
        },
        me: (root, args, context) => {
            return context.currentUser
        },
    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError('You must be logged in to add a book')
            }
            let author = await Author.findOne({ name: args.author })
            if (!author) {
                author = await new Author({ name: args.author })
                await author.save()
            }
            let book = new Book({ ...args, author })
            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            pubsub.publish('BOOK_ADDED', { bookAdded: book })

            return book 
        },
        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError('You must be logged in to edit an author')
            }
            let author = await Author.findOne({ name: args.name })
            if (!author) throw new AuthenticationError('Author not found')
            author.born = args.born
            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            return author
        },
        createUser: (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
        
            if ( !user || args.password !== 'julius' ) {
                throw new UserInputError('wrong credentials')
            }
        
            const userForToken = {
                username: user.username,
                id: user._id,
            }
        
            return { value: jwt.sign(userForToken, config.JWT_SECRET) }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), config.JWT_SECRET
            )
            const currentUser = await User.findOne({ username: decodedToken.username })
            return { currentUser }
        }
    },
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)

})