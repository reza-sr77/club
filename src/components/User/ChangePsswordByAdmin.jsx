import React, { useState } from "react";
import { formik, Form, Field, Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { getApi } from "../../services/api/globalApi";
import Loading from "../common/Loading";

const ChangePsswordByAdmin = ({
    editdataHandler
}) => {

    const [loading, setLoading] = useState(false)

    const chnagePasswordHandler = async (values, { resetForm }) => {
        setLoading(true)
        const body = JSON.stringify(values)
        const requestInfo = {
            path: "auth/changePasswordByAdmin",
            body: body,
        };
        try {
            const { data, status } = await getApi({ path: "users/checkRegisterByAdmin", params: { mobile: values.mobile } })
            setLoading(false)
            // console.log(data?.data?.registerByAdmin)
            if (data?.data?.registerByAdmin) {
                const { data } = await editdataHandler(requestInfo)
                resetForm()
            }
            else {
                toast.warning("رمز عبور فقط توسط کاربر تغییر میکند.", {
                    position: "top-right",
                    closeOnClick: true
                });
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const validate = Yup.object().shape({
        mobile: Yup.string()
            .min(10, 'موبایل باید 10 رقمی باشد!')
            .max(10, 'موبایل باید 10 رقمی باشد!')
            .required('وارد کردن موبایل الزامیست'),
        newPassword: Yup.string()
            .min(5, 'رمز عبور خیلی کوتاه است!')
            .max(48, 'رمز عبور خیلی بلند است!')
            .required('وارد کردن رمز عبور الزامیست'),
    });


    return (
        <div className="intro-y box lg:mt-5">
            <div className="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
                <h2 className="font-medium text-base ml-auto">
                    تغییر رمز عبور توسط ادمین
                </h2>
                {loading && <Loading />}
            </div>
            <div className="p-5">

                <Formik
                    initialValues={{
                        mobile: "",
                        newPassword: "",
                    }}

                    validationSchema={validate}
                    onSubmit={chnagePasswordHandler}
                >
                    {(formik) => (
                        <Form>

                            <div className="flex flex-col-reverse xl:flex-row flex-col">
                                <div className="flex-1 mt-6 xl:mt-0">
                                    <div className="grid grid-cols-12 gap-x-5">
                                        <div className="col-span-12 xxl:col-span-6">
                                            <div className="mt-3">
                                                <label className="form-label">شماره موبایل</label>
                                                <Field
                                                    name="mobile"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="شماره موبایل"
                                                />
                                                {formik.errors.mobile && formik.touched.mobile ? (
                                                    <div>{formik.errors.mobile}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="col-span-12 xxl:col-span-6">
                                            <div className="mt-3">
                                                <label for="update-profile-form-4" className="form-label">رمز عبور جدید</label>
                                                <Field
                                                    name="newPassword"
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="رمز عبور جدید"
                                                />
                                                {formik.errors.newPassword && formik.touched.newPassword ? (
                                                    <div>{formik.errors.newPassword}</div>
                                                ) : null}
                                            </div>
                                        </div>

                                    </div>
                                    <button type="submit" className="btn btn-primary w-40 mt-3">تغییر رمز عبور</button>
                                </div>
                            </div>

                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    )
}


export default ChangePsswordByAdmin