import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import './App.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from './components/Button';
import ListItem from './components/ListItem';
import List from './components/List';
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


  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Most Handsome Doggo
        </h1>
      </header>
      <div className="listContainer">
        <h2>Drag and drop these puppers to put them in order of most boopable!</h2>
        <Button onClick={event => onButtonClick()} text="Show me dogs!"></Button>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="dragDropContextWrapper">
              <div className="newDoggoWrapper">
                <h2 className="listTitle">New Doggos</h2>
                <List dogs={dogs} updateDogs={updateDogs} droppableId="doggos" listItemType="doggos"></List>
              </div>
              <div className="keepersWrapper">
                <h2 className="listTitle">Keepers</h2>
                <List dogs={dogs} updateDogs={updateDogs} droppableId="keepers" listItemType="keepers"></List>
              </div>
            </div>
          </DragDropContext>
      </div>
    </div>
  );
}

export default App;
