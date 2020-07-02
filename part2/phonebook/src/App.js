import React, { useState, useEffect } from 'react'
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import getPersons from "./services/getPersons";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [messageType, setMessageType] = useState('');


    useEffect(() => {
        getPersons
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, []);

    useEffect(() => {
        const results = persons.filter(person =>
            person.name.toLowerCase().includes(searchValue)
        );
        setSearchResults(results);
    }, [persons, searchValue]
    );

    const handleSearchValue = (e) => {
        setSearchValue(e.target.value);
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };
    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    };

    const handleDelete = (id, name) => {
        if (window.confirm(`Delete ${name} ?`)) {
            getPersons
                .deletePerson(id)
                .catch((error) => {
                    setMessageType('error');
                    setNotificationMessage(
                        `Information of ${name} has already been removed from the server`
                    );
                    setTimeout(() => {
                        setNotificationMessage(null);
                        setMessageType('');
                    }, 5000);
                });
            setPersons(persons.filter(p => p.id !== id))
        }
    };

    const addName = (e) => {
        e.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber
        };

        const personToUpdate = persons.find(p => p.name === newPerson.name);
        const updatedPerson = { ...personToUpdate, number: newNumber };

        persons.some(person => person.name === newPerson.name)
            ? (window.confirm(`${newPerson.name} is already added to the phone book, replace the old number with the new one?`))
            && getPersons
                .update(personToUpdate.id, updatedPerson)
                .then(returnedPerson =>
                    setPersons(persons.map(person =>
                        person.id !== personToUpdate.id ? person : returnedPerson)))
                .then(() => {
                    setMessageType('success');
                    setNotificationMessage(
                        `Updated ${updatedPerson.name}`
                    );
                    setTimeout(() => {
                        setMessageType('');
                        setNotificationMessage(null)
                    }, 5000);
                })
            : getPersons
                .create(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                })
                .then(() => {
                    setMessageType('success');
                    setNotificationMessage(
                        `Added ${newPerson.name}`
                    );
                    setTimeout(() => {
                        setMessageType('');
                        setNotificationMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setMessageType('error');
                    setNotificationMessage(
                        error.response.data.error
                    );
                    setTimeout(() => {
                        setMessageType('');
                        setNotificationMessage(null)
                    }, 5000);
                    console.log(error.response.data)
                });
        setNewName('');
        setNewNumber('');
    };

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={notificationMessage} messageType={messageType} />
            <Filter searchValue={searchValue}
                handleSearchValue={handleSearchValue} />
            <h2>Add a new</h2>
            <PersonForm handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                newName={newName}
                newNumber={newNumber}
                addName={addName} />
            <h2>Numbers</h2>
            <Persons searchResults={searchResults}
                handleDelete={handleDelete} />
        </div>
    )
};

export default App;
