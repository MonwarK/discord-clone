import React from 'react'
import Sidebar from "../../components/sidebar/sidebar.component"
import CustomButton from "../../components/custom-button/custom-button.component"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import "./home.styles.css"
import { auth } from '../../firebase/firebase.utils'
import Chat from '../chat/chat.component'

function HomePage() {
    return (
        <div className="home-page bg-primary">
            <Sidebar />
            <Chat chatName="Chat 1"/>
        </div>
    )
}

export default HomePage
