import React, { Fragment, useContext } from "react"
import { useSelector } from 'react-redux';
import { context } from "../../context/context";

import AdminMenuMobile from "./AdminMenuMobile"
import UserMenuMobile from "./UserMenuMobile"

const MenoMobile = () => {

    const isAdmin = useSelector(state => state.role)

    const showMenu = useContext(context)

    const { show, setShow } = showMenu;

    return (
        <Fragment>
            <div className={show ? "mobile-menu pcDisplayNone sideMenoMobile" : "sideMenoMobile pcDisplayNone sideMenoMobileClose"}>
                <img onClick={() => setShow(!show)} className={show ? "closeBtnSideBar cursor-pointer" : "closeBtnSideBar closeBtnSideBarClose"} src={require("./../../assets/images/close.png")} alt="" />

                <ul className="border-t border-theme-2 py-5">

                    {isAdmin === "admin" ?
                        <AdminMenuMobile />
                        :
                        <UserMenuMobile />
                    }
                </ul>
            </div>

            <div onClick={() => setShow(!show)} className={show ? "pcDisplayNone closeSideBarMobile" : "pcDisplayNone closeSideBarMobile closeSideBarMobileClose"}>
            </div>
        </Fragment>
    )
}

export default MenoMobile