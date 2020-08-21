import React, {useEffect, useRef, useState} from "react";
import socket from "../socket";

const Chat = ({userName, roomId, users, messages, addMessage}) => {
    const [textValue, setTextValue] = useState('')
    const messageRef = useRef(null)

    useEffect(() => {
        messageRef.current.scrollTo(0, 99999999)
    }, [messages])

    const onSendMessage = () => {
        if (textValue) {
            socket.emit('ROOM:NEW_MESSAGE', {
                roomId,
                userName,
                text: textValue
            })
            addMessage({userName, text: textValue})
            setTextValue('')
        }
    }

    const onKeyPress = event => {
        if (event.key === 'Enter') {
            onSendMessage()
            setTextValue('')
        }
    }

    return (
        <div className="chat">
            <div className="chat-users">
                <b>Online ({users.length}):</b>
                <ul>
                    {
                        users.map((user, index) => <li className={user.name ===
                        userName ? "user-i" : ""} key={index}>{user.name}</li>)
                    }
                </ul>
            </div>
            <div className="chat-messages">
                <b className="room-title">Room: {roomId}</b>
                <div className="messages" ref={messageRef}>
                    {
                        messages.map((message, index) => {
                            return <div className={"message" +
                            (message.userName === userName ? " my-message" : "")} key={index}>
                                <p>{message.text}</p>
                                <div>
                                    <span>{message.userName}</span>
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="form">
                    <textarea className="form-control"
                              value={textValue}
                              onChange={(e) => setTextValue(e.target.value !== '\n'
                                  ? e.target.value : '')}
                              onKeyPress={onKeyPress}
                    />
                    <button className="btn btn-primary" onClick={onSendMessage}>Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat
