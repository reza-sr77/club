import React, { useState } from "react";
import { formik, Form, Field, Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { putApi } from "../../services/api/globalApi";
import Loading from "../common/Loading";

const ChangePassword = () => {

    const [loading, setLoading] = useState(false)


    const chnagePasswordHandler = async (values, { resetForm }) => {
        delete values.confirmPassword
        setLoading(false)

        const body = JSON.stringify(values)

        try {
            const { status } = await putApi({ path: "auth/changePassword", body })
            setLoading(false)
            if (status === 200) {
                toast.success("رمز عبور با موفقیت تغییر یافت", {
                    position: "top-right",
                    closeOnClick: true
                });
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
        password: Yup.string()
            .min(5, 'رمز عبور خیلی کوتاه است!')
            .max(48, 'رمز عبور خیلی بلند است!')
            .required('وارد کردن رمز عبور قبلی الزامیست'),
        newPassword: Yup.string()
            .min(5, 'رمز عبور خیلی کوتاه است!')
            .max(48, 'رمز عبور خیلی بلند است!')
            .required('وارد کردن رمز عبور الزامیست'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], "رمز های عبور با هم مطابقت ندارد")
            .required('وارد کردن تکرار رمز عبور الزامیست')
    });


    return (
        <div className="intro-y box lg:mt-5">
            <div className="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
                <h2 className="font-medium text-base ml-auto">
                    تغییر رمز عبور
                </h2>
                {loading && <Loading />}
            </div>
            <div className="p-5">

                <Formik
                    initialValues={{
                        password: "",
                        newPassword: "",
                        confirmPassword: ""
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
                                                <label className="form-label">رمز عبور فعلی</label>
                                                <Field
                                                    name="password"
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="رمز عبور فعلی"
                                                />
                                                {formik.errors.password && formik.touched.password ? (
                                                    <div>{formik.errors.password}</div>
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
                                        <div className="col-span-12 xxl:col-span-6">
                                            <div className="mt-3">
                                                <label for="update-profile-form-4" className="form-label">تکرار رمز عبور جدید</label>
                                                <Field
                                                    name="confirmPassword"
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="تکرار رمز عبور جدید"
                                                />
                                                {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                                                    <div>{formik.errors.confirmPassword}</div>
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


export default ChangePassword