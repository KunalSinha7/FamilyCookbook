import React, { Component } from 'react';
import'./Login.css'
import {auth,githubProvider, emailProvider} from'./base'

const Login=({authHandler})=>{
  const authenticate=(provider)=>{
    auth.signInWithPopup(provider)
  }
  return(
    <div>
      <button
        className='SignIn'
        onClick={()=>authenticate(githubProvider)}>
        Sign In With Github </button>
        <div className='filler'></div>
    </div>
  )
}


export default Login;