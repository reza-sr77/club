import React, { Fragment, useState } from "react";
import { useLocation } from 'react-router-dom';
import { formik, Form, Field, Formik } from 'formik'
import * as Yup from 'yup'
import ImageUploader from "react-images-upload";

import Loading from "../common/Loading";
import { useEffect } from "react";
const UserManage = ({
    postDataHandler,
    editdataHandler
}) => {

    const location = useLocation()
    const [loading, setLoading] = useState(false)

    const [userImages, setUserImages] = useState(null);

    const [more, setMore] = useState(false);

    const registerUser = async (values, { resetForm }) => {
        if (!location.state) {
            setLoading(true)
            const body = new FormData();
            for (let key in values) {
                values[key] && body.append(key, values[key])
            }
            userImages?.map((image) => {
                body.append("images", image);
            });
            const requestInfo = {
                path: "auth/registerByAdmin",
                body: body,
            };

            const data = await postDataHandler(requestInfo)

            if (data.status === 201) {
                resetForm()
                setLoading(false)
                setUserImages(null)
                setMore(false)
                document.getElementById("show-more").checked = false;
            } else {
                setLoading(false)
            }

        } else {
            delete values.password
            setLoading(true)
            const body = new FormData();
            for (let key in values) {
                values[key] && body.append(key, values[key])
            }

            const requestInfo = {
                path: `users/${location?.state._id}`,
                body: body,
            };
            const data = await editdataHandler(requestInfo)
            if (data.status === 201) {
                setLoading(false)
            } else {
                setLoading(false)
            }
        }
    }

    const validate = Yup.object().shape(
        !location.state ? {
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

        } : {
            name: Yup.string()
                .max(35, "نام شما باید حداکثر 35 کاراکتر باشد")
                .required("واردکردن نام الزامیست")
            ,
            mobile: Yup.string()
                .min(10, 'موبایل باید 10 رقمی باشد!')
                .max(10, 'موبایل باید 10 رقمی باشد!')
                .required('وارد کردن موبایل الزامیست'),
        }
    );


    useEffect(() => {
        if (location?.state) {
            setMore(true)
        }
    }, [])

    return (

        <div className="intro-y box  mt-4">
            <div className="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5">
                {location?.state ?
                    <h2 className="font-medium text-base ml-auto">
                        ویرایش مشتری ({location?.state?.name})
                    </h2>
                    :
                    <h2 className="font-medium text-base ml-auto">
                        افزودن مشتری
                    </h2>
                }
                {loading && <Loading />}
            </div>
            <div id="vertical-form" className="p-5">
                <Formik
                    initialValues={
                        location.state ? {
                            name: location?.state?.name || "",
                            mobile: location?.state?.mobile || "",
                            height: location?.state?.height || "",
                            weight: location?.state?.weight || "",
                            age: location?.state?.age || "",
                            status: location?.state?.status || "",
                        } : {
                            name: "",
                            mobile: "",
                            password: "",
                            height: "",
                            weight: "",
                            age: "",
                        }

                    }

                    validationSchema={validate}
                    onSubmit={registerUser}

                >
                    {(formik) => (
                        <Form>
                            <div className="modal-body grid grid-cols-12 gap-4 gap-y-3">
                                <div className="col-span-12 sm:col-span-6">
                                    <label for="modal-form-1" className="form-label">نام و تخلص</label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="نام و تخلص"
                                        autoComplete="off"
                                    />
                                    {formik.errors.name && formik.touched.name ? (
                                        <div>{formik.errors.name}</div>
                                    ) : null}
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <label for="modal-form-2" className="form-label">موبایل</label>
                                    {location.state ?
                                        <Field
                                            type="text"
                                            className="form-control"
                                            name="mobile"
                                            placeholder="موبایل "
                                            disabled
                                        />
                                        :
                                        <>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                name="mobile"
                                                placeholder="موبایل "
                                                autoComplete="off"
                                                onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }} />
                                            {formik.errors.mobile && formik.touched.mobile ? (
                                                <div>{formik.errors.mobile}</div>
                                            ) : null}
                                        </>
                                    }
                                </div>
                                {!location.state &&
                                    <div className="col-span-12 sm:col-span-6">
                                        <label for="modal-form-3" className="form-label">رمز عبور</label>
                                        <Field
                                            className="form-control"
                                            type="password"
                                            name="password"
                                            autoComplete="off"
                                            placeholder="رمز عبور"
                                        />
                                        {formik.errors.password && formik.touched.password ? (
                                            <div>{formik.errors.password}</div>
                                        ) : null}
                                    </div>
                                }

                                {!location?.state ?
                                    <div className="col-span-12 sm:col-span-6">
                                        <div class="form-check w-full sm:w-auto sm:mr-auto mt-3 sm:mt-0" style={{ marginTop: "37px" }}>
                                            <label className="form-check-label mr-0 sm:mr-2" for="show-more">اطلاعات بیشتر</label>
                                            <input id="show-more" className="show-code form-check-switch ml-0 mr-3" type="checkbox" onClick={() => setMore(!more)} />
                                        </div>
                                    </div>
                                    : null}


                                {more && <Fragment>
                                    <div className="col-span-12 sm:col-span-6">
                                        <label for="modal-form-4" className="form-label">وزن</label>
                                        <Field
                                            name="weight"
                                            type="text"
                                            className="form-control"
                                            placeholder="وزن" />
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <label for="modal-form-5" className="form-label">قد</label>
                                        <Field
                                            name="height"
                                            type="text"
                                            className="form-control"
                                            placeholder="قد"
                                        />
                                    </div>
                                    <div className="col-span-12 sm:col-span-6">
                                        <label for="modal-form-5" className="form-label">سن</label>
                                        <Field
                                            name="age"
                                            type="text"
                                            className="form-control"
                                            placeholder="سن"
                                        />
                                    </div>

                                    {location?.state &&
                                        <div className="col-span-12 sm:col-span-6">
                                            <label for="modal-form-5" className="form-label">وضعیت</label>
                                            <Field as="select" name="status" className="form-select">
                                                <option value="active" selected={location?.state?.status === "active" ? "selected" : null}>فعال</option>
                                                <option value="inActive" selected={location?.state?.status === "inActive" ? "selected" : null}>غیر فعال</option>
                                                <option value="pending" selected={location?.state?.status === "pending" ? "selected" : null}>منتظر تایید</option>
                                            </Field>
                                        </div>
                                    }

                                    {!location.state &&
                                        <div className="col-span-12 sm:col-span-6">

                                            <ImageUploader
                                                type="file"
                                                withIcon={true}
                                                withPreview={true}
                                                buttonText="انتخاب عکس"
                                                label="png - gif - jpg حداکثر حجم عکس 1 مگابایت | فرمت عکس ها "
                                                fileSizeError="حجم عکس بیش از حد مجاز است"
                                                fileTypeError="فرمت  عکس پشتیبانی نمیشود."
                                                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                                maxNumber="5"
                                                onChange={(e) => {
                                                    console.log(e);
                                                    setUserImages(e);
                                                }}
                                                maxFileSize={5242880}
                                            />

                                        </div>
                                    }
                                </Fragment>
                                }
                            </div>
                            <div className="modal-footer text-right">
                                <button type="submit" className="btn btn-primary w-20" >ارسال </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >

    )
}


export default UserManage