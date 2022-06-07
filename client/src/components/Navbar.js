import React from 'react'
import './logo.png';
import {Link} from 'react-router-dom';
import first from './logo.png';
import './Navbar.css';
import {AiOutlineSearch} from 'react-icons/ai'

function Navbar(props) {


  return (
    <div>
      <div className='AllOfNavPart'>

        <div>
          <Link to='/'>
            <img className='logo linkdecorationnavbar' src={first} alt='not found'></img>
          </Link>
        </div>

        <div className='midofnavbar'>
          <form>
            <div className='iconandbar'>
              <AiOutlineSearch />
              <input className='searchStyle' name='search' placeholder='Search Post' value={props.search} onChange={props.onSearchChange}></input>            
            </div>
          </form>
        </div>

        <div className='sign-part'>

          <div className='sign-up'>
            <Link className='linkdecorationnavbar' to='/sign-up'>Sign Up</Link>
          </div>
            
          <div className='sign-in'>
            <Link className='linkdecorationnavbar' to='sign-in'> Sign in</Link> 
          </div>
            
        </div>
        
      </div>
    </div>
  )
}

export default Navbar