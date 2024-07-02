import React, { useRef, useState } from "react";
import { formik, Form, Field, Formik } from 'formik'
import * as Yup from 'yup'

import { toast } from 'react-toastify';

import { postApi } from "../../services/api/globalApi";
import Loading from "../common/Loading";

const ProductManage = () => {

    const imageRef = useRef()

    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(false)

    const addProduct = async (values, { resetForm }) => {
        setLoading(true)
        const body = new FormData();
        for (let key in values) {
            values[key] && body.append(key, values[key])
        }
        file && body.append("images", file);
        try {
            const { data, status } = await postApi(
                {
                    path: "products",
                    body
                }
            )
            if (status == 201) {
                toast.success("محصول با موفقیت ثبت شد", {
                    position: "top-right",
                    closeOnClick: true
                });
                resetForm()
                setFile('')
                imageRef.current.value = null
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
    const validate = Yup.object().shape(
        {
            name: Yup.string()
                .required("واردکردن نام محصول الزامیست")
            ,
            inventory: Yup.string()
                .required('وارد کردن تعداد الزامیست'),

        }
    );

    return (

        <div class="intro-y box  mt-4">
            <div class="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5">
                <h2 class="font-medium text-base ml-auto">
                    افزودن محصول
                </h2>
                {loading && <Loading />}
            </div>
            <div id="vertical-form" class="p-5">
                <Formik
                    initialValues={
                        {
                            name: "",
                            description: "",
                            inventory: "",
                        }
                    }
                    validationSchema={validate}
                    onSubmit={addProduct}
                >
                    {(formik) => (
                        <Form>
                            <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
                                <div class="col-span-12 sm:col-span-6">
                                    <label for="modal-form-1" class="form-label">نام</label>
                                    <Field
                                        type="text"
                                        class="form-control mb-2"
                                        name="name"
                                        placeholder="نام"
                                        autoComplete="off"
                                    />
                                    {formik.errors.name && formik.touched.name ? (
                                        <div>{formik.errors.name}</div>
                                    ) : null}
                                </div>

                                <div class="col-span-12 sm:col-span-6">
                                    <label for="modal-form-4" class="form-label">موجودی</label>
                                    <Field
                                        name="inventory"
                                        type="text"
                                        class="form-control mb-2"
                                        placeholder="موجودی"
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                    {formik.errors.inventory && formik.touched.inventory ? (
                                        <div>{formik.errors.inventory}</div>
                                    ) : null}
                                </div>

                                <div class="col-span-12 sm:col-span-6">
                                    <label for="modal-form-2" class="form-label">توضیحات</label>
                                    <Field
                                        type="text"
                                        class="form-control"
                                        name="description"
                                        placeholder="توضیحات "
                                        autoComplete="off"
                                    />
                                </div>


                                <div class="col-span-12 sm:col-span-6">
                                    <label for="modal-form-5" class="form-label">عکس</label>
                                    <input
                                        type="file"
                                        class="form-control"
                                        placeholder="عکس"
                                        ref={imageRef}
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                </div>
                            </div>
                            <div class="modal-footer text-right">
                                <button type="submit" class="btn btn-primary w-30" >افزودن محصول </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}


export default ProductManage