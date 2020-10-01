import React from 'react';
import { Draggable } from "react-beautiful-dnd";
const dogNames = require('dog-names');

export default function ListItem (props) {

  let name = dogNames.maleRandom();

  return (
    <Draggable draggableId ={props.id} index={props.index} >
      {(provided) => (
         <div className="dogWrapper" ref={provided.innerRef}
         {...provided.draggableProps}
         {...provided.dragHandleProps}>
          <img src={props.item} alt="Doggo" className="dogPic"></img>
          <p>This Good Boi's name is : {name}</p>
         </div>
      )}
    </Draggable>
  )
}