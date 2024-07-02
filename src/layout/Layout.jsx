import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import MenuContext from '../context/menuContext'
import Header from './Header/Header'
import MenoMobile from './MenuMobile'
import SideBar from './SideBar'
import { getApi } from '../services/api/globalApi';
import { useEffect } from 'react';
import { setUser } from '../redux/action/actions';
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const Layout = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const getUserExpDate = () => {

        if (Math.floor(Date.now() / 1000) > localStorage.getItem("tokenExp")) {
            localStorage.removeItem("jwtToken")
            localStorage.removeItem("tokenExp")
            localStorage.removeItem("role")
            navigate('/#/login')
        }
    }


    const getUserData = async () => {
        try {
            const { data, status } = await getApi(
                {
                    path: "users/me"
                }
            )
            if (status === 200) {
                console.log(data.data)
                dispatch(setUser(data.data));
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserData()
        getUserExpDate()
    }, [])

    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [pathname])


    return (
        <body className="main">
            <MenuContext>
                <Header />
                <MenoMobile />
            </MenuContext>
            <div className="wrapper" style={{ marginTop: "100px" }}>
                <div className="wrapper-box">
                    <SideBar />
                    <div className="content">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 xxl:col-span-9">
                                <div className="grid grid-cols-1 gap-6">
                                    <Outlet />
                                    {/* {children} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}
export default Layout