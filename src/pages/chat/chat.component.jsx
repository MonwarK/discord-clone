import React, { useEffect, useState } from 'react'
import "./chat.styles.css"
import Message from "../../components/message/message.component"

import NotificationsIcon from '@material-ui/icons/Notifications';
import RoomIcon from '@material-ui/icons/Room';
import PeopleIcon from '@material-ui/icons/People';
import InboxIcon from '@material-ui/icons/Inbox';
import HelpIcon from '@material-ui/icons/Help';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from '../../features/appSlice';
import { selectUser } from '../../features/userSlice';
import { db } from '../../firebase/firebase.utils';
import firebase from "firebase"


function Chat() {

    const user = useSelector(selectUser)
    const chatId = useSelector(selectChannelId)
    const chatName = useSelector(selectChannelName)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if(chatId){            
            db.collection("channels")
                .doc(chatId)
                .collection("messages")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => 
                    setMessages(snapshot.docs.map((doc) => doc.data()
                ))
            )
        }
    }, [chatId])

    const sendMessage = (e) => {        
        e.preventDefault();
        
        if(message){            
            db.collection("channels")
            .doc(chatId)
            .collection("messages")
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: message,
                user: user
            })

            setMessage("")
        }
    }

    return (
        <div className="chat">
            <div className="chat-header">
                <div className="chat-name">
                    # {chatName}
                </div>
                <div className="chat-settings">
                    <NotificationsIcon />
                    <RoomIcon />
                    <PeopleIcon />

                    <input type="text" placeholder="Search" />

                    <InboxIcon />
                    <HelpIcon />
                </div>
            </div>
            
            <hr />

            <div className="chat-messages">  
                {messages.map(message =>   
                    <Message message={message.message} timestamp={message.timestamp} user={message.user}/>
                )}           
            </div>

            <div className="chat-input">
                <AddCircleIcon />
                <form>
                    <input 
                        type="text" 
                        onChange={e => setMessage(e.target.value)} 
                        placeholder={`Message #${chatName?.toUpperCase()}`} 
                        disabled={!chatId}
                        value={message}
                    />
                    <button type="submit" onClick={sendMessage}>Send</button>
                </form>                    

                <div className="chat-input-icons">
                    <CardGiftcardIcon />
                    <GifIcon />
                    <EmojiEmotionsIcon />
                </div>

            </div>


        </div>
    )
}

export default Chat
