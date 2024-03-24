import React,{useState , useEffect} from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'
import { createPortal } from 'react-dom';
import {toast , ToastContainer} from 'react-toastify'

const ChatInput = ({sendMessage}) => {

    const [emojiPicker, setEmojiPicker] = useState(false)
    const [message , setMessage] = useState("")
    const toastCustom = {
        autoClose:5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    useEffect(() => {

    } , [message])


    const handleEmojiButtonClick = (event) => {
        setEmojiPicker(!emojiPicker);
    }
    const EmojiPickerPortal = ({ isOpen, onEmojiSelect }) => {
        if (!isOpen) return null;
      
        return (
          <div className="emoji-picker-wrapper">
            <Picker onEmojiClick={onEmojiSelect} theme="dark" />
          </div>
        );
      };

    const handleSelectEmoji = (emoji , event) => {
        let msg = message
        msg += emoji.emoji
        setMessage(msg)
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        if(message.length > 0){
            // alert(message)
            const response = await sendMessage(message);
            if(response.status){
                setMessage("")
            }else{
                console.log(response.message)
                toast.error(response.message, toastCustom)
            }
        }

    }
  return (
    <div>


    <Container>

    {
        emojiPicker && (
            <Picker className='emojiMenu'  onEmojiClick={handleSelectEmoji} theme='dark'/>
        )
    }
    

        <div className='emoji-button' onClick={handleEmojiButtonClick}>

            <BsEmojiSmileFill/>


        </div>

        <form className='input-container' onSubmit={(e) => handleSubmit(e)}>
    
        <input className='messageBox' type='text' placeholder='Enter Your Message Here' value={message} onChange={(event) => {
            setMessage(event.target.value)
        }}></input>
        <button  type='submit' ><IoMdSend/></button>
        
        </form>
    </Container>
   

        <ToastContainer></ToastContainer>
    </div>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap:1rem;
    background-color: #404046;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    height: 3rem;
    max-hegiht: 3rem;

   
    overflow:hidden;

    .section::-webkit-scrollbar {
        width: 16px;
      }
      
      .section::-webkit-scrollbar-track {
        background-color: #e4e4e4;
        border-radius: 100px;
      }
      
      .section::-webkit-scrollbar-thumb {
        background-color: #d4aa70;
        border-radius: 100px;
      }

    .emojiMenu{
        
        position: absolute;
        left: 30vw;
        bottom: 16vh;
        
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        z-index: 5;
    }
    

    .emoji-button{
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content: center;
        margin-left: 0.5rem;
        width:5%;
        
        svg{
            height: 3rem;
            width:2rem;
            background-color: transparent;
            color: orange;
            border: 1px solid transparent;
            border-radius: 1rem;
            
        }
    }





    .input-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width:95%;
        margin-right:0.5rem;
        background-color: transparent;
        gap:0.5rem;

        
        .messageBox{
          width: 100%;
          height: 2.5rem;
          border: 1px solid transparent;
          border-radius: 1rem;
          font-size:1.2rem;
          
          &:active{
            border: none;
          }
        }
        button{
            width:10%;
            height: 2.5rem;
            border-radius: 1rem;
            border: 1px solid transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color:#3dc278;
            .svg{
                font-size:1.5rem;
                
            }
        }

    }


`


export default ChatInput
