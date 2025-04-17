import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
  const[credentials, setCredentials] = useState({name:"", email:"", password: "", confirm_password: ""})
      let navigate = useNavigate(); 
      const handleSubmit = async (e) => {
          e.preventDefault(); // Prevent the default form submission behavior means it prevent the reload while submitting the form
          try {
            const {name, email, password} = credentials; //destructuring the credentials object to get the values of name, email, password and cpassword]
              const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({name, email, password})
              });
              const json = await response.json();
              console.log(json);
              
              if(json.success){
                //save the auth token and redirect
                localStorage.setItem('token', json.authtoken);
                 navigate("/");
              } 
              // else{
              //   //show error
              //   alert("Invalid credentials")
              // }
            } catch (error) {
              console.error(error.message);
            }
      }
      const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
      }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="name" className="form-control" id="name" name="name" aria-describedby="name" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" aria-describedby="email" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={6} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="confirm_password" name="confirm_password" onChange={onChange} minLength={6} required/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup