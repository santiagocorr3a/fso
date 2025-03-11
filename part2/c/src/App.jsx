import { useState, useEffect} from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Addcontact from './components/AddContact';
import Numbers from './components/Numbers';
import phoneService from './services/numbers';
import Notification from './components/Notification';
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([
  ]);

  useEffect(() => {
    phoneService.getAll()
    .then(response => setPersons(response))
  }, [])

  const [newName, setNewName] = useState('Add new name')
  const [newNumber, setNewNumber] = useState('###-###-####')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [style, setStyle] = useState('')
  const green = {
    color: 'green',
    fontStyle: 'italic',
    border: 'solid 2px green',
    borderRadius: '5px',
  }
  const red = {
    color: 'red',
    fontStyle: 'italic',
    border: 'solid 2px red',
    borderRadius: '5px',
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearch = (event) => {
    setSearch(event.target.value)
    if (event.target.value === '') {
      setShowAll(true)
    }
    else {
      setShowAll(false)
    }
  } 

  const addData = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    phoneService.getAll()
    .then(response => setPersons(response))
    if (persons.some(person => person.name === newName) || persons.some(person => person.number === newNumber)){
      if (window.confirm(`${persons.name} is already added to the phonebook, replace the old number with a new one?`)) {
        updateData(persons.find(person => person.name === newName).id, personObject)
      }
    } else {
      phoneService.create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
    })
    setStyle(green)
      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }
      ,5000)
    }}
  
  const notesToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()) || person.number.includes(search))

  const confirmDeletion = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      phoneService.remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const updateData = (id, personObject) => {
    phoneService.update(id, personObject)
    .then(response => {setPersons(persons.map(person => person.id !== id ? person : response))
    })
    .catch(error => {
      setStyle(red)
      setMessage(`Information of ${personObject.name} has already been removed`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} style={style}/>
      <h3>Filter</h3>
      <Filter search={search} handleSearch={handleSearch}/>
      <Addcontact newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addData={addData}/>
      <Numbers notesToShow={notesToShow} confirmDeletion={confirmDeletion}/>
    </div>
  )
}

export default App