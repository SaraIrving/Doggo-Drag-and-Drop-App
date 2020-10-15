import React from 'react';
import Button from './Button';
import { Draggable } from "react-beautiful-dnd";
const dogNames = require('dog-names');


export default function ListItem (props) {
  console.log('props in List Item = ', props)

  let name = dogNames.maleRandom();

  //moved in from APP component 
  function deleteDog(provided) {
    //have the name of the dog we clicked on
    //use that to find the desired object in the fixed dogs array and delete it??

    const dogArray = Array.from(props.dogs.fixedDogPics)
    for (let i = 0; i < dogArray.length; i++) {
      if (dogArray[i].name === provided.dragHandleProps["data-rbd-drag-handle-draggable-id"]) {
        dogArray.splice(i, 1)
      }
    }

    props.updateDogs(prev => {return {...prev, fixedDogPics: dogArray}})
  }

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
          {props.type === "keepers" && <Button onClick={event => deleteDog(provided)} text="Send him to the farm!"></Button>}
          {/* <Button onClick={event => deleteDog(provided)} text="Send him to the farm!"></Button> */}
          {/* <button onClick={event => deleteDog(provided)}>Send him to the pound!</button> */}
        </ol>
      )} 
    </Draggable>

  )
}