import React from 'react';
import ListItem from './ListItem';

export default function List (props) {

  return (
    <div className="dogListWrapper">
        {props.state.map(doggObj => (
      <ListItem item={doggObj.pic} key={doggObj.id} />
    ))}

    </div>

  )
}
