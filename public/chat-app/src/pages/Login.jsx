import React from 'react'
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import {useState,useEffect} from "react"
import Logo from '../'
import {ToastContainer , toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import {loginRoute} from "../utils/backendAPI"


const Login = () => {


    const [credentials , setCredentials] = useState({
        userName: "",
        password: ""
    }) 

    const toastCustom = {
        autoClose:5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    const navigate = useNavigate()

    const handleValidation = () => {
      
        const {userName , password} = credentials;

        // console.log(password)
        // console.log(confirmPassword)
        

        if(userName.length < 3){
            toast.error("UserName should be greater than 3 chars.", toastCustom)
            return false;
        }
        if(password.length < 3){
            toast.error("Password should not be less than 8 chars.")
            return false;
        }
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(handleValidation()){
            console.log(`Sending Request for User Login@ ${loginRoute}`)
            const {userName, password } = credentials;
            const {data} = await axios.post(loginRoute,{
                userName: userName,
                password: password
            }
            )
            // alert('hi')
            // console.log(data)
            // alert('check console')

            if(data.status == false){
                toast.error(`${data.message}` , toastCustom)
            }
            else if(data.status){
                localStorage.setItem('chat-app-user' , JSON.stringify(data.userExist)) 
                navigate('/')
            }
        }
    }



    const handleChange = (event) => {

        setCredentials({...credentials , [event.target.name] : event.target.value })
    }

    useEffect(() => {
      if(localStorage.getItem('chat-app-user')){
        navigate('/')
      }
    }, [])

  return (

    <>

    <FormContainer>
      <div>
        <form className='FormStyle' onSubmit={(event) => {handleSubmit(event)}}>
        <div className='Logo'>
            <img className='LogoImage' src = "{Logo}" alt = ""></img>
            <h1>Quick!</h1>
        </div>
     
        <h4>UserName:</h4>
        <input
        className='inputStyling'
        type = "text"
        placeholder='UserName'
        name="userName"
        onChange={(e) => {handleChange(e)}}
        ></input>
        
        <h4>Password:</h4>
        <input

        className='inputStyling'
        type = "password"
        placeholder='Password'
        name="password"
        onChange={(e) => {handleChange(e)}}
        ></input>
       

        <button className='inputStyling' type='Submit'>LogIn</button>
        <h4>
        New User? <Link to='/register'>Sign Up</Link>
        </h4>
        
        <span>

        </span>
        
        </form>
      </div>
    </FormContainer>
    <ToastContainer/>
   </>
  )
}

const FormContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;

    .Logo{
        display: flex;
        justify-content: center;

    }

    .FormStyle{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        background: #00000076;
        padding-left: 3rem;
        padding-right: 3rem;
        padding-top: 5rem;
        padding-bottom: 5rem;
        height: fit-content;
        border-radius: 1rem;
        min-height:60vh;
        justify-content: center;
        min-width: 50vw;

    }

    .LogoImage{
        height: 5rem
    }

    .inputStyling{
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top:0.5rem;
        padding-bottom:0.5rem;
        // border-radius: 1rem;
        background-color:
        margin-top:0.5rem;
        margin-bottom: 0.5rem;
        border-radius: 0.4rem;

    }
    h1{
        color: white;
        text-transform: uppercase;

    }
    h4{
        color: white;
    }

    button{
        background-color: #997af0;
        color: white;
        font-weight: bold;

   

        &:hover{
            background-color: #994ff0
        }
        

    }

    input{
        &:hover{
           border-color: red; 
        }
        &:active{
            border-color: red;
        }

    }


`

export default Login