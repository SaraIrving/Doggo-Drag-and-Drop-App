import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import ListItem from './ListItem';

export default function List (props) {

  return (
    <div>
      <Droppable droppableId={props.droppableId}>
        {(provided) => (
          <ul className="dogListWrapper" {...provided.doppableProps} ref={provided.innerRef}>
            {props.dogs.fixedDogPics.map(({id, pic, name, randomName}, index) => {

            return (

              <ListItem type={props.listItemType} key={randomName + name} draggableId={name} index={index} randomName={randomName} pic={pic} id={id} dogs={props.dogs} updateDogs={props.updateDogs}></ListItem>
            
            );
            })}
            {provided.placeholder}
        </ul>
        )}
      </Droppable>
    </div>
  )
}
