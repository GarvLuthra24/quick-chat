import React,{useState, useEffect , useRef} from 'react';
import styled from 'styled-components';
import {useNavigate, Link} from 'react-router-dom'
import { getContactsRoute , setAvatarRoute, host } from '../utils/backendAPI';
import axios from 'axios'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatBox from '../components/ChatBox'
import {io} from 'socket.io-client'




const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  h1{
    color:white;
  }
  .container{
    height:85vh;
    width:85vw;
    background-color:#00000086;
    display:grid;
    grid-template-columns: 25% 75%
    
  }
`;

const ChatPage = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined)
  const [contacts , setContacts] = useState([])
  const [currentChat , setCurrentChat] = useState(undefined)

  useEffect(() => {
    async function userEffect(){
      if(!localStorage.getItem('chat-app-user')){
        navigate('/login')
      }else{
        const currentUser = await JSON.parse(localStorage.getItem('chat-app-user'))
        setUser(currentUser)
      }
    }

    userEffect();
  }, [])

  useEffect(() => {
    async function avatarImageSet(){
      if(user){
          
          const data= (await axios.post(getContactsRoute, {id:user._id})).data
          
          console.log(data)
          setContacts(data)
      
        
      }
    }

    avatarImageSet();
  }, [user])

  useEffect(() => {
   
    if(user){
      socket.current = io(host)
      socket.current.emit('add-user', user._id)

    }
  }
  , [user])


  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    console.log(user)
    
  }


  return (
    <>
      <Container>

         <div className='container'>
        
        <Contacts contacts={contacts} currentUser={user} chatChange={handleChatChange} />
        {
          !currentChat ? 
          <Welcome user={user} /> : <ChatBox currentChat={currentChat} currentUser={user} socket={socket} />
        }
        </div>
      </Container>

 
    </>
  );
};

export default ChatPage