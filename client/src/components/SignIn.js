import React, { useState,useEffect } from 'react';
import Axios from 'axios';
import './SignIn.css';

function SignIn(props) {

  const [username,setUsername]=useState([]);
  const [password,setPassword]=useState([]);

  const [ınfos,setInfos]=useState([]);

  const [check,setCheck]=useState([]);

  useEffect(()=>{
    Axios.get('http://localhost:3001/allUsers').then((response)=>{
      setInfos(response.data);
    }).catch(()=>{
      console.log('ERR')
    });
  },[]);

  const loginToDB=(event)=>{
    setCheck('User Not Found')
    props.changeVisibility('false')
    for(let i of ınfos){
      if (i.username===username && i.password===password) {
        setCheck(`Welcome ${username}`)
        props.changeVisibility('true')
      }
    }
    
    event.preventDefault();
  }

  return (
    <div className='fullOfSignIn'>

      <div className='allOfSignInPart'>
        <form>

          <div className='commoninput'>
            Username
            <input className='styleinput' type='text' onChange={(event)=>{setUsername(event.target.value)}} required ></input>
          </div>

          <div className='commoninput'>
            Password
            <input className='styleinput' type='password' onChange={(event)=>{setPassword(event.target.value)}} required ></input>
          </div>

          <div className='commoninput'>
            <input className='styleinputSubmit' type='submit' value='Submit' onClick={loginToDB} ></input>
          </div>

          <div>{check}</div>

        </form>
      </div>

    </div>
  )
}

export default SignIn