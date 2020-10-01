import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import ListItem from './ListItem';

export default function List (props) {

  return (
    <div className="dogListWrapper">
      <Droppable droppableId={props.item_id}>
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {props.state.map(doggObj => (
            <ListItem item={doggObj.pic} key={doggObj.id} />
            ))} 
          </div>
        )}
      </Droppable>
    </div>

  )
}
