import React, { useState } from 'react'
import Axios from 'axios';
import './AddPost.css';

function AddPost() {

  const [userName,setUserName]=useState([]);
  const [subject,setSubject]=useState([]);
  const [imageUrl,setImageUrl]=useState([]);
  const [like,setLike]=useState('0');
  const [unlike,setUnlike]=useState('0');

  const addPostToDB=(event)=>{
    Axios.post('http://localhost:3001/addPostToDB',{userName: userName,subject: subject,imageUrl: imageUrl,like: like,unlike: unlike});
    event.preventDefault();
  }

  return (
    <div className='fullOfAddButton'>

      <div className='allOfAddButtonPart'>
        <form>

          <div className='commoninput'>
            Username
            <input className='styleinput'  type='text' onChange={(event)=>{setUserName(event.target.value)}} required ></input>
          </div>

          <div className='commoninput'>
            Subject
            <input className='styleinput' type='text' onChange={(event)=>{setSubject(event.target.value)}} required ></input>
          </div>

          <div className='commoninput'>
            ImageUrl
            <input className='styleinput' type='url'  onChange={(event)=>{setImageUrl(event.target.value)}} required ></input>
          </div>

          <div className='commoninput'>
            <input className='styleinputSubmit' type='submit' value='Submit' onClick={addPostToDB} ></input>
          </div>

        </form>
      </div>

    </div>
  )
}

export default AddPost;