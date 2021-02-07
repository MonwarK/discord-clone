import React from 'react'
import { useDispatch } from 'react-redux'
import {setChannelInfo} from "../../features/appSlice"
import "./sidebar-channel.styles.css"

function SidebarChannel({id, channelName}) {    

    const dispatch = useDispatch()

    return (
        <div className="sidebar-channel" onClick={() => {
            dispatch(setChannelInfo({
                channelId: id,
                channelName: channelName
            }))
        }}>
            <p># {channelName}</p>
        </div>
    )
}

export default SidebarChannel
