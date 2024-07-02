import React, { Fragment, useContext, useState } from "react";
import { FaHome, FaMoneyBillWaveAlt, FaMoneyCheck, FaRegCommentDots, FaRegComments, FaStream, FaThLarge, FaUserLock, FaUsersCog } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";

import { Link } from 'react-router-dom'
import { context } from "../../context/context";

const UserMenuMobile = () => {

    const showMenu = useContext(context)

    const { show, setShow } = showMenu;

    const [sideBarToggle, setSideBarToggle] = useState({
        item1: false,
        item2: false,
        item3: false,
        item4: false,
        item5: false,
    })


    const clickedLink = () => {
        setShow(!show)
        setSideBarToggle({
            item1: false,
            item2: false,
            item3: false,
            item4: false,
            item5: false,
        })
    }

    return (
        <Fragment>
            <li>
                <Link to="/" className="cursor-pointer menu menu--active" onClick={clickedLink}>
                    <div className="menu__icon"> <FaHome size="20px" /> </div>
                    <div className="menu__title">
                        داشبورد
                    </div>
                </Link>
            </li>

            <li>
                <Link to="/package-list" className="cursor-pointer menu menu--active" onClick={clickedLink}>
                    <div className="menu__icon"> <FaThLarge size="20px" /> </div>
                    <div className="menu__title">
                        پکیج ها
                    </div>
                </Link>
            </li>


            <li>
                <Link to="/fis-list"a className="cursor-pointer menu menu--active" onClick={clickedLink}>
                    <div className="menu__icon"> <FaMoneyBillWaveAlt size="20px" /> </div>
                    <div className="menu__title">
                        فیس ها
                    </div>
                </Link>
            </li>


            <li className="menu__devider my-6"></li>


            <li>
                <Link to="/message-list" className="cursor-pointer menu menu--active" onClick={clickedLink}>
                    <div className="menu__icon"> <FaRegCommentDots size="20px" /> </div>
                    <div className="menu__title">
                        پیام ها
                    </div>
                </Link>
            </li>

            <li>
                <a className="cursor-pointer menu menu--active" onClick={() => setSideBarToggle({ ...sideBarToggle, item5: !sideBarToggle.item5 })}>
                    <div className="menu__icon"> <FaRegCommentDots size="20px" /> </div>
                    <div className="menu__title">
                        پروفایل
                    </div>
                </a>
                <ul className={sideBarToggle.item5 ? "menu__sub-open" : ""}>
                    <li>
                        <Link to="/profile">
                            <p className="menu">
                                <div className="menu__icon"> <FaUsersCog /> </div>
                                <div onClick={clickedLink} className="menu__title"> نمایش اطلاعات </div>
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/change-password">
                            <p className="menu">
                                <div className="menu__icon"> <FaUserLock /> </div>
                                <div onClick={clickedLink} className="menu__title"> تغییر رمز عبور</div>
                            </p>
                        </Link>
                    </li>
                </ul>
            </li>

        </Fragment>
    )
}

export default UserMenuMobile