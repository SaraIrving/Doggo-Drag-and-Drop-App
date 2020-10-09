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
//console.log('state = ', state)

const fixedDogPics = [{pic: 'https://images.dog.ceo/breeds/terrier-irish/n02093991_1282.jpg', id: 1, name: "bob", randomName: "bobo"}, {pic: 'https://images.dog.ceo/breeds/kuvasz/n02104029_2656.jpg', id: 2, name: "frank", randomName: "fofo"}, {pic: 'https://images.dog.ceo/breeds/havanese/00100trPORTRAIT_00100_BURST20191112123933390_COVER.jpg', id: 3, name: "joe", randomName: "jojo"}];

const [dogs, updateDogs] = useState({refreshDogs: 0, dogPics: [{pic: 'https://images.dog.ceo/breeds/terrier-irish/n02093991_1282.jpg', id: 0, name: 'https://images.dog.ceo/breeds/terrier-irish/n02093991_1282.jpg', randomName: "bob"}], fixedDogPics: fixedDogPics});

//console.log("dogs at initialization = ", dogs);

 

 const apiDogPics =[];

// //THIS IS THE CONDITIONAL API CALL RELATING TO THE LENGTH OF THE PICS ARRAY IN STATE, IT DOES NOT REFRESH THE PICS EVER BUT DOES DISPLAY THEM
//  if (dogs.dogPics.length === 1) {
//   for (let i = 0; i < 3; i++) {
//         axios.get('https://dog.ceo/api/breeds/image/random')
//       .then(response => {
//         console.log('dog pic we got = ', response.data.message);
//         // dogPics.push({pic: response.data.message, id: i + 1});
//         //setState(prev => [...prev, {pic: response.data.message, id: i + 1}])
//         // apiDogPics.push({pic:response.data.message, id: i + 1, name: response.data.message})
//         let randomName = dogNames.maleRandom();
//         //updateDogs(prev => [...prev, {pic: response.data.message, id: i + 1, name: response.data.message, randomName: randomName}])
//         apiDogPics.push({pic:response.data.message, id: i + 1, name: response.data.message, randomName: randomName})
//       })
//       .catch(err => console.log(err));
//       }
//       updateDogs(prev => {return {...prev, dogPics: apiDogPics}})
//       console.log('apiDogPics at end of loop = ', apiDogPics)
//       // updateDogs(apiDogPics);
//  }


// // THIS IS THE USE EFFECT API CALL- DOES NOT WORK WELL
// useEffect(() => {
//   console.log("inside the useEffect")
//   const apiDogPics = [];
//   for (let i = 0; i < 3; i++) {
//     axios.get('https://dog.ceo/api/breeds/image/random')
//     .then(response => {
//       console.log('dog pic we got = ', response.data.message);
//       // dogPics.push({pic: response.data.message, id: i + 1});
//       //setState(prev => [...prev, {pic: response.data.message, id: i + 1}])
//       let randomName = dogNames.maleRandom();
//       apiDogPics.push({pic:response.data.message, id: i + 1, name: response.data.message, randomName: randomName})
      
