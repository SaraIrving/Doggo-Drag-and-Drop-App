import React from 'react';
const dogNames = require('dog-names');

export default function ListItem (props) {

  let name = dogNames.maleRandom();

  return (
    <div className="dogWrapper">
      <img src={props.item} alt="Doggo" className="dogPic"></img>
      <p>This Good Boi's name is : {name}</p>
    </div>
  )
}