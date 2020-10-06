import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = () => {
    const result = useQuery(ALL_BOOKS)
    const [genres, setGenres] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        if (result.data) {
            setFilteredBooks(result.data.allBooks)
            result.data.allBooks.map(book => {
                book.genres.forEach(genre => {
                    if (!genres.includes(genre)) 
                        setGenres(genres.concat(genre))
                })
                return book;
            })
        }
    }, [result.data, genres])


    const filterBooks = filter => {
        setFilteredBooks(result.data.allBooks.filter(book => book.genres.includes(filter)))
    }

    const allBooks = () => {
        setFilteredBooks(result.data.allBooks)
    }

    if ( result.loading ) {
        return <div>loading...</div>
    }

    console.log(result.data)
   
    return (
        <div>
            <h2>books</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
              author
                        </th>
                        <th>
              published
                        </th>
                    </tr>
                    {filteredBooks.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {genres.map(genre => 
                <button
                    key={genre}
                    onClick={() => filterBooks(genre)} 
                >
                    {genre}
                </button>
            )}
            <button onClick={() => allBooks()}>all books</button>
        </div>
    )
}

export default Books