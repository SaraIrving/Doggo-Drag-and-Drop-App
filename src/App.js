import React, { useEffect } from 'react';
import {useState} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from './components/List';
const dogNames = require('dog-names');


function App() {

  const [dogs, updateDogs] = useState(dogPics);

 const [state, setState] = useState([]);

 const dogPics = [{pic: 'https://images.dog.ceo/breeds/terrier-irish/n02093991_1282.jpg', id: 1}, {pic: 'https://images.dog.ceo/breeds/kuvasz/n02104029_2656.jpg', id: 2}, {pic: 'https://images.dog.ceo/breeds/havanese/00100trPORTRAIT_00100_BURST20191112123933390_COVER.jpg', id: 3}];

// useEffect(() => {
//   for (let i = 0; i < 3; i++) {
//     axios.get('https://dog.ceo/api/breeds/image/random')
//   .then(response => {
//     console.log('dog pic we got = ', response.data.message);
//     // dogPics.push({pic: response.data.message, id: i + 1});
//     setState(prev => [...prev, {pic: response.data.message, id: i + 1}])
//   })
//   .catch(err => console.log(err));
//   }
// }, [])


const onDragEnd = function(result) {

}

console.log('state = ', state);
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <h1>
  //         Most Handsome Doggo
  //       </h1>
  //     </header>
  //     <div className="listContainer">
  //       <h2>Drag and drop these puppers to put them in order of most boopable!</h2>
  //       <DragDropContext onDragEnd={onDragEnd}>
  //           <div className="listWrapper">
  //               <List state={state}/>
  //           </div>
  //       </DragDropContext>
  //     </div>
  //   </div>
  // );

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Most Handsome Doggo
        </h1>
      </header>
      <div className="listContainer">
        <h2>Drag and drop these puppers to put them in order of most boopable!</h2>
        <DragDropContext>
          <Droppable droppableId="doggos">
            {(provided) => (
              <ul className="dogs" {...provided.doppableProps} ref={provided.innerRef}>
              {dogPics.map(({id, pic}, index) => {
                let name = dogNames.maleRandom();

                return (
                  <Draggable key={id} draggableId={`#{id}`} index={index}>
                    {(provided) => (
                      <ol {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <div>
                          <img src={pic} alt="invisible doggo"/>
                        </div>
                        <p>
                          {name}
                        </p>
                      </ol>
                    )} 
                  </Draggable>
                );
                })}
                {provided.placeholder}
            </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
