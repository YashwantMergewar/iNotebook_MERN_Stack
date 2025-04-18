import React, {useContext} from 'react'
import NoteContext from '../context/notes/noteContext'
import alertContext from '../context/alert/alertContext'
const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const {showAlert} = useContext(alertContext);
  const {deleteNote} = context;  
  const {note, updateNote} = props;
  return (
    <div className="col-md-3">
    <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-trash mx-1" onClick={() => {deleteNote(note._id); showAlert("Note Deleted Successfully","success");}}></i>
          <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}></i>
        </div>
    </div>
    </div>
  )
}

export default NoteItem
