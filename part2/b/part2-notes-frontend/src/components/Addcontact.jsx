const Addcontact = ({newName, handleNameChange, newNumber, handleNumberChange, addData}) => {
    return (
        <div>
            <form>
                <div>
                name: <input value={newName} onChange={handleNameChange}/>
                </div>
            </form>
            <form>
                <div>
                number: <input value={newNumber} onChange={handleNumberChange}/>
                </div>
            </form>
            <div>
                <button type="submit" onClick={addData}>add</button>
            </div>
        </div>
    )
}
export default Addcontact;