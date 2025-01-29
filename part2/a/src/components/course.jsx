import Header from './header'
import Content from './content'
import Total from './total'

const Course = ( {course} ) => {
    return (
        <div>
            <Header course = {course}/>
            <Content course = {course}/>
            <Total course = {course}/>
        </div>
    )
}

export default Course