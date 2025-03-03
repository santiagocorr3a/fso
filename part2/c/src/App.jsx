import { useState, useEffect} from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Addcontact from './components/AddContact';
import Numbers from './components/Numbers';

const App = () => {
  const [persons, setPersons] = useState([
  ]);

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
      console.log(response.data)
    })
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
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }}
  
  const notesToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()) || person.number.includes(search))

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Filter</h3>
      <Filter search={search} handleSearch={handleSearch}/>
      <Addcontact newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addData={addData}/>
      <Numbers notesToShow={notesToShow}/>
    </div>
  )
}

export default App