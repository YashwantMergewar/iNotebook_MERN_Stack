import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{
    const s1 = {
        "name": "Yash",
        "year": "2nd yr",
        "branch": "CSE",
    }
    const [state, setState] = useState(s1);
    const update = () =>{
        setTimeout(() => {
            setState({
                "name": "Yashwant"      
            })
        }, 3000);
    }
    return(
        <NoteContext.Provider value = {{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;