//       //updateDogs(prev => [...prev, {pic: response.data.message, id: i + 1, name: response.data.message, randomName: randomName}])
//     })
//     .catch(err => console.log(err));
//   }
//   // updateDogs(prev => apiDogPics)
//   updateDogs(prev => {return {...prev, dogPics: apiDogPics}})
// }, [dogs.refreshDogs])

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

 
  function onButtonClick () {
    // let apiDogPics = [];
    updateDogs(prev => {return {...prev, dogPics: []}})
    for (let i = 0; i < 3; i++) {
          axios.get('https://dog.ceo/api/breeds/image/random')
        .then(response => {
          let randomName = dogNames.maleRandom();
          //apiDogPics.push({pic:response.data.message, id: i + 1, name: response.data.message, randomName: randomName})
          updateDogs(prev => {return {...prev, dogPics: [...prev.dogPics, {pic:response.data.message, id: i + 1, name: response.data.message, randomName: randomName}]}})  
        })
        .catch(err => console.log(err));
        }
        //console.log('IN FUNCTION pics array = ', dogs.dogPics)
        // updateDogs(prev => {return {...prev, dogPics: apiDogPics}})  
  }
  // console.log('pics array = ', apiDogPics)

  function handleOnDragEnd(result) {
    if(!result.destination) {
      return;
    }
    console.log('***result = ', result);
    // const items = Array.from(dogPics);

    if (result.destination.droppableId === "doggos" && result.source.droppableId === "doggos") {
      const items = Array.from(dogs.dogPics);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
  
      // console.log("calling updateDogs!")
      // console.log('items = ', items);
      //updateDogs(items);
      updateDogs(prev => {return {...prev, dogPics: items}})

    } else if (result.destination.droppableId === "keepers" && result.source.droppableId === "keepers") {
      const items = Array.from(dogs.fixedDogPics);
      const [reorderedItem] = items.splice(result.source.index, 1);
      console.log("IN KEEPERS = ", reorderedItem)
      items.splice(result.destination.index, 0, reorderedItem);
  
      // console.log("calling updateDogs!")
      // console.log('items = ', items);
      //updateDogs(items);
      updateDogs(prev => {return {...prev, fixedDogPics: items}})

    } else if (result.destination.droppableId !== result.source.droppableId) {
      console.log("you're switching LISTS!!")
      if (result.destination.droppableId === "keepers") {
        // console.log('items in SWITCH = ', Array.from(dogs.fixedDogPics));
        const items = Array.from(dogs.fixedDogPics);
        const [reorderedItem] = dogs.dogPics.splice(result.source.index, 1);
        // console.log('IN SWITCH reordered item = ', reorderedItem)
        items.splice(result.destination.index, 0, reorderedItem)
        // console.log('AFTER items in SWITCH = ', items)

        updateDogs(prev => {return {...prev, fixedDogPics: items}})

      }
      
    }
    // const items = Array.from(dogs.dogPics);
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);

    // // console.log("calling updateDogs!")
    // // console.log('items = ', items);
    // //updateDogs(items);
    // updateDogs(prev => {return {...prev, dogPics: items}})
  }

  function deleteDog(provided) {
    //have the name of the dog we clicked on
    //use that to find the desired object in the fixed dogs array and delete it??

    console.log('provided in DELETE = ', provided)
    console.log("delete this DOG!!")
    console.log("IN DELETE fixed dogs = ", dogs.fixedDogPics)

    const dogArray = Array.from(dogs.fixedDogPics)
    console.log('dogArray at start = ', dogArray)
    for (let i = 0; i < dogArray.length; i++) {
      console.log(dogArray[i].name)
      console.log(provided.dragHandleProps["data-rbd-drag-handle-draggable-id"])
      if (dogArray[i].name === provided.dragHandleProps["data-rbd-drag-handle-draggable-id"]) {
        dogArray.splice(i, 1)
        console.log('dogArray after removal', dogArray)
      }
    }

    updateDogs(prev => {return {...prev, fixedDogPics: dogArray}})

  }

  //console.log('dogs state before the return = ', dogs);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Most Handsome Doggo
        </h1>
      </header>
      <div className="listContainer">
        <h2>Drag and drop these puppers to put them in order of most boopable!</h2>
        {/* <button onClick={event => updateDogs(prev => {return {...prev, refreshDogs: prev.refreshDogs += 1}})}>Show me dogs!</button> */}
        <button onClick={event => onButtonClick()}>Show me dogs!</button>
       
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="dragDropContextWrapper">
            <Droppable droppableId="doggos">
              {(provided) => (
                <ul className="dogListWrapper" {...provided.doppableProps} ref={provided.innerRef}>
                  {console.log('api Droppable provided = ', provided)}
              
                  <p>New Doggos</p>
                  {dogs.dogPics.map(({id, pic, name, randomName}, index) => {

                  return (
                    <Draggable key={randomName + name} draggableId={name} index={index}>
                      {(provided) => (
                        <ol className="dogWrapper"{...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                          {console.log('api Draggable provided = ', provided)}

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
            <Droppable droppableId="keepers">
              {(provided) => (
                <ul className="dogListWrapper" {...provided.doppableProps} ref={provided.innerRef}>
                  {console.log('fixed Droppable provided = ', provided)}
                  <p>Keepers</p>
                  {dogs.fixedDogPics.map(({id, pic, name, randomName}, index) => {

                  return (
                    <Draggable key={randomName + name} draggableId={name} index={index}>
                      {(provided) => (
                        <ol className="dogWrapper"{...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                          {console.log('INDEX = ', index)}
                          {console.log('ID = ', id)}
                          {console.log('fixed Draggable provided = ', provided)}

                          <div>
                            <img src={pic} alt="invisible doggo" className="dogPic"/>
                          </div>
                          <p>
                            This Good Boi's name is: {randomName}
                          </p>
                          <button onClick={event => deleteDog(provided)}>Send him to the pound!</button>
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
          </DragDropContext>
       
      </div>
    </div>
  );
}

export default App;
