import React, {useEffect, useReducer} from 'react';
import './App.css';
import JoinBlock from "./components/JoinBlock";
import Chat from "./components/Chat";
import reducer from "./reducer";
import socket from "./socket";
import axios from 'axios'

const App = () => {
    const [state, dispatch] = useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null,
        users: [],
        messages: []
    })

    const onLogin = async (obj) => {
        dispatch({type: 'JOINED', payload: obj})
        socket.emit('ROOM:JOIN', obj)
        const {data} = await axios.get(`/rooms/${obj.roomId}`)
        console.log(data.messages)
        dispatch({type: 'SET_DATA', payload: {users: data.users, messages: data.messages}})
    }

    // const addMessage = (message) => {
    //     console.log(message)
    // }

    const setUsers = (users) => {
        dispatch({type: 'SET_USERS', payload: users})
    }

    const addMessage = (message) => {
        dispatch({type: 'SET_MESSAGE', payload: message})
    }

    useEffect(() => {
        socket.on('ROOM:SET_USERS', (users) => setUsers(users))
        socket.on('ROOM:NEW_MESSAGE', (message) => addMessage(message))
    }, [])

    return (
        <div className="App">
            {!state.joined ? <JoinBlock onLogin={onLogin}/> :
                <Chat {...state} addMessage={addMessage}/>}
        </div>
    );
}

export default App;
