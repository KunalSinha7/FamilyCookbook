import React, { Component } from 'react';
import './Logout.css'

const Logout=({logout, uid})=>{
  return(
    <button
      className={uid==0 ? 'hidden' : 'SignOut'}
      onClick={logout}>
      Log Out
    </button>
  )
}

export default Logout;