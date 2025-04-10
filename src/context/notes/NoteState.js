import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async() => {
    //API call
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkMTA5NzFlMDQ5MWE1ZDU1OGM4NjQzIn0sImlhdCI6MTc0MTgzNTc5OX0._VCpBYnXxX3aed7-rBTxojtukn_RHLL5Gpe7HrAKv0k"
        }
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      setNotes(json);
    } catch (error) {
      console.error(error.message);
    }
    console.log("Adding a new note");
  }

  // Add a note
  const addNote = async(title, description, tag) => {
    //API call
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkMTA5NzFlMDQ5MWE1ZDU1OGM4NjQzIn0sImlhdCI6MTc0MTgzNTc5OX0._VCpBYnXxX3aed7-rBTxojtukn_RHLL5Gpe7HrAKv0k"
        },
        body: JSON.stringify({title, description, tag})
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      // const json = await response.json();
      // console.log(json);
    } catch (error) {
      console.error(error.message);
    }
    console.log("Adding a new note");


    const note = {
      _id: "67eec198c29d86a0943c3cd2",
      user: "67d10971e0491a5d558c8643",
      title: title,
      description: description,
      tag: tag,
      date: new Date(),
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // delete a note
  const deleteNote = (id) => {
    //API call
    console.log("Deleting a note with id: " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkMTA5NzFlMDQ5MWE1ZDU1OGM4NjQzIn0sImlhdCI6MTc0MTgzNTc5OX0._VCpBYnXxX3aed7-rBTxojtukn_RHLL5Gpe7HrAKv0k"
        },
        body: JSON.stringify({title, description, tag})
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      // const json = await response.json();
      // console.log(json);
    } catch (error) {
      console.error(error.message);
    }
    // logic to edit in client
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
