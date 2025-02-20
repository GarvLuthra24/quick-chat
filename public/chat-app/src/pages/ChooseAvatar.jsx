import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loader from '../assets/loader.gif'
import { setAvatarRoute } from "../utils/backendAPI";

export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(-1);
  const toastCustom = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if(!localStorage.getItem('chat-app-user')){
      navigate('/login')
    }
    }, []);

  useEffect(() => {
    async function doIt(){
    const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`,{withCredentials:false}
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    doIt();
  }, []);



  const setProfilePicture = () => {
    async function setProfile(){
    // alert(selectedAvatar)
    if(selectedAvatar === -1){
      toast.error('Select an Avatar!', toastCustom)
    }else{
     
      const user =  JSON.parse(localStorage.getItem('chat-app-user'))
      // alert(user)
      const data = await axios.post(`${setAvatarRoute}` , {
        id: user._id,
        image: avatars[selectedAvatar]
      }, {withCredentials:false})

 
      // console.log(data)

      // alert('check now!')
      // alert(data)
      // console.log(data)
      // alert('check again')
      const nD = data.data
    

      if(nD.isSet){
        nD.havaAnAvatar = true;
        nD.avatarImage = nD.image
        nD.userName = user.userName
        nD.email = user.email
        nD._id = user._id
        // alert('hi')
        localStorage.setItem("chat-app-user" ,JSON.stringify(nD))
        // alert('hi')
        navigate("/")
      }

    
    }
  }
  setProfile();
  }


  return (
    <>
    {
      isLoading ? <Container>
        <img src={Loader} alt="loader" className="loader" ></img>
      </Container> : ""
    }


      {
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>
          
          <ToastContainer />
        </Container>
      }
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem ;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;