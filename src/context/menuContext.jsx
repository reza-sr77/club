import React, { useState } from "react";
import { context } from "./context";

const MenuContext = ({ children }) => {

    const [show, setShow] = useState(false)

    const [notif, setNotif] = useState(false)
    const [profile, setProfile] = useState(false)

    return (
        <context.Provider
            value={{
                show,
                setShow,
                notif,
                setNotif,
                profile,
                setProfile
            }}
        >
            {children}
        </context.Provider>
    );
};

export default MenuContext;
