import React from "react";

const Chat = () => {
    return (
        <div className="chat">
            <div className="chat-users">
                <b>Online (1):</b>
                <ul>
                    <li>user1</li>
                    <li>user2</li>
                    <li>user3</li>
                </ul>
            </div>
            <div className="chat-messages">
                <b className="room-title">Room: 1</b>
                <div className="messages">
                    <div className="message">
                        <p>Lorem ipsum</p>
                        <div>
                            <span>user1</span>
                        </div>
                    </div>
                </div>
                <div className="form">
                    <textarea className="form-control" />
                    <button className="btn btn-primary">Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat
