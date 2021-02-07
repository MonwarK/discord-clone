import React, { useState } from 'react'
import SidebarChannel from "../sidebar-channel/sidebar-channel.component"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import "./sidebar.styles.css"
import { auth, db } from '../../firebase/firebase.utils';

function Sidebar() {

    const selector = useSelector(selectUser)
    console.log(selector)

    const [channels, setChannels] = useState([]); 

    useState(() => {
        db.collection("channels").onSnapshot((snapshot) => 
            setChannels(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    channel: doc.data()
                }))                
            )            
        )
    }, [])

    const addChannel = () => {
        const channelName = prompt("Enter a new channel name");

        if(channelName) {
            db.collection("channels").add({
                channelName: channelName
            })
        }
    }

    

    return (
        <div className="bg-tertiary sidebar">
            <div className="sidebar-heading">  
                <h3>Discord</h3> 
                <ExpandMoreIcon />
            </div>
            <div className="sidebar-body">
                <div className="sidebar-channels">
                    <div className="sidebar-channels-header">
                        <h4>Text Channels</h4>     
                        <AddIcon onClick={addChannel}/>                   
                    </div>

                    {channels.map(({id, channel}) => 
                        <SidebarChannel id={id} channelName={channel.channelName} />
                    )}
                </div>
            </div>

            <hr />

            <div className="sidebar-footer">
                <img src={selector.pfp} alt="Profile Avatar"/>

                <div className="user-info">
                    <p>{selector.name}</p>
                    <p>#{selector.uid.substring(0,6)}</p>
                </div>        

                <div className="user-controls">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon onClick={() => auth.signOut()}/>
                </div>                
            </div>
        </div>
    )
}

export default Sidebar
