import React, { useEffect } from 'react';
import {useState} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from './components/List';
const dogNames = require('dog-names');


function App() {

const [state, setState] = useState(0);
console.log('state = ', state)
const [dogs, updateDogs] = useState([]);
console.log("dogs at initialization = ", dogs);

 const dogPics = [{pic: 'https://images.dog.ceo/breeds/terrier-irish/n02093991_1282.jpg', id: 1, name: "bob"}, {pic: 'https://images.dog.ceo/breeds/kuvasz/n02104029_2656.jpg', id: 2, name: "frank"}, {pic: 'https://images.dog.ceo/breeds/havanese/00100trPORTRAIT_00100_BURST20191112123933390_COVER.jpg', id: 3, name: "joe"}];

 const apiDogPics =[];

//  console.log('dogs = ', dogs)
//  if (dogs.length === 0) {
//   for (let i = 0; i < 3; i++) {
//         axios.get('https://dog.ceo/api/breeds/image/random')
//       .then(response => {
//         console.log('dog pic we got = ', response.data.message);
//         // dogPics.push({pic: response.data.message, id: i + 1});
//         //setState(prev => [...prev, {pic: response.data.message, id: i + 1}])
//         // apiDogPics.push({pic:response.data.message, id: i + 1, name: response.data.message})
//         let randomName = dogNames.maleRandom();
//         updateDogs(prev => [...prev, {pic: response.data.message, id: i + 1, name: response.data.message, randomName: randomName}])
//       })
//       .catch(err => console.log(err));
//       }

//       console.log('apiDogPics at end of loop = ', apiDogPics)
//       // updateDogs(apiDogPics);
//  }


// const apiDogPics = [];
useEffect(() => {
  console.log("inside the useEffect")
  const apiDogPics = [];
  for (let i = 0; i < 3; i++) {
    axios.get('https://dog.ceo/api/breeds/image/random')
  .then(response => {
    console.log('dog pic we got = ', response.data.message);
    // dogPics.push({pic: response.data.message, id: i + 1});
    //setState(prev => [...prev, {pic: response.data.message, id: i + 1}])
    let randomName = dogNames.maleRandom();
    apiDogPics.push({pic:response.data.message, id: i + 1, name: response.data.message, randomName: randomName})
    
    //updateDogs(prev => [...prev, {pic: response.data.message, id: i + 1, name: response.data.message, randomName: randomName}])
  })
  .catch(err => console.log(err));
  }
  updateDogs(prev => apiDogPics)
}, [state])

// console.log("apiDogPics = ", apiDogPics);


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

 

  function handleOnDragEnd(result) {
    if(!result.destination) {
      return;
    }
    console.log('result = ', result);
    // const items = Array.from(dogPics);
    const items = Array.from(dogs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    console.log("calling updateDogs!")
    console.log('items = ', items);
    updateDogs(items);
  }

  console.log('dogs state before the return = ', dogs);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Most Handsome Doggo
        </h1>
      </header>
      <div className="listContainer">
        <h2>Drag and drop these puppers to put them in order of most boopable!</h2>
        <button onClick={event => setState(prev => prev + 1)}>Show me dogs!</button>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="doggos">
            {(provided) => (
              <ul className="dogListWrapper" {...provided.doppableProps} ref={provided.innerRef}>
                {console.log('dogs in the return before the map = ', dogs)}
              {dogs.map(({id, pic, name, randomName}, index) => {
                // let randomName = dogNames.maleRandom();

                return (
                  <Draggable key={id} draggableId={name} index={index}>
                    {(provided) => (
                      <ol className="dogWrapper"{...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <div>
                          <img src={pic} alt="invisible doggo" className="dogPic"/>
                        </div>
                        <p>
                          This Good Boi's name is: {randomName}
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
