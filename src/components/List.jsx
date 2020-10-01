import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import ListItem from './ListItem';

export default function List (props) {

  return (
    <div className="dogListWrapper">
      <Droppable droppableId={id}>
        {props.state.map(doggObj => (
        <ListItem item={doggObj.pic} key={doggObj.id} />
        ))} 
      </Droppable>
    </div>

  )
}
