import React from 'react'

import { useSelector } from 'react-redux';
import AdminSideBar from './AdminSideBar';
import UserSideBar from './UserSideBar';

//Icon Site
//https://react-icons.github.io/react-icons/icons?name=ai

const SideBar = () => {

    const isAdmin = useSelector(state => state.role)

    return (
        <nav className="side-nav">
            {isAdmin === "admin" ?
                <AdminSideBar />
                :
                <UserSideBar />
            }
        </nav>
    )
}


export default SideBar