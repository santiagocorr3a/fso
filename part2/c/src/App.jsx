import { useState, useEffect} from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Addcontact from './components/AddContact';
import Numbers from './components/Numbers';
import phoneService from './services/numbers';

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
    if (persons.some(person => person.name === newName) || persons.some(person => person.number === newNumber)){
      if (window.confirm('${person.name} is already added to the phonebook, replace the old number with a new one?')) {
        updateData(persons.find(person => person.name === newName).id, personObject)
      }
    } else {
      phoneService.create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
    })
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
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Filter</h3>
      <Filter search={search} handleSearch={handleSearch}/>
      <Addcontact newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addData={addData}/>
      <Numbers notesToShow={notesToShow} confirmDeletion={confirmDeletion}/>
    </div>
  )
}

export default App