import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { FaBox, FaBoxes, FaBoxOpen, FaHome, FaMoneyBillAlt, FaMoneyBillWaveAlt, FaMoneyCheck, FaMoneyCheckAlt, FaProductHunt, FaRegComment, FaRegCommentDots, FaRegComments, FaStream, FaThLarge, FaThList, FaUserLock, FaUsersCog, FaUserTag, FaUserTie, FaWindowRestore, FaUserShield, FaGlobe } from 'react-icons/fa';
import { AiOutlineUsergroupAdd, AiOutlineUserAdd, AiOutlineUserSwitch } from 'react-icons/ai'

const AdminSideBar = () => {

    const location = useLocation()

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

            <li>
                <NavLink to="/live"
                    className={["/live"].includes(location.pathname) ? "side-menu side-menu--active" : "side-menu"}
                >
                    <div className="side-menu__icon"><FaGlobe size="22px" /></div>
                    <div className="side-menu__title cursor-pointer">
                        لایو
                        <div className="side-menu__sub-icon transform rotate-180"> <i data-feather="chevron-down"></i> </div>
                    </div>
                </NavLink>
            </li>

            <li className="side-nav__devider my-6"></li>

            <li className="mt-4">
                <a
                    className={["/package-add", "/package-edit", "/package-list"].includes(location.pathname) ? "side-menu side-menu--active" : "side-menu"}
                    onClick={() => setSideBarToggle({ ...sideBarToggle, item2: !sideBarToggle.item2 })}
                >
                    <div className="side-menu__icon"><FaThLarge size="22px" /></div>
                    <div className="side-menu__title cursor-pointer">
                        مدیریت پکیج
                        <div className="side-menu__sub-icon transform rotate-180"> <i data-feather="chevron-down"></i> </div>
                    </div>
                </a>

                <ul className={`before ${sideBarToggle.item2 ? "after" : ""}`}>
                    <li>
                        <NavLink to="/package-add"
                            className={({ isActive }) =>
                                isActive ? "side-menu side-menu--active" : "side-menu"
                            }
                        >
                            <div className="side-menu__icon"> <FaStream size="30px" /> </div>
                            <div className="side-menu__title">ساخت پکیج </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/package-list"
                            className={({ isActive }) =>
                                isActive ? "side-menu side-menu--active" : "side-menu"
                            }
                        >
                            <div className="side-menu__icon"> <FaThList size="30px" /> </div>
                            <div className="side-menu__title"> لیست پکیج </div>
                        </NavLink>
                    </li>
                </ul>

            </li>


            <li className="mt-4">
                <a
                    className={["/fis-add", "/fis-edit", "/fis-list"].includes(location.pathname) ? "side-menu side-menu--active" : "side-menu"}
                    onClick={() => setSideBarToggle({ ...sideBarToggle, item3: !sideBarToggle.item3 })}
                >
                    <div className="side-menu__icon"><FaMoneyBillWaveAlt size="22px" /></div>
                    <div className="side-menu__title cursor-pointer">
                        مدیریت فیس
                        <div className="side-menu__sub-icon transform rotate-180"> <i data-feather="chevron-down"></i> </div>
                    </div>
                </a>

                <ul className={`before ${sideBarToggle.item3 ? "after" : ""}`}>
                    <li>
                        <NavLink to="/fis-add"
                            className={({ isActive }) =>
                                isActive ? "side-menu side-menu--active" : "side-menu"
                            }
                        >
                            <div className="side-menu__icon"> <FaMoneyCheckAlt size="30px" /> </div>
                            <div className="side-menu__title">ساخت فیس </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/fis-list"
                            className={({ isActive }) =>
                                isActive ? "side-menu side-menu--active" : "side-menu"
                            }
                        >
                            <div className="side-menu__icon"> <FaMoneyCheck size="30px" /> </div>
                            <div className="side-menu__title"> لیست فیس ها </div>
                        </NavLink>
                    </li>
                </ul>

            </li>

            <li className="side-nav__devider my-6"></li>

            <li className="mt-4">
                <a
                    className={["/user-add", "/user-list", "/user-edit", "/user-chnage-password"].includes(location.pathname) ? "side-menu side-menu--active" : "side-menu"}
                    onClick={() => setSideBarToggle({ ...sideBarToggle, item4: !sideBarToggle.item4 })}
                >
                    <div className="side-menu__icon"><AiOutlineUsergroupAdd size="22px" /></div>
                    <div className="side-menu__title cursor-pointer">
                        مدیریت مشتریان
                        <div className="side-menu__sub-icon transform rotate-180"> <i data-feather="chevron-down"></i> </div>
                    </div>
                </a>

                <ul className={`before ${sideBarToggle.item4 ? "after" : ""}`}>
                    <li>
                        <NavLink to="/user-add"
                            className={({ isActive }) =>
                                isActive ? "side-menu side-menu--active" : "side-menu"
                            }
                        >
                            <div className="side-menu__icon"> <AiOutlineUserAdd size="30px" /> </div>
                            <div className="side-menu__title">افزودن مشتری </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/user-chnage-password"
                            className={({ isActive }) =>
                                isActive ? "side-menu side-menu--active" : "side-menu"
                            }
                        >
                            <div className="side-menu__icon"> <FaUserShield size="30px" /> </div>
                            <div className="side-menu__title">تغییر رمز عبور مشتری </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/user-list"
                            className={({ isActive }) =>
                                isActive ? "side-menu side-menu--active" : "side-menu"
                            }
                        >
                            <div className="side-menu__icon"> <AiOutlineUserSwitch size="30px" /> </div>
                            <div className="side-menu__title"> لیست مشتریان </div>
                        </NavLink>
                    </li>
                </ul>

            </li>

            <li className="mt-4">
                <a
                    className={["/product-add", "/product-list"].includes(location.pathname) ? "side-menu side-menu--active" : "side-menu"}
                    onClick={() => setSideBarToggle({ ...sideBarToggle, item5: !sideBarToggle.item5 })}
                >
                    <div className="side-menu__icon"><FaBoxOpen size="22px" /></div>
                    <div className="side-menu__title cursor-pointer">
                        مدیریت انبار
                        <div className="side-menu__sub-icon transform rotate-180"> <i data-feather="chevron-down"></i> </div>
                    </div>
                </a>

                <ul className={`before ${sideBarToggle.item5 ? "after" : ""}`}>
                    <li>
                        <NavLink to="/product-add"
                            className={({ isActive }) =>
                                isActive ? "side-menu side-menu--active" : "side-menu"
                            }
                        >
                            <div className="side-menu__icon"> <FaBox size="30px" /> </div>
                            <div className="side-menu__title">افزودن کالا </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/product-list"
                            className={({ isActive }) =>
                                isActive ? "side-menu side-menu--active" : "side-menu"
                            }
                        >
                            <div className="side-menu__icon"> <FaBoxes size="30px" /> </div>
                            <div className="side-menu__title"> لیست کالا ها </div>
                        </NavLink>
                    </li>
                </ul>

            </li>

            <li className="side-nav__devider my-6"></li>


            <li className="mt-4">
                <a
                    className={["/message", "/message-list"].includes(location.pathname) ? "side-menu side-menu--active" : "side-menu"}
                    onClick={() => setSideBarToggle({ ...sideBarToggle, item6: !sideBarToggle.item6 })}
                >
                    <div className="side-menu__icon"><FaRegCommentDots size="22px" /></div>
                    <div className="side-menu__title cursor-pointer">
                        مدیریت پیام
                        <div className="side-menu__sub-icon transform rotate-180"> <i data-feather="chevron-down"></i> </div>
                    </div>
                </a>

                <ul className={`before ${sideBarToggle.item6 ? "after" : ""}`}>
                    <li>
                        <NavLink to="/message"
                            className={({ isActive }) =>
                                isActive ? "side-menu side-menu--active" : "side-menu"
                            }
                        >
                            <div className="side-menu__icon"> <FaRegComment size="30px" /> </div>
                            <div className="side-menu__title">ایجاد پیام </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/message-list"
                            className={({ isActive }) =>
                                isActive ? "side-menu side-menu--active" : "side-menu"
                            }
                        >
                            <div className="side-menu__icon"> <FaRegComments size="30px" /> </div>
                            <div className="side-menu__title"> لیست پیام ها </div>
                        </NavLink>
                    </li>
                </ul>

            </li>


            <li className="mt-4">
                <a
                    className={["/reportages-user", "/reportages-product", "/reportages-fis"].includes(location.pathname) ? "side-menu side-menu--active" : "side-menu"}
                    onClick={() => setSideBarToggle({ ...sideBarToggle, item7: !sideBarToggle.item7 })}
                >
                    <div className="side-menu__icon"><FaWindowRestore size="22px" /></div>
                    <div className="side-menu__title cursor-pointer">
                        گزارشات
                        <div className="side-menu__sub-icon transform rotate-180"> <i data-feather="chevron-down"></i> </div>
                    </div>
                </a>

                <ul className={`before ${sideBarToggle.item7 ? "after" : ""}`}>
                    <li>
                        <NavLink to="/reportages-user"
                            className={({ isActive }) =>
                                isActive ? "side-menu side-menu--active" : "side-menu"
                            }
                        >
                            <div className="side-menu__icon"> <FaUserTag size="30px" /> </div>
                            <div className="side-menu__title">گزارشات مشتریان </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/reportages-product"
                            className={({ isActive }) =>
                                isActive ? "side-menu side-menu--active" : "side-menu"
                            }
                        >
                            <div className="side-menu__icon"> <FaProductHunt size="30px" /> </div>
                            <div className="side-menu__title"> گزارشات کالا ها </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/reportages-fis"
                            className={({ isActive }) =>
                                isActive ? "side-menu side-menu--active" : "side-menu"
                            }
                        >
                            <div className="side-menu__icon"> <FaMoneyBillAlt size="30px" /> </div>
                            <div className="side-menu__title"> گزارشات فیس ها </div>
                        </NavLink>
                    </li>
                </ul>

            </li>


            <li className="mt-4">
                <a
                    className={["/profile", "/change-password"].includes(location.pathname) ? "side-menu side-menu--active" : "side-menu"}
                    onClick={() => setSideBarToggle({ ...sideBarToggle, item8: !sideBarToggle.item8 })}
                >
                    <div className="side-menu__icon"><FaUserTie size="22px" /></div>
                    <div className="side-menu__title cursor-pointer">
                        پروفایل
                        <div className="side-menu__sub-icon transform rotate-180"> <i data-feather="chevron-down"></i> </div>
                    </div>
                </a>

                <ul className={`before ${sideBarToggle.item8 ? "after" : ""}`}>
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

export default AdminSideBar