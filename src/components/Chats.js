import React,{useRef,useState,useEffect} from "react";
import { ChatEngine } from "react-chat-engine";
import { useHistory } from "react-router-dom";
import { auth } from '../firebase';

import{useAuth} from '../contexts/AuthContext';

const Chats =() =>{

    const history = useHistory();
    const {user } = useAuth();
    const [loading ,setLoading] = useState(true);
    console.log(user);

    const handleLogout = async()=>{
        await auth.signOut();

         history.push('/');
    }

    const getFile = async (url) => { 
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type:'image/jpeg'})
    }

    useEffect(()=>{
        if(!user){
            history.push('/');
            return;
        }
        axios.get('https://api.chatengine.io/user/me',{
            Headers:{
                "project-id":"80a2f8ed-e786-4ce9-9bb1-ad2bc43ea1b3",
                "user-name" :user.email ,
                "user-secret":user.vid,
            }


         })
         .then(()=>{
            setLoading(false);
         })
         .catch(()=>{
            let formdata = new FormData();
            formdata.append('email',user.email);
            formdata.append('username',user.email);
            formdata.append('email',user.uid);
            getFile(user.photoURL) 
                .then((avatar)=>{
                    formdata.append('avatar',avatar,avatar.name)
                    axios.post('httpps//api.chatengine.io/users',
                    formdata,
                    {headers:{"private-key":"f8dbafd3-a76e-4850-aad3-bcabc3f74393"}})
                    .then(()=>setLoading(false))
                    .catch((error)=> console.log(error))
                })
         })

     },[user ,history]);
    if(!user ||loading) return 'Loading...please wait';
    return (
        <div className = "chats-page">
            <div className = "nav-bar">
                <div className = "logo-tab">
                Unichat
                </div>
                <div onClick={handleLogout} className ="logout-tab">
                    Logout
                </div>
                
            </div>
            <ChatEngine height = "calc(100vh-66px)" 
            projectID="80a2f8ed-e786-4ce9-9bb1-ad2bc43ea1b3"
              userName="."
              userSecret= "."
            />
        </div>
       
    );
}

export default Chats;