import React from 'react';

const Persons = ({searchResults, handleDelete}) => {
    return (
        <ul>
            {searchResults.map(person => <li key={person.name}>{person.name} {person.number} <button onClick={() => handleDelete(person.id, person.name)}>delete</button></li>)}
        </ul>
    );
};


export default Persons;
