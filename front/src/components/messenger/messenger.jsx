import React, { useContext , useState , useEffect, useRef } from 'react';
import './messenger.css'
import Conversation from '../conversations/conversation';
import Message from '../message/message';
//import { AuthContext } from '../../context/AuthContext';
import Online from '../online/Online';
import axios from 'axios'
import {io} from 'socket.io-client'
import {  UserContext } from '../../ContextAPI/User'

export default function Messenger(){

    const [conversations , setconversations] = useState([])
    const [currentchat , setcurrentchat] = useState(null)
    const [messages , setmessages] = useState([])
    const [newmessage , setnewmessage] = useState("")
    //const [socket , setsocket] = useState(null)
    const socket = useRef(io("ws://localhost:8900"))
    const [arrivalmessage , setarrivalmessage] = useState(null)
    const [onlineusers , setonlineusers] = useState([])

    //const {user} = useContext(AuthContext)
    const { user } = useContext(UserContext)
    const x = JSON.stringify(user)
    const y = JSON.parse(x)
    console.log(user)
    //user = user?.patient
    if(!user){
        user = y;
    }

    const scrollRef = useRef(); 

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getmessage", data => {
            setarrivalmessage({
                sender : data.senderId,
                text: data.text,
                createdAt : Date.now(),
            })
        })
    },[])

    useEffect(() => {
        socket.current.emit("adduser",user._id);
        socket.current.on("getusers",users=>{
            console.log(users)
            setonlineusers(users)
        })
    },[user])

    useEffect(() => {
        arrivalmessage &&
        currentchat?.members.includes(arrivalmessage.sender) &&
        setmessages((prev) => [...prev,arrivalmessage])
    }, [arrivalmessage , currentchat])

    useEffect(() => {
        const getconversations = async () => {
            try {
                const res = await axios.get('http://localhost:3500/conversations/' + user._id)
                setconversations(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getconversations();
    }, [user._id])

    useEffect(() => {
        const getmessages = async () => {
            try {
                const res = await axios('http://localhost:3500/messages/' + currentchat?._id)
                setmessages(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getmessages();
    }, [currentchat])



    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour : 'smooth'});
    } , [messages])

    const handlesubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender : user._id,
            text: newmessage,
            conversationId : currentchat._id
        }

        const receiverId = currentchat.members.find(member => member !== user._id)

        socket.current.emit("sendmessage",{
            senderId : user._id,
            receiverId:receiverId,
            text:newmessage
        })

        try {
            const res = await axios.post('http://localhost:3500/messages', message)
            setmessages([...messages,res.data])
            setnewmessage("")
        } catch (err) {
            console.log(err)
        }
    }
    
    return(
        <>
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <h2 style={{fontFamily:'serif'}}>recent chats</h2>
                    {conversations.map((c) => (
                        <div onClick={()=> setcurrentchat(c)}>
                        <Conversation conversation={c} currentuser={user} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    { currentchat ?
                    <>
                    <div className="chatboxtop">
                    {messages.map((m) => (
                        <div ref={scrollRef}>
                        <Message message={m} own={m.sender === user._id} />
                        </div>
                    ))}
                    </div>
                    <div className="chatboxbottom">
                    <textarea className="chatmessageinput" placeholder="write someting ....." onChange={(e) => setnewmessage(e.target.value)} value={newmessage}></textarea>
                    <button className="chatbutton" onClick={handlesubmit}>send</button>
                </div>
                </>
                : (
                        <span className="noconversationtext">open a conversation to start chat ...</span>
                    )}
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                
                    <Online onlineusers={onlineusers} currentId={user._id} setcurrentchat={setcurrentchat} />
                </div>
            </div>
        </div>
        </>
    )
}