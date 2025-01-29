const Total = ({ course }) => {
    return (
        <div>
            <p>Total number of exercises {course.parts.reduce((sum, part) => sum + part.exercises, 0)}</p>
        </div>
    )
}

export default Total