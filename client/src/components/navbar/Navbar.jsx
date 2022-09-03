import './navbar.scss';
import React from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListIcon from '@mui/icons-material/List';




const Navbar = () => {
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder="Search" />
                    <SearchOutlinedIcon />
                </div>
                <div className="items">
                    <div className="item">
                        <LanguageOutlinedIcon className="icon" />
                            English
                    </div>
                    <div className="item">
                        <DarkModeOutlinedIcon className="icon"/>
                           
                    </div>
                    <div className="item">
                        <FullscreenExitOutlinedIcon className="icon"/>
                         
                    </div>
                    <div className="item">
                        <NotificationAddOutlinedIcon className="icon"/>
                        <span className="counter">3</span>
                            
                    </div>
                    <div className="item">
                        <ChatBubbleOutlineOutlinedIcon className="icon"/>
                        <span className="counter">2</span>
                            
                    </div>
                    <div className="item">
                        <ListIcon className="icon"/>
                           
                    </div>
                    <div className="item">
                       <img src="https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=600" alt="online" className="avatar" />
                    </div>
                
                </div>
            </div>
        </div>
    )
}

export default Navbar;