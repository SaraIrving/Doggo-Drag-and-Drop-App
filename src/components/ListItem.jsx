import React from 'react';
import Button from './Button';
import { Draggable } from "react-beautiful-dnd";
const dogNames = require('dog-names');


export default function ListItem (props) {
  console.log('props in List Item = ', props)

  let name = dogNames.maleRandom();

  return (
    // <Draggable draggableId ={props.id} index={props.index} >
    //   {(provided) => (
    //      <div className="dogWrapper" ref={provided.innerRef}
    //      {...provided.draggableProps}
    //      {...provided.dragHandleProps}>
    //       <img src={props.item} alt="Doggo" className="dogPic"></img>
    //       <p>This Good Boi's name is : {name}</p>
    //      </div>
    //   )}
    // </Draggable>

    <Draggable key={props.randomName + props.name} draggableId={props.draggableId} index={props.index}>
      {(provided) => (
        <ol className="dogWrapper"{...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div>
            <img src={props.pic} alt="invisible doggo" className="dogPic"/>
          </div>
          <p>
            This Good Boi's name is: <br></br><span>{props.randomName}</span>
          </p>
          <Button onClick={props.onClick} text="Send him to the farm!"></Button>
          {/* <button onClick={event => deleteDog(provided)}>Send him to the pound!</button> */}
        </ol>
      )} 
    </Draggable>

  )
}