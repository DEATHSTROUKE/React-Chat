import React, {useState} from "react";
import axios from "axios";

const JoinBlock = ({onLogin}) => {
    const [userName, setUserName] = useState('')
    const [roomId, setRoomId] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onLoginClick = async () => {
        if (!roomId || !userName) {
            return alert('Неверные данные!')
        }
        const obj = {
            roomId,
            userName
        }
        setIsLoading(true)
        const {data} = await axios.post('/rooms', obj)
        if (data.status == 'error') {
            setIsLoading(false)
            return alert('Пользователь с таким именем уже существует')
        } else {
            onLogin(obj)
        }
    }

    return (
        <div className="join-block">
            <input type="text" placeholder="Your name" value={userName}
                   onChange={(e) => {
                       setUserName(e.target.value)
                   }}/>
            <input type="text" placeholder="Room id" value={roomId}
                   onChange={(e) => {
                       setRoomId(e.target.value)
                   }}/>
            <button className="btn btn-success" onClick={onLoginClick} disabled={isLoading}>
                {isLoading ? "Joining..." : "Join"}</button>
        </div>
    )
}

export default JoinBlock
