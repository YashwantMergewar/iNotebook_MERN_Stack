import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
// useNavigate is a hook that returns a function that lets you navigate to a different route programmatically. 
// It is used to redirect the user to a different page after login. 
const Login = () => {
    const[credentials, setCredentials] = useState({email:"", password: ""})
    let navigate = useNavigate(); 
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior means it prevent the reload while submitting the form
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({email: credentials.email, password: credentials.password})
            });
      
            const json = await response.json();
            console.log(json);
            
            if(json.success){
              //save the auth token and redirect
              localStorage.setItem('token', json.authtoken);
              //localStorage is used to store data in the browser and it is not cleared when the page is reloaded
              //and it is not provided by react, it is provided by the browser
               //redirect to the home page after login
               navigate("/");
            } 
            else{
              //show error
              alert("Invalid credentials")
            }
          } catch (error) {
            console.error(error.message);
          }
    }
    const onChange = (e) => {
      setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name="email" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login