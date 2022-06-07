  import './App.css';
import Navbar from './components/Navbar.js';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp.js';
import SignIn from './components/SignIn.js';
import AddPost from './components/AddPost';
import { useState } from 'react';

function App() {

  const [showbutton,setShowButton]=useState('false');
  const [search,setSearch]=useState('');

  const handleChange=event=>setSearch(event.target.value);


  return (
    <Router>
      <div className="App">
        <Navbar search={search} onSearchChange={handleChange}/>
        <Routes>
          <Route path='/' exact element={<HomePage search={search} checkbutton={showbutton}/>} />
          <Route path='/sign-up' element={<SignUp  />} />
          <Route path='/sign-in' element={<SignIn changeVisibility={showbutton=>setShowButton(showbutton)}/>} />
          <Route path='/addPost' element={<AddPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
