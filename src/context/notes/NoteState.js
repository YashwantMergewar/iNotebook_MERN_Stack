import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{
    const notesInitial = [
      {
        "_id": "67d442360076b6ff25bfef68",
        "user": "67d10971e0491a5d558c8643",
        "title": "My First Note",
        "description": "This is the first note of this MERN application",
        "tag": "personal",
        "date": "2025-03-14T14:50:30.961Z",
        "__v": 0
      },
      {
        "_id": "67d4424f0076b6ff25bfef6a",
        "user": "67d10971e0491a5d558c8643",
        "title": "My Second Note",
        "description": "This is the Second note of this MERN application",
        "tag": "personal",
        "date": "2025-03-14T14:50:55.768Z",
        "__v": 0
      },
      {
        "_id": "67eace7abd6cb0e4bf6c7389",
        "user": "67d10971e0491a5d558c8643",
        "title": "My Third Note",
        "description": "This is the Second note of this MERN application",
        "tag": "personal",
        "date": "2025-03-31T17:18:50.643Z",
        "__v": 0
      },
      {
        "_id": "67eec181c29d86a0943c3cd0",
        "user": "67d10971e0491a5d558c8643",
        "title": "My Fourth Note",
        "description": "This is the fourth note of this MERN application",
        "tag": "personal",
        "date": "2025-04-03T17:12:33.453Z",
        "__v": 0
      },
      {
        "_id": "67eec198c29d86a0943c3cd2",
        "user": "67d10971e0491a5d558c8643",
        "title": "My fifth Note",
        "description": "This is the fifth note of this MERN application",
        "tag": "personal",
        "date": "2025-04-03T17:12:56.701Z",
        "__v": 0
      }
    ]
    const [notes, setNotes] = useState(notesInitial);

    // Add a note

    const addNote = (title, description, tag)=>{
      //API call
      console.log("Adding a new note");
      
      const note = {
        "_id": "67eec198c29d86a0943c3cd2",
        "user": "67d10971e0491a5d558c8643",
        "title": title,
        "description": description,
        "tag": tag,
        "date": new Date(),
        "__v": 0
      };
      setNotes(notes.concat(note))
    }

    // delete a note

    const deleteNote = ()=>{}

    // edit a note
    const editNote = (id) =>{}
    return(
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;