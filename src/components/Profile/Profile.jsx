import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formik, Form, Field, Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { putApi } from "../../services/api/globalApi";
import { setUser } from "../../redux/action/actions";
import { BaseApi } from './../../services/config'
import { Link } from "react-router-dom";
import Loading from "../common/Loading";
import BarCode from "../common/BarCode";

const Profile = () => {

    const userData = useSelector(state => state)

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
    }, [userData])

    const updateUser = async (values) => {
        const body = JSON.stringify(values);
        setLoading(true)
        try {
            const { status, data } = await putApi(
                {
                    path: `users/${userData?._id}`,
                    body
                }
            )
            setLoading(false)
            if (status === 200) {
                toast.success("پروفایل با موفقیت بروزرسانی شد", {
                    position: "top-right",
                    closeOnClick: true
                });
                dispatch(setUser(data.data));
            }
        } catch (error) {
            toast.error(error.response.data.error, {
                position: "top-right",
                closeOnClick: true
            });
            setLoading(false)
        }

    }

    const validate = Yup.object().shape(
        {
            name: Yup.string()
                .max(35, "نام شما باید حداکثر 35 کاراکتر باشد")
                .required("واردکردن نام الزامیست")
        }
    );

    const barCodeChildRef = useRef();

    const [barCodeData, setBarCodeData] = useState()
    const showBarCode = (item) => {
        setBarCodeData(item)
        barCodeChildRef.current.showModal()
    }


    return (
        <div className="intro-y box lg:mt-5">
            <BarCode barCodeData={barCodeData} ref={barCodeChildRef} />
            <div className="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
                <h2 className="font-medium text-base ml-auto">
                    نمایش اطلاعات
                </h2>
                {loading && <Loading />}
            </div>
            <div className="p-5">

                <Formik
                    initialValues={{
                        name: userData?.name || "",
                        height: userData?.height || "",
                        weight: userData?.weight || "",
                        age: userData?.age || "",
                    }}

                    validationSchema={validate}
                    onSubmit={(updateUser)}
                >
                    {(formik) => (
                        <Form>
                            <div className="flex flex-col-reverse xl:flex-row flex-col">
                                <div className="flex-1 mt-6 xl:mt-0">
                                    <div className="grid grid-cols-12 gap-x-5">
                                        <div className="col-span-12 xxl:col-span-6">
                                            <div>
                                                <label for="update-profile-form-1" className="form-label">موبایل</label>
                                                <input defaultValue={userData?.mobile} id="update-profile-form-1" type="text" className="form-control" disabled />
                                            </div>
                                        </div>
                                        <div className="col-span-12 xxl:col-span-6">
                                            <div className="mt-3">
                                                <label className="form-label">نام</label>
                                                <Field
                                                    name="name"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="نام"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 xxl:col-span-6">
                                            <div className="mt-3">
                                                <label for="update-profile-form-4" className="form-label">وزن</label>
                                                <Field
                                                    name="weight"
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="وزن"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 xxl:col-span-6">
                                            <div className="mt-3">
                                                <label for="update-profile-form-4" className="form-label">قد</label>
                                                <Field
                                                    name="height"
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                    type="text" className="form-control" placeholder="قد" />
                                            </div>
                                        </div>
                                        <div className="col-span-12 xxl:col-span-6">
                                            <div className="mt-3">
                                                <label for="update-profile-form-4" className="form-label">سن</label>
                                                <Field
                                                    name="age"
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                    type="text" className="form-control" placeholder="سن" />
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary w-20 mt-3">ذخیره</button>

                                </div>
                                <div className="w-52 mx-auto xl:mr-0 xl:mr-6">
                                    <div className="border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5">
                                        <div className="h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                                            {userData?.images ?

                                                <img className="rounded-md" alt="User Image" src={userData?.images[0] ? `${BaseApi}${userData?.images[0]["720"]}` : "dist/images/profile-9.jpg"} />
                                                : null}
                                        </div>
                                        <div className="flex flex-col justify-center items-center mx-auto cursor-pointer relative mt-5">
                                            <Link to="/chnage-image" state={userData}>
                                                <button type="button" className="btn btn-primary w-full">تغییر عکس</button>
                                            </Link>

                                            <button onClick={() => showBarCode(userData)} type="button" className="btn btn-warning w-30 mt-3">نمایش بارکد</button>

                                        </div>
                                    </div>
                                </div>
                            </div>


                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    )
}

export default Profile