import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { FaHome, FaMoneyBillWaveAlt, FaMoneyCheck, FaRegCommentDots, FaRegComments, FaThLarge, FaThList, FaUserLock, FaUsersCog, FaUserTie } from 'react-icons/fa';
import { FiActivity } from "react-icons/fi";

const UserSideBar = () => {

    const location = useLocation()

    const [sideBarToggle, setSideBarToggle] = useState({
        item1: false,
        item2: false,
        item3: false,
        item4: false,
        item5: false,
    })

    return (
        <ul>
            <li>
                <NavLink to="/"
                    className={["/"].includes(location.pathname) ? "side-menu side-menu--active" : "side-menu"}
                >
                    <div className="side-menu__icon"><FaHome size="22px" /></div>
                    <div className="side-menu__title cursor-pointer">
                        داشبورد
                        <div className="side-menu__sub-icon transform rotate-180"> <i data-feather="chevron-down"></i> </div>
                    </div>
                </NavLink>
            </li>


            <li className="mt-4">
                <NavLink to="/package-list"
                    className={["/package-list"].includes(location.pathname) ? "side-menu side-menu--active" : "side-menu"}
                >
                    <div className="side-menu__icon"><FaThLarge size="22px" /></div>
                    <div className="side-menu__title cursor-pointer">
                        پکیج ها
                        <div className="side-menu__sub-icon transform rotate-180"> <i data-feather="chevron-down"></i> </div>
                    </div>
                </NavLink>
            </li>


            <li className="mt-4">
                <NavLink to="/fis-list"
                    className={["/fis-list"].includes(location.pathname) ? "side-menu side-menu--active" : "side-menu"}
                >
                    <div className="side-menu__icon"><FaMoneyBillWaveAlt size="22px" /></div>
                    <div className="side-menu__title cursor-pointer">
                        فیس ها
                        <div className="side-menu__sub-icon transform rotate-180"> <i data-feather="chevron-down"></i> </div>
                    </div>
                </NavLink>

            </li>

            <li className="side-nav__devider my-6"></li>


            <li className="mt-4">
                <NavLink to="/message-list"
                    className={["/message-list"].includes(location.pathname) ? "side-menu side-menu--active" : "side-menu"}
                >
                    <div className="side-menu__icon"><FaRegCommentDots size="22px" /></div>
                    <div className="side-menu__title cursor-pointer">
                        پیام ها
                        <div className="side-menu__sub-icon transform rotate-180"> <i data-feather="chevron-down"></i> </div>
                    </div>
                </NavLink>
            </li>


            <li className="mt-4">
                <a
                    className={["/profile", "/change-password"].includes(location.pathname) ? "side-menu side-menu--active" : "side-menu"}
                    onClick={() => setSideBarToggle({ ...sideBarToggle, item5: !sideBarToggle.item5 })}
                >
                    <div className="side-menu__icon"><FaUserTie size="22px" /></div>
                    <div className="side-menu__title cursor-pointer">
                        پروفایل
                        <div className="side-menu__sub-icon transform rotate-180"> <i data-feather="chevron-down"></i> </div>
                    </div>
                </a>

                <ul className={`before ${sideBarToggle.item5 ? "after" : ""}`}>
                    <li>
                        <NavLink to="/profile"
                            className={({ isActive }) =>
                                isActive ? "side-menu side-menu--active" : "side-menu"
                            }
                        >
                            <div className="side-menu__icon"> <FaUsersCog size="30px" /> </div>
                            <div className="side-menu__title">نمایش اطلاعات </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/change-password"
                            className={({ isActive }) =>
                                isActive ? "side-menu side-menu--active" : "side-menu"
                            }
                        >
                            <div className="side-menu__icon"> <FaUserLock size="30px" /> </div>
                            <div className="side-menu__title">تغییر رمز عبور</div>
                        </NavLink>
                    </li>

                </ul>

            </li>
        </ul>
    )
}

export default UserSideBar