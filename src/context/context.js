import { createContext } from "react";

export const context = createContext({
    show: false,
    setShow: () => { },
});
