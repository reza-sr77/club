import React from "react";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Club from "./Club";

const App = () => {
    return (
        <HashRouter>
            <Club />
            <ToastContainer />
        </HashRouter>
    );
};
export default App;