import React, { useState } from 'react';
import './ToDo.css';
import { List, ListItem, ListItemAvatar, ListItemText, Button,Modal, makeStyles } from '@material-ui/core';
import db from './firebase';
import DeleteIcon from '@material-ui/icons/Delete' ;

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function ToDo(props) {
    const classes = useStyles();
    const [open,setOpen] = useState(false);
    const [input,setInput]=useState("");

    const handleOpen = () => {
        setOpen(true);
    }    

    const updateToDo = (event) => {
        event.preventDefault();
        db.collection('todos').doc(props.todo.id).set({
            todo : input
        },{merge : true});
        setOpen(false);
    }
    return (
        <>
            <Modal
                open = {open}
                onClose = {e => setOpen(false)}
            >
                <div className = {classes.paper}>
                    <h1>I am a Modal</h1>
                    <form>
                        
                        <input placeholder = {props.todo.todo} value={input} onChange = {event => setInput(event.target.value)} />
                        <Button  onClick = {updateToDo}>Update To do</Button>
                    </form>
                    
                </div>
            </Modal>
            <List className = "todo__List">
                <ListItem>
                <ListItemAvatar>
                </ListItemAvatar>
                    <ListItemText primary = {props.todo.todo} secondary = "Dummy DeadLine ⏰"></ListItemText>
                </ListItem>
                <button onClick = {e=>setOpen(true)}>Edit</button>
                <DeleteIcon onClick = {event => db.collection('todos').doc(props.todo.id).delete()}></DeleteIcon>
                
            {/* <Button onClick = {event => db.collection('todos').doc(props.todo.id).delete()}>❌</Button> */}
            </List>
        </>
    )
}

export default ToDo
