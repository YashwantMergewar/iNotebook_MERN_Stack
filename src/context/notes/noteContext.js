//Here we are using the context API to create a context for the notes
// we are using this to reduce the prop drilling and to make the code cleaner
// and we are using context API to hold state related to notes
import { createContext } from "react";
const noteContext = createContext();
export default noteContext;