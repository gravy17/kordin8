import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import './admin.scss'

function Admin() {
    return (
  
        <div className="admin">
            <Sidebar />
            <div className="adminContainer">
            <Navbar />
                <div className="adminContent">
                
                </div>
            </div>
     
        </div>
      
    
    )
}

export default Admin