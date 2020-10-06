import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const SetBirthyear = ({setError}) => {
    const [name, setName] = useState(null)
    const [born, setBorn] = useState('')
    const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })
    const result = useQuery(ALL_AUTHORS)

    if ( result.loading ) {
        return <div>loading...</div>
    }

    const options = result.data.allAuthors.map(o => 
        ({ value: o.name, label: o.name })
    )

    const submit = (e) => {
        e.preventDefault()
        editAuthor({
            variables: { name, born }
        })
        setName(null)
        setBorn('')
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <Select
                defaultValue={name}
                onChange={(e) => setName(e.value)}
                options={options}
            />
            <br/>
            born
            <input 
                type="text"
                value={born}
                onChange={({ target }) => setBorn(Number(target.value))}
            />
            <br/>
            <button onClick={submit}>update author</button>
        </div>
    )
}

export default SetBirthyear
