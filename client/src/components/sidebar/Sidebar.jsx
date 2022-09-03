import './sidebar.scss';
import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import RequestQuoteRoundedIcon from '@mui/icons-material/RequestQuoteRounded';
import MoneyOffOutlinedIcon from '@mui/icons-material/MoneyOffOutlined';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LogoutIcon from '@mui/icons-material/Logout';



const Sidebar = () => {
    
    
    return (
        <div className="sidebar">
        
            <div className="top">
                <span className="logo">Kordin8</span>
            </div>
            <hr />
            
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                    <DashboardIcon  className="icon"/>
                        <span>Dashboard</span>
                    </li>
                    <li>
                        <PermIdentityRoundedIcon className='icon'/>
                        <span>Agents</span>
                    </li>
                    <li>
                        <GroupAddOutlinedIcon className='icon'/>
                        <span>Customers</span>
                    </li>
                    <li>
                        <AdminPanelSettingsIcon className='icon'/>
                        <span>Admins</span>
                    </li>
                    <p className="title">ORDERS AREA</p>
                    <li>
                        <RequestQuoteRoundedIcon className='icon' />
                        <span>Transactions</span>
                    </li>
                    <li>
                        <MoneyOffOutlinedIcon className='icon'/>
                        <span>Orders</span>
                    </li>
                    <li>
                        <LocalShippingIcon className='icon'/>
                        <span>Delivery</span>
                    </li>
                    <li>
                        <ControlPointIcon  className='icon'/>
                        <span>Status</span>
                    </li>
                    <p className="title">USEFUL LINKS</p>
                    <li>
                        <AccountCircleIcon  className='icon'/>
                        <span>Profile</span>
                    </li>
                    
                    <li>
                        <LogoutIcon  className='icon'/>
                        <span>LogOut</span>
                    </li>
                </ul>
            </div>
            
            <div className="bottom">
            <div className="ColorOption">color1</div>
            <div className="ColorOption">color2</div>
            <div className="ColorOption">color3</div>
            </div>
           
        
        
        </div>
               
    )   
}

export default Sidebar;