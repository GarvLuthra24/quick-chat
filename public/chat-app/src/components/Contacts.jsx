import React , {useState,useEffect} from 'react'
import styled from 'styled-components'



// contacts -> array or contacts 
// currentUser -> _id , email ,userName, haveAnAvatar , avatarImage


const Contacts = ({contacts , currentUser , chatChange}) => {

    const [currentUserName , setCurrentUserName] = useState(undefined)
    const [currentUserImage , setCurrentUserImage] = useState(undefined)
    const [currentSelected , setCurrentSelected] = useState(undefined)


    useEffect(() => {
        console.log(contacts)
        if(currentUser){
            setCurrentUserName(currentUser.userName)
            setCurrentUserImage(currentUser.avatarImage)
        }
    },[currentUser])


    const changeCurrentChat = (index , contact) => {
        setCurrentSelected(index);
        chatChange(contact);
    } 

  return (
    <>
      {
        currentUserName && currentUserImage ? 
        (
            <div>

                    <Container2>
                        <div className='contactElement currentUser'>
                        <div className={`contact}`}>
                            <img
                            src={`data:image/svg+xml;base64,${currentUserImage}`}
                            alt="avatar"
                            />
                            
                        </div>
                        <h2 className="contactName">{currentUserName}</h2>
                        </div>
                    </Container2>


                    
                    <Container>

                    

                    {
                      
                            contacts.map((user, index) => {
                                return (
                                    <div className={`contactElement ${currentSelected === index ? "selected" : ""}`} onClick={() => {
                                        changeCurrentChat(index , user)
                                    }}>
                                <div key={index} className={`contact `}>
                                    <img
                                    src={`data:image/svg+xml;base64,${user.avatarImage}`}
                                    alt="avatar"
                                    />
                                    
                                </div>
                                <h2 className="contactName">{user.userName}</h2>
                                </div>
                                );
                            })
                         
                          


                    }

                    
                    
                    
                    </Container>
            </div>
        ) : ""
        
      }

        

        
 
            
            </>
  )
}

const Container = styled.div`
    display:flex;
    flex-direction: column;
    overflow:auto;
    gap: 1rem;
    background-color:#09031c;
    
    max-height:100%;
    transition: 0.5 sec ease-in-out;
    
    .contactElement{
        background-color: #ffffff76;
        // opacity:0.97;
        height: 5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap:1rem;
        border: 0.5rem solid transparent;
        border-radius: 0.5rem;
        margin: 0rem 0.1rem;
        margin-top:0.5rem;
    }

    .selected{
        background-color:#404046;
        tranisition:0.5 sec ease-in;
    }


    img{
        height: 3.5rem;
        margin: 0.5rem;
    
    }

    h2{
        color: white;
    }

    .currentUser{
        background-color:#5562ea ;
        margin-bottom: 1.5rem;
        margin-top: 1.5rem;
    }

    .selected{
        
    }

    &::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
    
`


const Container2 = styled.div`
    display:flex;
    flex-direction: column;
    overflow:auto;
    gap: 1rem;
    overflow: hidden;
    background-color:#08031c;
    hei;
    transition: 0.5 sec ease-in-out;
    
    .contactElement{
        background-color: #ffffff76;
        // opacity:0.97;
        height: 5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap:1rem;
        border: 0.5rem solid transparent;
        border-radius: 0.5rem;
        margin: 0rem 0.1rem;
        margin-top:0.5rem;
    }

    .selected{
        background-color:#404046;
        tranisition:0.5 sec ease-in;
    }


    img{
        height: 3.5rem;
        margin: 0.5rem;
    
    }

    h2{
        color: white;
    }

    .currentUser{
        background-color:#5562ea ;
        margin-bottom: 1.5rem;
        margin-top: 1.5rem;
    }

    .selected{
        
    }

    &::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
    
`


export default Contacts
