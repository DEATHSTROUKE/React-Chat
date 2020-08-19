import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import JoinBlock from "./components/JoinBlock";
import Chat from "./components/Chat";

function App() {
    return (
        <div className="App">
            <JoinBlock />
            {/*<Chat />*/}
        </div>
    );
}

export default App;
