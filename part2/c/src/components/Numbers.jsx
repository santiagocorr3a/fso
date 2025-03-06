const Numbers = ({notesToShow, confirmDeletion}) => {
    return (
        <div>
            <h2>Numbers</h2>
            <div>
            {notesToShow.map(person =>
                <p key={person.id}>{person.name} {person.number}
                    <button onClick={() => confirmDeletion(person.id)}>Delete</button>
                </p>
                
            )}
            
            </div>
        </div>
    );
}
export default Numbers;