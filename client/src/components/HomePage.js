import React, { useState,useEffect } from 'react';
import Axios from 'axios';
import './HomePage.css';
import {Link} from 'react-router-dom';
import {FcLike,FcDislike} from 'react-icons/fc';

function HomePage(props) {

  const [ınfos,setInfos]=useState([]);
  const [trends,setTrends]=useState([]);
  const [subjects,setSubjects]=useState([]);

  const refreshPage=()=>{
    window.location.reload();
  }

  const deletePost=(id)=>{
    Axios.delete(`http://localhost:3001/delete/${id}`).then(()=>{
      setInfos(ınfos.filter((val)=>{
        return val._id != id;
      }))
    });
  }

  const updatePost=(id)=>{
    const newSubject=prompt('Enter new subject: ');

    Axios.put('http://localhost:3001/update',{newSubject: newSubject,id:id}).then(()=>{
      setInfos(ınfos.map((val)=>{
        return val._id==id ? {_id:id,userName:val.userName,subject:newSubject,imageUrl:val.imageUrl,like:val.like,unlike:val.unlike} : val;
      }))
    })
  }

  const likePost=(id,like)=>{
    const newLikeCount=Number(like+1);

    Axios.put('http://localhost:3001/updateLike',{id:id,newLikeCount: newLikeCount}).then(()=>{
      setInfos(ınfos.map((val)=>{
        return val._id==id ? {_id:id,userName:val.userName,subject:val.subject,imageUrl:val.imageUrl,like:newLikeCount,unlike: val.unlike} : val;
      }))
    })
  }

  const unlikePost=(id,unlike)=>{
    const newUnlikeCount=Number(unlike+1);

    Axios.put('http://localhost:3001/updateUnlike',{id:id,newUnlikeCount: newUnlikeCount}).then(()=>{
      setInfos(ınfos.map((val)=>{
        return val._id==id ? {_id:id,userName:val.userName,subject:val.subject,imageUrl:val.imageUrl,like:val.like,unlike: newUnlikeCount} : val;
      }))
    })
  }

  const showTrends=()=>{

    const emptyArray1=[];

    ınfos.map((ınfo)=>{
      emptyArray1.push(ınfo.like);
    })

    let i;

    let max=emptyArray1[0];

    for (i = 1; i < emptyArray1.length; i++) {
      if (emptyArray1[i] > max)
          max = emptyArray1[i];
  }

  const emptyObject=ınfos.filter((ınfo)=>ınfo.like==max);

  const emptyArray2=[];

  emptyObject.map((urun)=>{
    emptyArray2.push(urun.subject);
  })

  const subjects=emptyArray2.toString();

  setTrends(max);
  setSubjects(subjects);

}

  useEffect(()=>{
    Axios.get('http://localhost:3001/read').then((response)=>{
      setInfos(response.data);
    }).catch(()=>{
      console.log('ERR')
    });
  },[]);

  useEffect(()=>{
    showTrends();
  })

  return (
    <div>

      <div className='allOfHomePage'>

        <div className='belowNavbar'>
          <div className='addButton'>
            {props.checkbutton=='true' ? <Link className='linkdecorationaddbutton' to='addPost'>+</Link> : <div>Sign In For Adding Post</div>}
          </div>

          <div>
          {props.checkbutton=='true' ? <button className='linkdecorationlogoutbutton' onClick={()=>{refreshPage()}}>Log Out</button> : <div></div>}
          </div>

          <div className='trendPartBelowNav'>Most Popular</div>
          
        </div>

        <div className='TrendsandPostPart'>
   
          <div className='allOfPosts'>
            {ınfos.filter(ınfo=>ınfo.subject.toLowerCase().includes(props.search.toLowerCase())).map(ınfo=>(
              <div className='borderPost' key={ınfo._id}>
                <h1>{ınfo.userName}</h1>
                <img className='postImage' src={ınfo.imageUrl} alt='image not found'/>
                <h4 className='subjectparagraph'>{ınfo.subject}</h4>
                <button className='deleteupdatebuttons' onClick={()=>{updatePost(ınfo._id)}}>Update</button>
                <button className='deleteupdatebuttons' onClick={()=>{deletePost(ınfo._id)}}>Delete</button>
                <div className='likeunlikehearths'>
                  <FcLike /> <FcDislike />
                </div>
                <div>
                  <div className='likeunlikeborder'>
                    <button className='likebutton' onClick={()=>{likePost(ınfo._id,ınfo.like)}}>{ınfo.like}</button>
                    <button className='unlikebutton' onClick={()=>{unlikePost(ınfo._id,ınfo.unlike)}}>{ınfo.unlike}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='allOfTrends'>
              <div>{subjects}</div> <br></br>  <div>Like count: {trends}</div>
          </div>

        </div>
        </div>

    </div>
  )
}

export default HomePage;