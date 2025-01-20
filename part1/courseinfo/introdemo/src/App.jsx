import { useState } from 'react'

const Button = ({click, name}) => {
  return (
    <button onClick={click}> {name} </button>
  )
}
const StatisticLine = ({text, value}) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
    
  )
}
const Statistic = ({good, neutral, bad}) => {
  const all = () => {return good + neutral + bad}
  const average = () => {return (good -bad) / all()}
  const positive = () => {return good / all() * 100}

  if (all() !== 0){
    return (
    <div>
      <table>
        <StatisticLine text="Good" value = {good}/>
        <StatisticLine text="Neutral" value = {neutral}/>
        <StatisticLine text="Bad" value = {bad}/>
        <StatisticLine text="All" value = {all()}/>
        <StatisticLine text="Average" value = {average()}/>
        <StatisticLine text="Positive" value = {positive() + "%"}/>
      </table>
    </div>
  )}
  else {
    return (
      <p>No feedback given</p>
  )}
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickGood = () => {
    setGood(good + 1)
  }
  const clickNeutral = () => {
    setNeutral(neutral + 1)
  }
  const clickBad = () => {
    setBad(bad + 1)
  }
  
  return (
    <div>
      <h1>Give feedback!</h1>
      <div>
        <Button name="good" click={clickGood}/>
        <Button name="neutral" click={clickNeutral}/>
        <Button name="bad" click={clickBad}/>
      </div>
      <Statistic good={good} neutral={neutral} bad={bad}/>
    </div>
    
  )
}

export default App