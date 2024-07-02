import React from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { postApi } from "../../services/api/globalApi";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/action/actions";
import jwt from 'jwt-decode'
import { FaDumbbell } from "react-icons/fa";
import { useState } from "react";
import PageLoading from "../common/PageLoading";

const Login = () => {

    const navigation = useNavigate()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const loginUser = async (values, { resetForm }) => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 10000)
        const body = JSON.stringify(values)
        try {
            const { status, data } = await postApi({
                path: "auth/login",
                body
            });
            if (status == 200) {
                toast.success("شما با موفقیت وارد شدید", {
                    position: "top-right",
                    closeOnClick: true
                });
                localStorage.setItem("jwtToken", `Bearer ${data["token"]}`);

                const jwtToken = jwt(data["token"]);
                localStorage.setItem("tokenExp", jwtToken?.exp);
                localStorage.setItem("role", jwtToken?.role);
                console.log(jwtToken)
                dispatch(setUser(jwtToken));
                resetForm()
                navigation('/')
                setLoading(false)

            }
        } catch (error) {
            toast.error(error.response.data.error, {
                position: "top-right",
                closeOnClick: true
            });
            setLoading(false)
        }
    }

    const validate = Yup.object().shape({
        mobile: Yup.string()
            .min(10, 'موبایل باید 10 رقمی باشد!')
            .max(10, 'موبایل باید 10 رقمی باشد!')
            .required('وارد کردن موبایل الزامیست'),
        password: Yup.string()
            .min(5, 'رمز عبور خیلی کوتاه است!')
            .max(48, 'رمز عبور خیلی بلند است!')
            .required('وارد کردن رمز عبور الزامیست')
    });

    return (
        <body className="login">
            {loading && <PageLoading />}
            <div className="container sm:px-10">
                <div className="block xl:grid grid-cols-2 gap-4">
                    <div className="hidden xl:flex flex-col min-h-screen">
                        <a href="" className="-intro-x flex items-center pt-5">
                            <FaDumbbell size="28px" color='#fff' src="dist/images/logo.svg" />
                            <span className="text-white text-lg mr-3 adjust "> باشگاه فرهنگی ورزشی دنیا<span className="font-medium"></span> </span>                        </a>
                        <div className="my-auto">
                            <img alt="Icewall Tailwind HTML Admin Template" className="-intro-x w-1/2 -mt-16" src="dist/images/illustration.svg" />
                            <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                                ورود
                            </div>
                            {/* <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-gray-500">تمامی اکانت های خود را در یک مکان مدیریت کنید</div> */}
                        </div>
                    </div>
                    <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                        <Formik
                            initialValues={{
                                mobile: '',
                                password: '',
                            }}
                            validationSchema={validate}
                            onSubmit={loginUser}

                        >
                            {(formik) => (
                                <Form>
                                    <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto  mt-8">
                                        <h2 className="intro-x font-bold text-2xl xl:text-3xl text-right xl:text-right ">
                                            ورود
                                        </h2>
                                        <div className="intro-x mt-2 text-gray-500 dark:text-gray-500 xl:hidden text-center hiddenElement">چند کلیک دیگر برای ورود به اکانت خود دارید . همه حساب های تجارت الکترونیکی خود را در یک مکان مدیریت کنید</div>
                                        <div className="intro-x mt-8 ">
                                            <Field
                                                name="mobile"
                                                className="intro-x login__input form-control py-3 px-4 border-gray-300 block "
                                                placeholder="موبایل "
                                                onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                            />
                                            {formik.errors.mobile && formik.touched.mobile ? (
                                                <div>{formik.errors.mobile}</div>
                                            ) : null}
                                            <Field
                                                name="password"
                                                className="intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4  "
                                                placeholder="رمز عبور"
                                                type="password"

                                            />
                                            {formik.errors.password && formik.touched.password ? (
                                                <div>{formik.errors.password}</div>
                                            ) : null}
                                        </div>
                                        <div className="intro-x flex text-gray-700 dark:text-gray-600 text-xs sm:text-sm mt-4 ">
                                            <Link to="/forgetpassword">
                                                <p >فراموشی رمز عبور؟</p>
                                            </Link>
                                        </div>
                                        <div className="intro-x mt-5 xl:mt-8 text-right xl:text-right">
                                            <button type="submit" className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top ">ورود</button>
                                            <Link to='/register'>
                                                <button className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top ">ثبت نام</button>
                                            </Link>
                                        </div>
                                        {/* <div className="intro-x mt-10 xl:mt-24 text-gray-700 dark:text-gray-600 text-right xl:text-right">
                                            با ورود شما تمامی شرایط زیر را میپذیرید
                                            <br />
                                            <a className="text-theme-17 dark:text-gray-300 " href=" ">قوانین و مقررات</a> و <a className="text-theme-17 dark:text-gray-300 " href=" ">حریم شخصی</a>
                                        </div> */}
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </body>

    )
}

export default Login