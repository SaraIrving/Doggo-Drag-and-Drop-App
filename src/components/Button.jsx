import React from 'react';



export default function Button (props) {
  console.log('props in button = ', props)

  return (
  <button onClick={props.onClick}>{props.text}</button>

  )
  

} 