import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {BiPowerOff} from 'react-icons/bi'
import styled from 'styled-components'
import {ToastContainer , toast} from 'react-toastify'

const LogOut = () => { 
    const navigate = useNavigate();

    const triggerLogout = async () => {

        localStorage.clear();
        navigate('/login')
     

    }

  return (
    <>
    <div>
    <Button onClick={triggerLogout}>
    <BiPowerOff/>
    </Button>
    </div>

    </>
  )
}

const Button = styled.button`
    padding:0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    background-color: #d3372c;
    border: 1px solid transparent;
    margin: 0.5rem 2rem;

    svg{
         color:#ebe7ff;
         font-size: 1rem;

    }
`

export default LogOut
