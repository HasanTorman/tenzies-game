import './style.css'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import Dice from './components/Dice'

function App() {
  const [dice, setDice] = useState(allDice())
  const [tenzies, setTenzies] = useState(false)
  const [trackRoll, setTrackRoll] = useState([])
  const [rollCount, setRollCount] = useState(0)

  function randomValue() {
    return Math.ceil(Math.random() * 6)
  }

  function allDice() {
    const newArray = []
    for (let i = 0; i < 10; i++) {
      const dice = {
        id: i + 1,
        value: randomValue(),
        held: false,
      }
      newArray.push(dice)
    }
    return newArray
  }

  const diceElement = dice.map((caed) => {
    return <Dice key={caed.id} {...caed} heldDice={heldDice} />
  })

  function heldDice(id) {
    setDice((prevDice) =>
      prevDice.map((dice) => {
        return dice.id === id
          ? {
              ...dice,
              held: !dice.held,
            }
          : dice
      }),
    )
  }

  function rollDice() {
    if (!tenzies) {
      setRollCount((prevTrack) => prevTrack + 1)
      setDice((prevDice) =>
        prevDice.map((dice) => {
          return dice.held
            ? dice
            : {
                ...dice,
                value: randomValue(),
              }
        }),
      )
    } else {
      setDice(allDice())
      setRollCount(0)
      setTenzies(false)
    }
  }

  useEffect(() => {
    const firstNumber = dice[0].value
    const allHelddice = dice.filter((dice) => dice.held)
    const sameNumber = allHelddice.filter((dice) => dice.value === firstNumber)
    if (sameNumber.length === dice.length) {
      setTenzies(true)
    }
  }, [dice])

  
  useEffect(() => {
    if (tenzies) {
      setTrackRoll((prevRoundes) => [
        ...prevRoundes,
        {
          rollCount: rollCount,
          rollTime: 0,
        },
      ]);
    }
  }, [tenzies]);
  

  return (
    <div className="main">
      {tenzies && <Confetti />}
      <h2 className="main--title">Tenzies</h2>
      <p className="main--subtitle">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice--container">{diceElement}</div>
      <button className="roll--dice" onClick={rollDice}>
        {' '}
        {tenzies ? 'New Game' : 'Roll'}
      </button>
      <p className="num--rolls">
        Number of rolls : <span> {rollCount} </span>{' '}
      </p>
    </div>
  )
}

export default App
