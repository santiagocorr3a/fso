const Numbers = ({notesToShow}) => {
    return (
        <div>
            <h2>Numbers</h2>
            <div>
            {notesToShow.map(person =>
                <p key={person.name}>{person.name} {person.number}</p>
            )}
            </div>
        </div>
    );
}
export default Numbers;