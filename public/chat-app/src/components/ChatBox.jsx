import React,{useState , useEffect, useRef } from 'react'
import styled from 'styled-components'
import LogOut from '../components/LogOut'
import ChatInput from './ChatInput'
import Message from './Messages'
import axios from 'axios'
import { sendMessageRoute } from '../utils/backendAPI'
import { getAllMessagesRoute } from '../utils/backendAPI'
import {v4 as uuidv4} from 'uuid'


const ChatBox = ({currentChat , currentUser, socket}) => {

  const [userName , setUserName] = useState(undefined)
  const [userAvatar , setUserAvatar] = useState(undefined)
  const [userId , setUserId] = useState(undefined)
  const [currUser , setCurrUser] = useState(undefined)
  const [messages , setMessages] = useState([])
  const [arrivalMsg , setArrivalMsg] = useState(null)
  const scrollRef = useRef();


  const sendMessage = async(message) => {
    console.log('sending the message via socket')
    socket.current.emit('send-message' , {
      to:currentChat._id,
      from: currentUser._id,
      message: message
    })
    const response = await axios.post(sendMessageRoute , {
      from:currUser , to: currentChat, message: message
    },{withCredentials:false})



    const msgs = [...messages];
    msgs.push({fromSelf:true, message: message})

    setMessages(msgs)

    return response;
  }


  useEffect(() => {
    if(socket.current){
      socket.current.on('msg-receive', (msg) => {
        console.log('receiving the socket message')
        setArrivalMsg({fromSelf: false , message: msg})
      })
    }
  }, [])

  useEffect(() => {
    arrivalMsg && setMessages((prev) => [...prev, arrivalMsg])
  }, [arrivalMsg])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behaviour:'smooth'})
  },[messages])

   


  useEffect(() => {
    
    async function getTheChats(){
      if(currentChat){
      const response = await axios.post(getAllMessagesRoute , {
        from: currentUser._id , to: currentChat._id
      },{withCredentials:false})

      setMessages(response.data)
      console.log(response.data)
    }
    }

    getTheChats()

  }, [currentChat])

  useEffect(() => {
    // alert('hi')
    console.log(currentChat)
    const vals = currentChat
    

    setUserName(vals.userName)
    setUserAvatar(vals.avatarImage)
    setUserId(vals._id)
    setCurrUser(currentUser)
  },[currentChat])
  
  return (
    <>
      <Container>
        <div className='header'>
          <div className='user-details'> 
            <div className='avatar'> 
            <img
            src={`data:image/svg+xml;base64,${userAvatar}`}
            alt="avatar"
            />
            </div>

            <div className='user-name'>
            
            <h2>{userName}</h2>
            
            </div>


            <LogOut/>
          </div>

          <div className='chat-messages'>
          {messages &&
            messages.map(({message , fromSelf} , index) => {
              return (
                <div ref={scrollRef} key={uuidv4}>
                <div className={`message ${fromSelf ? "sent" : "received"} `}>
                <div className='content'>
                {
                  message
                }
                </div>
                </div>
                </div>
              )
            })
          }
          </div>

       
          <ChatInput sendMessage={sendMessage}/>

        </div>


  
      
      
      </Container>  


    </>
  )
}

const Container = styled.div`


display: grid;
grid-template-rows: 10% 78% 12%;


.header{
  height: 2rem;
  max-height:2rem;
}

.user-details{
  display: flex;
  flex-direction: row;
  background-color: yellow;
  justify-content: space-around;
  align-items: center;
  border-radius: 0.4rem;
  color: white;
  
  
  background-color:#ffffff39;
  img{
    height: 3rem;
    margin: 0.5rem;
    margin-right: 1.5rem;
  }
}

.user-name{
  flex-grow: 1;
}

h1{
  color: white;
}

.chat-messages{
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  overflow:auto;
  height:67vh;
  &::-webkit-scrollbar{
    width:0.2rem;
    &-thumb{
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }

}

.message{
  

  display: flex;
  align-items:center;
  flex-direction: row;
  margin: 0.5rem 0rem;



  .content{
    max-width: 40%;
    height: 100%;
    padding: 0.8rem 0.5rem;
    overflow-wrap: break-word;
    border: 1px solid transparent;
    border-radius: 1rem;
    color: white;
  }
}

.sent{
  justify-content: flex-end;

  .content{
    background-color: #ae5191;
  }
}

.received{
  justify-content: flex-start;

  .content{
    background-color:#c33c44;
  }
}

`

export default ChatBox
