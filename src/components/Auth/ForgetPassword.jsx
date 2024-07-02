import React, { Fragment, useState } from "react";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { GrFormClose } from 'react-icons/gr'

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { getApi, postApi } from "../../services/api/globalApi";
import { createRef } from "react";
import { FaDumbbell } from "react-icons/fa";


const ForgetPassword = () => {


    const [mobile, setMobile] = useState("")
    const [showNotif, setShowNotif] = useState(false)
    const [showForgetForm, setShowForgetForm] = useState(false)
    const [loading, setLoading] = useState(false)

    const resetRef = createRef()
    const navigation = useNavigate()

    const showNotifToggle = () => {
        setShowNotif(!showNotif)
    }

    const resetForgetForm = () => {
        setShowForgetForm(!showForgetForm)
        resetRef.current.click()
        setMobile("")
    }

    const forget = async () => {
        if (mobile === "") {
            toast.warning("لطفا شماره موبایل خود را وارد کنید", {
                position: "top-right",
                closeOnClick: true
            });

        } else if (mobile.length !== 10) {
            toast.warning("شماره موبایل باید 10 رقمی باشد", {
                position: "top-right",
                closeOnClick: true
            });
        } else {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 10000)
            try {
                const { data, status } = await getApi({ path: "users/checkRegisterByAdmin", params: { mobile: mobile } })
                setLoading(false)
                if (!data?.data?.registerByAdmin) {
                    showNotifToggle()
                    setShowForgetForm(true)
                }
                else {
                    toast.warning("رمز عبور شما فقط توسط ادمین تغییر میکند.", {
                        position: "top-right",
                        closeOnClick: true
                    });
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
    }

    const changePassword = async (values) => {
        delete values.confirmPassword
        let marged = {
            ...values,
            ...{ mobile: mobile }
        };
        const body = JSON.stringify(marged)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 10000)
        try {
            const { status, data } = await postApi({ path: "auth/recoveryPass", body })
            if (status === 200) {
                toast.success("رمز عبور با موفقیت تغییر یافت", {
                    position: "top-right",
                    closeOnClick: true
                });
                navigation('/login')
                setLoading(false)
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
        code: Yup.string()
            .min(5, 'کد باید 5 رقمی باشد!')
            .max(5, 'کد باید 5 رقمی باشد!')
            .required('وارد کردن رمز otp الزامیست'),
        newPassword: Yup.string()
            .min(5, 'رمز عبور خیلی کوتاه است!')
            .max(48, 'رمز عبور خیلی بلند است!')
            .required('وارد کردن رمز عبور الزامیست'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], "رمز های عبور با هم مطابقت ندارد")
            .required('وارد کردن تکرار رمز عبور الزامیست')
    });


    return (
        <body className="login">

            <div className={showNotif ? "forgetNotif" : "forgetNotif  notifOff"} >
                <div onClick={showNotifToggle} className="closeBtn">
                    <GrFormClose size="20px" />
                </div>
                <p>
                    کاربر گرامی، برای بازیابی رمز عبور ابتدا روی لینک ربات تلگرام کلیک کرده، وارد ربات شوید و آن را استارت بزنید.
                    سپس روی دکمه فراموشی رمز کلیک کرده و کدی که دریافت کردید را به همراه رمز عبور جدید خود وارد کنید.
                </p>
                <div className="forgetButton">
                    <button onClick={showNotifToggle}>متوجه شدم</button>
                </div>
            </div>

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
                                فراموشی رمز
                            </div>
                            {/* <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-gray-500">تمامی اکانت های خود را در یک مکان مدیریت کنید</div> */}
                        </div>
                    </div>
                    <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">

                        <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                            <h2 className="intro-x font-bold text-2xl xl:text-3xl text-right xl:text-right ">
                                فراموشی رمز
                            </h2>
                            <div className="intro-x mt-2 text-gray-500 dark:text-gray-500 xl:hidden text-center hiddenElement">چند کلیک دیگر برای ورود به اکانت خود دارید . همه حساب های تجارت الکترونیکی خود را در یک مکان مدیریت کنید</div>
                            <div className="intro-x mt-8 ">
                                <input
                                    name="mobile"
                                    className="intro-x login__input form-control py-3 px-4 border-gray-300 block "
                                    placeholder="موبایل "
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    disabled={showForgetForm ? "disabled" : null}
                                />
                            </div>

                            <Formik
                                initialValues={{
                                    code: '',
                                    newPassword: '',
                                    confirmPassword: '',
                                }}
                                validationSchema={validate}
                                onSubmit={changePassword}
                            >
                                {(formik) => (
                                    <Form>
                                        {showForgetForm && <div>
                                            <div className="intro-x mt-8 roboteLink">
                                                <a href="https://t.me/arya_club_bot" target="_blank" rel="noreferrer">لینک ربات تلگرام</a>
                                            </div>
                                            <div className="intro-x mt-8 ">
                                                <Field
                                                    name="code"
                                                    className="intro-x login__input form-control py-3 px-4 border-gray-300 block "
                                                    placeholder="رمز OTP "
                                                // onKeyPress={(event) => {
                                                //     if (!/[0-9]/.test(event.key)) {
                                                //         event.preventDefault();
                                                //     }
                                                // }}
                                                />
                                            </div>
                                            {formik.errors.code && formik.touched.code ? (
                                                <div>{formik.errors.code}</div>
                                            ) : null}
                                            <div className="intro-x mt-8 ">
                                                <Field
                                                    name="newPassword"
                                                    className="intro-x login__input form-control py-3 px-4 border-gray-300 block "
                                                    placeholder="رمز عبور "
                                                    type="password"
                                                />
                                                {formik.errors.newPassword && formik.touched.newPassword ? (
                                                    <div>{formik.errors.newPassword}</div>
                                                ) : null}
                                            </div>
                                            <div className="intro-x mt-8 ">
                                                <Field
                                                    name="confirmPassword"
                                                    className="intro-x login__input form-control py-3 px-4 border-gray-300 block "
                                                    placeholder="تکرار رمز عبور"
                                                    type="password"

                                                />
                                                {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                                                    <div>{formik.errors.confirmPassword}</div>
                                                ) : null}
                                            </div>

                                        </div>}


                                        <div className="intro-x mt-5 xl:mt-8 text-right xl:text-right">

                                            {showForgetForm ?
                                                <Fragment>
                                                    <button type="submit" className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top ">تغییر رمز عبور</button>
                                                    <button type="reset" ref={resetRef} onClick={formik.resetForm} className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top displayNon"></button>
                                                </Fragment>
                                                :
                                                <button type="button" onClick={forget} className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top ">ارسال رمز</button>

                                            }

                                            <Link to='/login'>
                                                <button className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top ">ورود</button>
                                            </Link>
                                        </div>
                                        {showForgetForm ?
                                            <div className="intro-x mt-5 xl:mt-8 text-right xl:text-right">
                                                <p onClick={resetForgetForm} className="cursor-pointer" >شماره موبایل را اشتباه وارد کردید ؟ تعویض شماره</p>
                                            </div>
                                            : null
                                        }

                                    </Form>
                                )}
                            </Formik>

                        </div>
                    </div>
                </div>
            </div>
        </body >

    )
}

export default ForgetPassword