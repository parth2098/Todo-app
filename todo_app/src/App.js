import React, { useState, useEffect } from 'react';
import { Button, FormControl,InputLabel,Input, Snackbar} from '@material-ui/core';
import './App.css';
import ToDo from './ToDo';
import db from './firebase';
import firebase from 'firebase'
function App() {

  const [todos , setTodos] = useState([]);  //List Of Todes
  const [input,setInput] = useState(""); //Input Field

  //Run Once When prg loads
  //it will fatch data from database
  useEffect(() => {
    db.collection('todos').orderBy('timeStamp','desc').onSnapshot(snapshot => {
      console.log(snapshot.docs.map(doc => doc.data()));
      setTodos(snapshot.docs.map(doc => ({id : doc.id , todo : doc.data().todo})))
    })
  }, [])

  //When Click on Button it will execute
  //set previous todo list and adding new to do task from input
  const addTodo = (event) => {
    event.preventDefault(); // Wll Stop refreshing

    db.collection('todos').add({
      todo : input,
      timeStamp : firebase.firestore.FieldValue.serverTimestamp()
    })
    {
      //this code use for custum adding

    // setTodos([...todos,input]); 
    }
    setInput("");
  }

  return (
    <div className="App">
      <h1>Jai Swaminarayan</h1>

      <form>
        <FormControl>
          {/* <InputLabel > To do</InputLabel> */}
          <Input placeholder = "Add To Do Task" value = {input} onChange = {event => setInput(event.target.value)}/>
        </FormControl>
          
        {/* Submit Btn */}
        <Button disabled = {!input} type = "submit" onClick = {addTodo} variant="contained" color="primary">
          Add To do
        </Button>
        
        {/* <button type = "submit" onClick = {addTodo}>Add To do</button> */}
      </form>
      
      <ul>
        {
          //map through function todo
          todos.map(todo => (
            <ToDo todo = {todo}/>
          // <li>{todo}</li>
          ))
        }
      </ul>

    </div>
  );
}

export default App;
