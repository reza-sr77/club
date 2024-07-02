import React, { Fragment, useContext } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { context } from '../../context/context';
import { BaseApi } from './../../services/config'

const Profile = () => {

    const navigate = useNavigate()

    const showManage = useContext(context)

    const { setNotif, profile, setProfile } = showManage;


    const showToggle = () => {
        setNotif(false)
        setProfile(!profile)
    }


    const userData = useSelector(state => state)

    const logOutUser = () => {
        localStorage.removeItem("jwtToken")
        localStorage.removeItem("tokenExp")
        localStorage.removeItem("role")
        navigate("/login")
    }

    return (
        <Fragment>
            <div className="intro-x dropdown w-8 h-8 dropDownBox ml-8">
                {userData ?
                    <Fragment>
                        <div className="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110" onClick={showToggle}>
                            {userData?.images ?
                                <img alt="userImage" src={userData?.images[0] ? `${BaseApi}${userData?.images[0]["720"]}` : "dist/images/profile-9.jpg"} />
                                : null}
                        </div>
                        <div className={profile ? "dropdown-menu w-56 show profileShow" : "dropdown-menu w-56"}>
                            <div className="dropdown-menu__content box bg-theme-11 dark:bg-dark-6 text-white">
                                <div className="p-4 border-b border-theme-12 dark:border-dark-3">
                                    <div className="font-medium">{userData?.name}</div>
                                    <div className="text-xs text-theme-13 mt-0.5 dark:text-gray-600">{userData?.mobile}</div>
                                </div>
                                <div className="p-2">
                                    <Link to="/profile">
                                        <p className="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"> <i data-feather="user" className="w-4 h-4 ml-2"></i> پروفایل </p>
                                    </Link>
                                    <Link to="/change-password">
                                        <p className="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"> <i data-feather="lock" className="w-4 h-4 ml-2"></i>تغییر رمزعبور</p>
                                    </Link>
                                </div>
                                <div onClick={logOutUser} style={{ cursor: "pointer" }} className="p-2 border-t border-theme-12 dark:border-dark-3">
                                    <p className="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"> <i data-feather="toggle-right" className="w-4 h-4 ml-2"></i>خروج</p>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                    : null}
            </div>

            {profile ?
                <div className='closeDropDown' onClick={() => setProfile(false)}>
                </div>
                : null}
        </Fragment>
    )
}
export default Profile