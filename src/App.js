import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import './App.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from './components/Button';
const dogNames = require('dog-names');


function App() {

  // HARD CODED DATA FOR KEEPERS ARRAY IF NEEDED
  // const fixedDogPics = [{pic: 'https://images.dog.ceo/breeds/terrier-irish/n02093991_1282.jpg', id: 1, name: "bob", randomName: "bobo"}, {pic: 'https://images.dog.ceo/breeds/kuvasz/n02104029_2656.jpg', id: 2, name: "frank", randomName: "fofo"}, {pic: 'https://images.dog.ceo/breeds/havanese/00100trPORTRAIT_00100_BURST20191112123933390_COVER.jpg', id: 3, name: "joe", randomName: "jojo"}];

  // HARD CODED DATA OF ONE DOG IF NEEDED
  // const starterDogPic = [{pic: 'https://images.dog.ceo/breeds/terrier-irish/n02093991_1282.jpg', id: 0, name: 'https://images.dog.ceo/breeds/terrier-irish/n02093991_1282.jpg', randomName: "bob"}]

  const [dogs, updateDogs] = useState({refreshDogs: 0, dogPics: [], fixedDogPics: []});


  const apiDogPics =[];
 
  function onButtonClick () {
    updateDogs(prev => {return {...prev, dogPics: []}})
    for (let i = 0; i < 3; i++) {
      axios.get('https://dog.ceo/api/breeds/image/random')
      .then(response => {
        let randomName = dogNames.maleRandom();
        updateDogs(prev => {return {...prev, dogPics: [...prev.dogPics, {pic:response.data.message, id: i + 1, name: response.data.message, randomName: randomName}]}})  
      })
      .catch(err => console.log(err));
    }  
  } 


  function handleOnDragEnd(result) {
    if(!result.destination) {
      return;
    }

    if (result.destination.droppableId === "doggos" && result.source.droppableId === "doggos") {
      const items = Array.from(dogs.dogPics);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      updateDogs(prev => {return {...prev, dogPics: items}})

    } else if (result.destination.droppableId === "keepers" && result.source.droppableId === "keepers") {
      const items = Array.from(dogs.fixedDogPics);
      const [reorderedItem] = items.splice(result.source.index, 1);
      console.log("IN KEEPERS = ", reorderedItem)
      items.splice(result.destination.index, 0, reorderedItem);
  
      updateDogs(prev => {return {...prev, fixedDogPics: items}})

    } else if (result.destination.droppableId !== result.source.droppableId) {
      console.log("you're switching LISTS!!")
      if (result.destination.droppableId === "keepers") {
        const items = Array.from(dogs.fixedDogPics);
        const [reorderedItem] = dogs.dogPics.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem)

        updateDogs(prev => {return {...prev, fixedDogPics: items}})
      }
    }
  }

  function deleteDog(provided) {
    //have the name of the dog we clicked on
    //use that to find the desired object in the fixed dogs array and delete it??

    const dogArray = Array.from(dogs.fixedDogPics)
    for (let i = 0; i < dogArray.length; i++) {
      if (dogArray[i].name === provided.dragHandleProps["data-rbd-drag-handle-draggable-id"]) {
        dogArray.splice(i, 1)
      }
    }

    updateDogs(prev => {return {...prev, fixedDogPics: dogArray}})
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Most Handsome Doggo
        </h1>
      </header>
      <div className="listContainer">
        <h2>Drag and drop these puppers to put them in order of most boopable!</h2>
        {/* <button onClick={event => onButtonClick()}>Show me dogs!</button> */}
        <Button onClick={event => onButtonClick()} text="Show me dogs!"></Button>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="dragDropContextWrapper">
              <div className="newDoggoWrapper">
                <h2 className="listTitle">New Doggos</h2>
                <Droppable droppableId="doggos">
                  {(provided) => (
                    <ul className="dogListWrapper" {...provided.doppableProps} ref={provided.innerRef}>
                      {dogs.dogPics.map(({id, pic, name, randomName}, index) => {

                      return (
                        <Draggable key={randomName + name} draggableId={name} index={index}>
                          {(provided) => (
                            <ol className="dogWrapper"{...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                              <div>
                                <img src={pic} alt="invisible doggo" className="dogPic"/>
                              </div>
                              <p>
                                This Good Boi's name is: <br></br><span>{randomName}</span>
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
              </div>
              <div className="keepersWrapper">
                <h2 className="listTitle">Keepers</h2>
                <Droppable droppableId="keepers">
                  {(provided) => (
                    <ul className="dogListWrapper" {...provided.doppableProps} ref={provided.innerRef}>
                      {dogs.fixedDogPics.map(({id, pic, name, randomName}, index) => {

                      return (
                        <Draggable key={randomName + name} draggableId={name} index={index}>
                          {(provided) => (
                            <ol className="dogWrapper"{...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                              <div>
                                <img src={pic} alt="invisible doggo" className="dogPic"/>
                              </div>
                              <p>
                                This Good Boi's name is: <br></br><span>{randomName}</span>
                              </p>
                              <Button onClick={event => deleteDog(provided)} text="Send him to the farm!"></Button>
                              {/* <button onClick={event => deleteDog(provided)}>Send him to the pound!</button> */}
                            </ol>
                          )} 
                        </Draggable>
                      );
                      })}
                      {provided.placeholder}
                  </ul>
                  )}
                </Droppable>
              </div>
            </div>
          </DragDropContext>
       
      </div>
    </div>
  );
}

export default App;
