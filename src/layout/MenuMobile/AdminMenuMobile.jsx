import React, { Fragment, useContext, useState } from "react";
import { AiOutlineUserAdd, AiOutlineUsergroupAdd, AiOutlineUserSwitch } from "react-icons/ai";
import { FaBox, FaBoxes, FaBoxOpen, FaHome, FaMoneyBillAlt, FaUserShield, FaMoneyBillWaveAlt, FaMoneyCheck, FaMoneyCheckAlt, FaProductHunt, FaRegComment, FaRegCommentDots, FaRegComments, FaStream, FaThLarge, FaUserLock, FaUsersCog, FaUserTag, FaWindowRestore, FaGlobe } from "react-icons/fa";


import { Link } from 'react-router-dom'
import { context } from "../../context/context";

const AdminMenuMobile = () => {

    const showMenu = useContext(context)

    const { show, setShow } = showMenu;

    const [sideBarToggle, setSideBarToggle] = useState({
        item1: false,
        item2: false,
        item3: false,
        item4: false,
        item5: false,
        item6: false,
        item7: false,
        item8: false,
    })


    const clickedLink = () => {
        setShow(!show)
        setSideBarToggle({
            item1: false,
            item2: false,
            item3: false,
            item4: false,
            item5: false,
            item6: false,
            item7: false,
            item8: false,
        })
    }

    return (
        <Fragment>
            <li>
                <Link to="/" onClick={clickedLink} className="cursor-pointer menu menu--active">
                    <div className="menu__icon"> <FaHome size="20px" /> </div>
                    <div className="menu__title">
                        داشبورد
                    </div>
                </Link>
            </li>
            <li>
                <Link to="/live" onClick={clickedLink} className="cursor-pointer menu menu--active">
                    <div className="menu__icon"> <FaGlobe size="20px" /> </div>
                    <div className="menu__title">
                        لایو
                    </div>
                </Link>
            </li>

            <li className="menu__devider my-6"></li>


            <li>
                <a className="cursor-pointer menu menu--active" onClick={() => setSideBarToggle({ ...sideBarToggle, item2: !sideBarToggle.item2 })}>
                    <div className="menu__icon"> <FaThLarge size="20px" /> </div>
                    <div className="menu__title">
                        مدیریت پکیج
                    </div>
                </a>
                <ul className={sideBarToggle.item2 ? "menu__sub-open" : ""}>
                    <li>
                        <Link to="/package-add">
                            <p className="menu">
                                <div className="menu__icon"> <FaStream /> </div>
                                <div onClick={clickedLink} className="menu__title"> ساخت پکیج </div>
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/package-list">
                            <p className="menu">
                                <div className="menu__icon"> <FaStream /> </div>
                                <div onClick={clickedLink} className="menu__title"> لیست پکیج </div>
                            </p>
                        </Link>
                    </li>
                </ul>
            </li>


            <li>
                <a className="cursor-pointer menu menu--active" onClick={() => setSideBarToggle({ ...sideBarToggle, item3: !sideBarToggle.item3 })}>
                    <div className="menu__icon"> <FaMoneyBillWaveAlt size="20px" /> </div>
                    <div className="menu__title">
                        مدیریت فیس
                    </div>
                </a>
                <ul className={sideBarToggle.item3 ? "menu__sub-open" : ""}>
                    <li>
                        <Link to="/fis-add">
                            <p className="menu">
                                <div className="menu__icon"> <FaMoneyCheckAlt /> </div>
                                <div onClick={clickedLink} className="menu__title"> ساخت فیس </div>
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/fis-list" >
                            <p className="menu">
                                <div className="menu__icon"> <FaMoneyCheck /> </div>
                                <div onClick={clickedLink} className="menu__title"> لیست فیس </div>
                            </p>
                        </Link>
                    </li>
                </ul>
            </li>


            <li className="menu__devider my-6"></li>


            <li>
                <a className="cursor-pointer menu menu--active" onClick={() => setSideBarToggle({ ...sideBarToggle, item4: !sideBarToggle.item4 })}>
                    <div className="menu__icon"> <AiOutlineUsergroupAdd size="20px" /> </div>
                    <div className="menu__title">
                        مدیریت مشتریان
                    </div>
                </a>
                <ul className={sideBarToggle.item4 ? "menu__sub-open" : ""}>
                    <li>
                        <Link to="/user-add">
                            <p className="menu">
                                <div className="menu__icon"> <AiOutlineUserAdd /> </div>
                                <div onClick={clickedLink} className="menu__title"> افزودن مشتری </div>
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/user-chnage-password" >
                            <p className="menu">
                                <div className="menu__icon"> <FaUserShield /> </div>
                                <div onClick={clickedLink} className="menu__title"> تغییر رمز عبور مشتری </div>
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/user-list" >
                            <p className="menu">
                                <div className="menu__icon"> <AiOutlineUserSwitch /> </div>
                                <div onClick={clickedLink} className="menu__title"> لیست مشتریان </div>
                            </p>
                        </Link>
                    </li>
                </ul>
            </li>


            <li>
                <a className="cursor-pointer menu menu--active" onClick={() => setSideBarToggle({ ...sideBarToggle, item5: !sideBarToggle.item5 })}>
                    <div className="menu__icon"> <FaBoxOpen size="20px" /> </div>
                    <div className="menu__title">
                        مدیریت انبار
                    </div>
                </a>
                <ul className={sideBarToggle.item5 ? "menu__sub-open" : ""}>
                    <li>
                        <Link to="/product-add">
                            <p className="menu">
                                <div className="menu__icon"> <FaBox /> </div>
                                <div onClick={clickedLink} className="menu__title"> افزودن کالا </div>
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/product-list">
                            <p className="menu">
                                <div className="menu__icon"> <FaBoxes /> </div>
                                <div onClick={clickedLink} className="menu__title"> لیست کالا ها </div>
                            </p>
                        </Link>
                    </li>
                </ul>
            </li>


            <li className="menu__devider my-6"></li>


            <li>
                <a className="cursor-pointer menu menu--active" onClick={() => setSideBarToggle({ ...sideBarToggle, item6: !sideBarToggle.item6 })}>
                    <div className="menu__icon"> <FaRegCommentDots size="20px" /> </div>
                    <div className="menu__title">
                        مدیریت پیام
                    </div>
                </a>
                <ul className={sideBarToggle.item6 ? "menu__sub-open" : ""}>
                    <li>
                        <Link to="/message">
                            <p className="menu">
                                <div className="menu__icon"> <FaRegComment /> </div>
                                <div onClick={clickedLink} className="menu__title"> ایجاد پیام </div>
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/message-list">
                            <p className="menu">
                                <div className="menu__icon"> <FaRegComments /> </div>
                                <div onClick={clickedLink} className="menu__title"> لیست پیام ها </div>
                            </p>
                        </Link>
                    </li>
                </ul>
            </li>

            <li>
                <a className="cursor-pointer menu menu--active" onClick={() => setSideBarToggle({ ...sideBarToggle, item7: !sideBarToggle.item7 })}>
                    <div className="menu__icon"> <FaWindowRestore size="20px" /> </div>
                    <div className="menu__title">
                        گزارشات
                    </div>
                </a>
                <ul className={sideBarToggle.item7 ? "menu__sub-open" : ""}>
                    <li>
                        <Link to="/reportages-user">
                            <p className="menu">
                                <div className="menu__icon"> <FaUserTag /> </div>
                                <div onClick={clickedLink} className="menu__title"> گزارشات کاربران</div>
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/reportages-product">
                            <p className="menu">
                                <div className="menu__icon"> <FaProductHunt /> </div>
                                <div onClick={clickedLink} className="menu__title"> گزارشات کالا ها </div>
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/reportages-fis">
                            <p className="menu">
                                <div className="menu__icon"> <FaMoneyBillAlt /> </div>
                                <div onClick={clickedLink} className="menu__title">  گزارشات فیس ها </div>
                            </p>
                        </Link>
                    </li>
                </ul>
            </li>


            <li>
                <a className="cursor-pointer menu menu--active" onClick={() => setSideBarToggle({ ...sideBarToggle, item8: !sideBarToggle.item8 })}>
                    <div className="menu__icon"> <FaRegCommentDots size="20px" /> </div>
                    <div className="menu__title">
                        پروفایل
                    </div>
                </a>
                <ul className={sideBarToggle.item8 ? "menu__sub-open" : ""}>
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

export default AdminMenuMobile