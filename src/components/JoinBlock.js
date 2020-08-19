import React, {useState} from "react";

const JoinBlock = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const onLoginClick = () => {
        setIsLoading(true)
    }
    return (
        <div className="join-block">
            <input type="text" placeholder="Your name" value={name}
                   onChange={(e) => {
                       setName(e.target.value)
                   }}/>
            <input type="text" placeholder="Room id" value={room}
                   onChange={(e) => {
                       setRoom(e.target.value)
                   }}/>
            <button className="btn btn-success" onClick={onLoginClick} disabled={isLoading}>
                {isLoading ? "Joining..." : "Join"}</button>
        </div>
    )
}

export default JoinBlock
