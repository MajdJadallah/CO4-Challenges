import React from 'react'
import {useState}from 'react-dom'
import axios from 'axios'
import {useCookies}from 'react-cookie'
function Login() {
    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const [_,setCookies]=useCookies(['access_token'])

    const onSubmit=async (e)=>{
        e.preventDefault();
        const response = await axios.post('http://localhost:9000/login',{
            username,password
        })
        setCookies('access_token',response.data.token)
        window.localStorage.setItem('userID',response.data.adminId)
        console.log(response)
    }
  return (
    <div>
      <form onSubmit={onSubmit}>
            <h2>Login</h2>
            <div className="form-group">
                <label htmlFor="username">username: </label>
                <input
                type='text'
                id='username'
                value={username}
                onChange={e=> setUsername(e.target.value)}
                />
                <label htmlFor="password">password: </label>
                <input
                type='password'
                id='username'
                value={password}
                onChange={e => setPassword(e.target.value)}
                /> 
                <input 
                type='submit'
                value='Login'
                />
            </div>
        </form>
    </div>
  )
}

export default Login
