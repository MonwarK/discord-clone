import "./message.styles.css"
import React from 'react'

function Message({message, timestamp, user}) {

    return (
        <div className="message">
            <div className="profile">
                <img src={user.pfp} alt="" />
            </div>
            <div className="message-info">
                <h4>{user.name}
                    <span className="message-timestamp">
                        {new Date(timestamp?.toDate()).toUTCString()}
                    </span>
                    </h4>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Message
