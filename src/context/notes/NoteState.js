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
      setNotes(json);
    } catch (error) {
      console.error(error.message);
    }
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
      const note = await response.json();
      setNotes(notes.concat(note));
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }

    
  };

  // delete a note
  const deleteNote = async (id) => {
    //API call
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkMTA5NzFlMDQ5MWE1ZDU1OGM4NjQzIn0sImlhdCI6MTc0MTgzNTc5OX0._VCpBYnXxX3aed7-rBTxojtukn_RHLL5Gpe7HrAKv0k"
        }
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      
    } catch (error) {
      console.error(error.message);
    }
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
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkMTA5NzFlMDQ5MWE1ZDU1OGM4NjQzIn0sImlhdCI6MTc0MTgzNTc5OX0._VCpBYnXxX3aed7-rBTxojtukn_RHLL5Gpe7HrAKv0k"
        },
        body: JSON.stringify({title, description, tag})
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
    } catch (error) {
      console.error(error.message);
    }
    let newNotes = JSON.parse(JSON.stringify(notes));
    // logic to edit in client
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
      setNotes(newNotes);
    }
  }
    return (
      <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
        {props.children}
      </NoteContext.Provider>
    );
  }
export default NoteState;
