import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import ListItem from './ListItem';

export default function List (props) {
  console.log('props in LIST = ', props)

  return (
    <div>
      {props.droppableId === "keepers" && <Droppable droppableId={props.droppableId}>
        {(provided) => (
         <ul className="dogListWrapper" {...provided.droppableProps} ref={provided.innerRef}>
            {props.dogs.fixedDogPics.map(({id, pic, name, randomName}, index) => {

            return (

              <ListItem listItemType={props.listItemType} key={randomName + name} draggableId={name} index={index} randomName={randomName} pic={pic} id={id} dogs={props.dogs} updateDogs={props.updateDogs}></ListItem>
            
            );
            })}
            {provided.placeholder}
        </ul>
        )}
      </Droppable>}
      {props.droppableId === "doggos" && <Droppable droppableId={props.droppableId}>
        {(provided) => (
         <ul className="dogListWrapper" {...provided.droppableProps} ref={provided.innerRef}>
            {props.dogs.dogPics.map(({id, pic, name, randomName}, index) => {

            return (

              <ListItem listItemType={props.listItemType} key={randomName + name} draggableId={name} index={index} randomName={randomName} pic={pic} id={id} dogs={props.dogs} updateDogs={props.updateDogs}></ListItem>
            
            );
            })}
            {provided.placeholder}
        </ul>
        )}
      </Droppable>}
    </div>
  )
}
