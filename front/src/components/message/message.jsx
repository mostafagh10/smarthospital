import React from 'react';
import './message.css';
import {format} from 'timeago.js'

export default function Message({message,own}){
    return(
        <>
        <div className={own ? "message own" : "message"}>
            <div className="messagetop">
            
            <span className="messagetext">{message.text}</span>
        </div>
        <div className="messagebottom">
            {format(message.createdAt)}
        </div>


        </div>
        </>
    )
}