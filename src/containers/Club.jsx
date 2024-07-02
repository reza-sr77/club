import React, { Fragment } from 'react'
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from '../layout/Layout'
import { routes } from '../routes';
import { userRoutes } from '../routes/UserRoute';
import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';

import './../assets/css/cssMain.css'
import './../assets/css/ReactToastify.css'
import './../assets/css/DateTimeInput.css'
import ForgetPassword from '../components/Auth/ForgetPassword';
import Dashboard from '../components/Dashboard/Dashboard';
import UserDashboard from '../components/UserPanel/UserDashboard';
import ChangeImage from '../components/common/images/ChnageImage';
import Live from '../components/Live/Live';

const Club = () => {

    const isAdmin = useSelector(state => state.role)


    // console.log(isAdmin)

    // const getUserData = async () => {
    //     try {
    //         const { data, status } = await getApi(
    //             {
    //                 path: "users/me"
    //             }
    //         )
    //         if (status == 200) {
    //             console.log(data.data)
    //             dispatch(setUser(data.data));
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     getUserData()
    // }, [])

    return (
        <Fragment>
            <Routes>
                {localStorage.getItem('role') === "admin" ?
                    <Route exact path="/live" element={<Live />} />
                    : null}
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/forgetpassword" element={<ForgetPassword />} />
                {localStorage.getItem("jwtToken") ?
                    <Route exact path="/" element={<Layout />} >
                        {localStorage.getItem('role') === "admin" ?
                            <Fragment>
                                <Route path='/chnage-image' element={<ChangeImage />} />
                                <Route index element={<Dashboard />} />
                                {
                                    routes.map((route, index) => {
                                        return (
                                            <Route
                                                key={index}
                                                path={route.pathName}
                                                element={<route.component baseName={route.baseName} apiName={route.apiName} />}
                                            />
                                        );
                                    })
                                }
                            </Fragment>
                            :
                            <Fragment>
                                <Route index element={<UserDashboard />} />
                                {
                                    userRoutes.map((route, index) => {
                                        return (
                                            <Route
                                                key={index}
                                                path={route.pathName}
                                                element={<route.component baseName={route.baseName} apiName={route.apiName} />}
                                            />
                                        );
                                    })
                                }
                            </Fragment>
                        }
                    </Route>
                    :
                    <Route
                        path="*"
                        element={<Navigate to="/login" replace />}
                    />
                }
            </Routes>

        </Fragment>
    )
}
export default Club