import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '../App.css';


function Profile() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const { username } = useParams(); 

  const removeLocalStorage=()=>{
    localStorage.removeItem('User');
    localStorage.removeItem('userID');
    removeCookie('access_token', { path: '/' });

    navigate('/login');
  }

  return (
    <div id='profile'>
      <h1 id='title'>Profile page</h1>
      <p id='welcome'>Hello, {username} </p>
      <button onClick={removeLocalStorage} id='submitButton'>Log Out</button>
    </div>
  )
}

export default Profile
//you get the name of the user from the local storage that come from register page this make a problem when user is go to the login direct 
//there is now name come from the local storage the solution I think is better you get the name of the user from the database 
//search on the email and get the document of it then you can use it without problem.