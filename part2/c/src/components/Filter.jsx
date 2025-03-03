const Filter = ({search, handleSearch}) => {
    return (
        <input search={search} onChange={handleSearch}></input>
    );
}

export default Filter;