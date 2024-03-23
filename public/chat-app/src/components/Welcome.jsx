import React from 'react'
import styled from 'styled-components'
import WelcomeLogo from '../assets/welcome.gif'

const Welcome = ({ user }) => {

    
    return (
      <Component>
       <img src={WelcomeLogo} alt='Welcome Image'></img>
       <h1> Welcome, {user?.userName || "User"}! </h1>
       <h2> Click on a User to Start Messaging! </h2>
      </Component>
    );
  };


const Component = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    color: white;
    h2{
        color:white;
    }

    img{
        height: 20rem;
    }
`



export default Welcome
