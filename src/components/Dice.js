import React from 'react'

export default function Dice(props) {
  const style = {
    backgroundColor: props.held ? '#59E391' : '',
  }

  const generateDots = () => {
    const dots = []
    for (let i = 0; i < props.value; i++) {
      dots.push(<div key={i} className={`dice--dots dots--${i + 1}`}></div>)
    }

    return dots
  }

  return (
    <div
      className={` dice dice--${props.value}`}
      onClick={() => props.heldDice(props.id)}
      style={style}
    >
      {generateDots()}
    </div>
  )
}
