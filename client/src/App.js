import {useState,useEffect} from 'react';
import axios from 'axios';

import './App.css';
function App() {
const [users,setUsers]=useState([]);
const [name,setName]=useState('');
const [gender,setGender]=useState('');
const [phone,setPhone]=useState('');
const [healthIssue,setHealth]=useState('');
const [avatar,setAvatar]=useState('');


useEffect(() => {
  axios.get('http://localhost:9000/users')
  .then(res => {
    setUsers(res.data)
  })
},[users])

const createUser=(e)=>{
  e.preventDefault();

  axios.post('http://localhost:9000/createUser',{
    name:name,
    gender: gender,
    phone: phone,
    healthIssue:healthIssue,
    avatar:avatar
  })
  .then(res => {
    setName('');
    setGender('');
    setPhone('');
    setHealth('');
    setAvatar('');
  })
}


  return (
    <div className="App">
    <h1>Medica App</h1>
    {/* <>
     {
      users.map(user =>{
        return(
          <div className="card" key={user.id}>
            <ul>
              <li>Name: {user.name}</li>
              <li>gender: {user.gender}</li>
              <li>phone: {user.phone}</li>
              <li>Health Issue: {user.health_issue}</li>
            </ul>
            <br></br>
          </div>
        )
      })}
    </> */}

    <form onSubmit={createUser}>
      <input
      placeholder='Username'
      value={name}
      type='text'
      required
      onChange={e=>setName(e.target.value)}
      />
      {/* <input
      placeholder='gender'
      value={gender}
      type='text'
      required
      onChange={e=>setGender(e.target.value)}
      />
      <input
      placeholder='phone'
      value={phone}
      type='number'
      required
      onChange={e=>setPhone(e.target.value)}
      />
      <input
      placeholder='health issue'
      value={healthIssue}
      type='text'
      required
      onChange={e=>setHealth(e.target.value)}
      />
      <input
      placeholder='avatar'
      value={avatar}
      type='text'
      required
      onChange={e=>setAvatar(e.target.value)}
      /> */}
      <input
      placeholder='Email'
      type='email'
      required
      />
      <input
      placeholder='Password'
      type='password'
      required
      />
      <input
      placeholder='Confirm Password'
      type='password'
      required
      />
      <input
      type='submit'
      value='create'
      />
    </form>
    </div>
  );
}

export default App;
