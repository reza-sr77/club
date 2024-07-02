import React, { useState } from "react";
import { formik, Form, Field, Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { postApi } from "../../services/api/globalApi";
import copy from "copy-to-clipboard";
import { FaDumbbell } from "react-icons/fa";
import PageLoading from "../common/PageLoading";


const Register = () => {

    const [loading, setLoading] = useState(false)

    const registerUser = async (values, { resetForm }) => {
        delete values.confirmPassword

        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 10000)

        const body = JSON.stringify(values)
        try {
            const { data, status } = await postApi(
                {
                    path: "auth/register",
                    body
                }
            )
            if (status == 201) {
                toast.success("شما با موفقیت ثبت نام شدید", {
                    position: "top-right",
                    closeOnClick: true
                });
                setCopyText(data?.data?.otp)
                setShow(false)
                setLoading(false)
                resetForm()
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
        name: Yup.string()
            .max(35, "نام شما باید حداکثر 35 کاراکتر باشد")
            .required("واردکردن نام الزامیست")
        ,
        mobile: Yup.string()
            .min(10, 'موبایل باید 10 رقمی باشد!')
            .max(10, 'موبایل باید 10 رقمی باشد!')
            .required('وارد کردن موبایل الزامیست'),
        password: Yup.string()
            .min(5, 'رمز عبور خیلی کوتاه است!')
            .max(48, 'رمز عبور خیلی بلند است!')
            .required('وارد کردن رمز عبور الزامیست'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "رمز های عبور با هم مطابقت ندارد")
            .required('وارد کردن رمز عبور الزامیست')
    });


    const [show, setShow] = useState(true);

    const [copyText, setCopyText] = useState('');

    const handleCopyText = (e) => {
        setCopyText(e.target.value);
    }

    const copyToClipboard = () => {
        copy(copyText);
        toast.info(`کپی شد "${copyText}" `, {
            position: "top-right",
            closeOnClick: true
        });
    }


    return (
        <body className="login">
            {loading && <PageLoading />}
            <div className="container sm:px-10">
                <div className="block xl:grid grid-cols-2 gap-4">
                    <div className="hidden xl:flex flex-col min-h-screen">
                        <a href="" className="-intro-x flex items-center pt-5">
                            <FaDumbbell size="28px" color='#fff' src="dist/images/logo.svg" />
                            <span className="text-white text-lg mr-3 adjust "> باشگاه فرهنگی ورزشی دنیا<span className="font-medium"></span> </span>
                        </a>
                        <div className="my-auto">
                            <img alt="Icewall Tailwind HTML Admin Template" className="-intro-x w-1/2 -mt-16" src="dist/images/illustration.svg" />
                            <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                                ثبت نام
                            </div>
                            {/* <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-gray-500">تمامی اکانت های خود را در یک مکان مدیریت کنید</div> */}
                        </div>
                    </div>
                    {show ?
                        <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                            <Formik
                                initialValues={
                                    {
                                        name: "",
                                        mobile: "",
                                        password: "",
                                        confirmPassword: ""
                                    }
                                }
                                validationSchema={validate}
                                onSubmit={registerUser}

                            >
                                {(formik) => (
                                    <Form>
                                        <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto  mt-8">
                                            <h2 className="intro-x font-bold text-2xl xl:text-3xl text-right xl:text-right ">
                                                ثبت نام
                                            </h2>
                                            <div className="intro-x mt-2 text-gray-500 dark:text-gray-500 xl:hidden text-center hiddenElement">چند کلیک دیگر برای ورود به اکانت خود دارید . همه حساب های تجارت الکترونیکی خود را در یک مکان مدیریت کنید</div>
                                            <div className="intro-x mt-8 ">
                                                <Field
                                                    name="name"
                                                    className="intro-x login__input form-control py-3 px-4 border-gray-300 block "
                                                    placeholder="نام و تخلص "
                                                    autoComplete="off"
                                                />
                                                {formik.errors.name && formik.touched.name ? (
                                                    <div>{formik.errors.name}</div>
                                                ) : null}
                                                <Field
                                                    name="mobile"
                                                    className="intro-x login__input form-control py-3 px-4 border-gray-300 block  mt-4"
                                                    placeholder="موبایل "
                                                    autoComplete="off"
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
                                                    type="password"
                                                    name="password"
                                                    className="intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4 "
                                                    autoComplete="off"
                                                    placeholder="رمز عبور"

                                                />
                                                {formik.errors.password && formik.touched.password ? (
                                                    <div>{formik.errors.password}</div>
                                                ) : null}
                                                <Field
                                                    type="password"
                                                    name="confirmPassword"
                                                    className="intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4 "
                                                    autoComplete="off"
                                                    placeholder="تکرار رمز عبور"
                                                    autoautoComplete="off"
                                                />
                                                {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                                                    <div>{formik.errors.confirmPassword}</div>
                                                ) : null}
                                            </div>

                                            <div className="intro-x mt-5 xl:mt-8 text-right xl:text-right ">
                                                <button type="submit" className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top ">ثبت نام</button>
                                                <Link to="/login">
                                                    <button className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top ">ورود</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        :
                        <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                            <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-right xl:text-right ">
                                    ثبت نام
                                </h2>
                                <div className="intro-x mt-8 ">
                                    <div className="registerAlert">
                                        <p>
                                            کاربر گرامی، برای تایید ثبت نام اول روی لینک ربات تلگرام کلیک کنید، وراد ربات شوید و آن را استارت کنید، بعد روی دکمه ثبت نام کلیک کنید و کد زیر را وارد کنید
                                        </p>
                                    </div>
                                    <div className="intro-x mt-8 roboteLink">
                                        <a href="https://t.me/arya_club_bot" target="_blank" rel="noreferrer">لینک ربات تلگرام</a>
                                    </div>

                                    <input
                                        type="text"
                                        value={copyText}
                                        onChange={handleCopyText}
                                        className="intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4 text-center"
                                        placeholder='Enter the text you want to copy'
                                        disabled
                                    />

                                    <div className="intro-x mt-5 xl:mt-8 text-right xl:text-right ">
                                        <button onClick={copyToClipboard} className="btn btn-secondary py-3 px-4 w-full w-40  mt-3 xl:mt-0 align-top ">کپی کردن کد تایید</button>
                                        <Link to="/login">
                                            <button className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top mr-4">ورود</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </body >
    )
}

export default Register