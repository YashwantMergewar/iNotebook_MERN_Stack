import React, {useContext, useState} from 'react'
import NoteContext from '../context/notes/noteContext'
import alertContext from '../context/alert/alertContext'
const AddNote = () => {
    const context = useContext(NoteContext);
    const {showAlert} = useContext(alertContext);
    const {addNote} = context;
    const [note, setNote] = useState({title: "", description: "", tag: ""})
    const handleClick = (e)=>{
      e.preventDefault(); // Prevent the default form submission behavior means it prevent the reload while submitting the form
      addNote(note.title, note.description, note.tag);
      setNote({title: "", description: "", tag: ""})
      showAlert("Note Added Successfully", "success");
    }
    const onChange = (e) => {
      setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
      <h1>Add a Note</h1>
        <form className="my-3">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text" className="form-control" id="description" name ="description" value={note.description} onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="tag" name ="tag" value={note.tag} onChange={onChange} minLength={5} required/>
            </div>
            <button disabled = {note.title.length < 5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
        </div>
    </div>
  )
}

export default AddNote
