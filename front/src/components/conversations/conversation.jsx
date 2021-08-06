import React, { useEffect, useState } from 'react';
import './conversation.css'
import axios from 'axios'

export default function Conversation({conversation , currentuser}){
    const [user , setuser] = useState(null)
    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentuser._id)

        const getuser = async() => {
            try {
                const res = await axios.get("http://localhost:3500/user/doctor/get/"+friendId)
                console.log("conversations : ",res)
                setuser(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getuser();
    },[currentuser , conversation])
    return(
        <>
        <div className="conversation">
            <img className="conversationimg" src={user?.pictureUrl} />
            <span className="coversationname">{user?.name}</span>
        </div>
        </>
    )
}