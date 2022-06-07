import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import './SignUp.css';

function SignUp() {

  const [email,setEmail]=useState([]);
  const [username,setUsername]=useState([]);
  const [password,setPassword]=useState([]);

  const addSignUpToDB=(event)=>{
    Axios.post('http://localhost:3001/addSignUpToDB',{email: email,username: username,password: password});
    event.preventDefault();
  }

  return (
    <div className='fullOfSignUp'>

      <div className='allOfSignUpPart'>
        <form>

          <div className='commoninput'>
            E-mail
            <input className='styleinput' type='email' onChange={(event)=>setEmail(event.target.value)} required ></input>
          </div>

          <div className='commoninput'>
            Username
            <input className='styleinput' type='text' onChange={(event)=>setUsername(event.target.value)} required ></input>
          </div>

          <div className='commoninput'>
            Password
            <input className='styleinput' type='password' onChange={(event)=>setPassword(event.target.value)} required ></input>
          </div>

          <div className='commoninput'>
            <input className='styleinputSubmit' type='submit' value='Submit' onClick={addSignUpToDB} ></input>
          </div>

        </form>
      </div>

    </div>
  )
}

export default SignUp
