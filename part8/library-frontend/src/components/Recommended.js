import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommended = () => {
    const user = useQuery(ME)
    const [allBooks, { data } ] = useLazyQuery(ALL_BOOKS, {
        fetchPolicy: 'network-only'
    })

    useEffect(() => {
        if (user.data) {
            allBooks({ variables: { genre: user.data.me.favoriteGenre }})
        }
    }, [user.data, allBooks])

    if ( user.loading ) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>Recommendations</h2>
            <p>books in your favorite genre <strong>{user.data.me.favoriteGenre}</strong></p>
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
                    {data && data.allBooks.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommended
