import React, {useState} from "react";
import api from './../utils/api'

const Login = (props) => {
  const [user, setUser] = useState({ 
    username: 'Lambda School', 
    password: 'i<3Lambd4'
   } )

   function handleLoginFormChange (e){
     setUser({
       ...user,
       [e.target.name]: e.target.value
     })
     
   }

   function handleLoginFormSubmit(e){
    e.preventDefault();
    api().post('/api/login', user)
      .then(res=>{
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubblepage')
      })
      .catch(err=>{
        throw new Error(err.response)
      })

   }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit= {handleLoginFormSubmit}>
        <input 
          type ='text'
          name = 'username'
          value = {user.username}
          placeholder = 'UserName'
          onChange={handleLoginFormChange}
          />
        <input 
          type ='password'
          name = 'password'
          value = {user.password}
          placeholder = 'password'
          onChange={handleLoginFormChange}
        />
        <button>Submit</button>
      </form>
    </>
  );
};

export default Login;
