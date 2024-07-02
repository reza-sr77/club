import React, { useState } from "react";
import { formik, Form, Field, Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import Loading from "../common/Loading";
import { useLocation } from 'react-router-dom';
import { FaWindowClose } from "react-icons/fa";
import { useEffect } from "react";

const PackageManage = ({
    postDataHandler,
    editdataHandler
}) => {

    const location = useLocation()
    // console.log(location.state)

    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState(location?.state?.options || [])
    const [oneOption, setOneOption] = useState("")

    useEffect(() => { }, [options])

    const addOption = () => {
        if (options.indexOf(oneOption) == -1) {
            options.push(oneOption);
            setOneOption('')
        } else {
            // options.splice(options.indexOf(oneOption), 1);
            toast.warning("مقدار از قبل وجود دارد", {
                position: "top-right",
                closeOnClick: true
            });
            setOneOption('')
        }
    }


    const removeOption = (item) => {
        let newOprion = [...options]
        newOprion.splice(newOprion.indexOf(item), 1);
        setOptions(newOprion)
        // console.log(options)
    }

    const addPackage = async (values, { resetForm }) => {
        if (options.length) {
            const body = JSON.stringify({ ...values, ...{ options: options } })
            if (!location.state) {
                setLoading(true)
                const requestInfo = {
                    path: "packages",
                    body: body,
                };
                const data = await postDataHandler(requestInfo)
                if (data.status === 200) {
                    resetForm()
                    setLoading(false)
                    setOptions([])
                    setOneOption('')
                } else {
                    setLoading(false)
                }

            } else {
                setLoading(true)
                const requestInfo = {
                    path: `packages/${location?.state._id}`,
                    body: body,
                };
                const data = await editdataHandler(requestInfo)
                if (data.status === 201) {
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            }
        } else {
            toast.warning("حداقل باید یک ویژگی اضافه کنید", {
                position: "top-right",
                closeOnClick: true
            });
        }
    }

    const validate = Yup.object().shape(
        {
            name: Yup.string()
                .required("واردکردن نام الزامیست")
            ,
            price: Yup.string()
                .required('وارد کردن مبلغ الزامیست'),
        }
    );

    return (

        <div className="intro-y box  mt-4">
            <div className="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5">

                {location?.state ?
                    <h2 className="font-medium text-base ml-auto">
                        ویرایش پکیج ({location?.state?.name})
                    </h2>
                    :
                    <h2 className="font-medium text-base ml-auto">
                        افزودن پکیج جدید
                    </h2>
                }



                {loading && <Loading />}
            </div>
            <div id="vertical-form" className="p-5">
                <Formik
                    initialValues={
                        {
                            name: location?.state?.name || "",
                            price: location?.state?.price || "",
                        }
                    }
                    validationSchema={validate}
                    onSubmit={addPackage}

                >
                    {(formik) => (
                        <Form>
                            <div className="modal-body grid grid-cols-1 gap-4 gap-y-3">
                                <div className="modal-body grid grid-cols-12 gap-4 mt-0">

                                    <div className="col-span-12 sm:col-span-6">
                                        <label for="modal-form-3" className="form-label">نام پکیج</label>
                                        <Field name="name" type="text" className="form-control  mb-2" placeholder="نام پکیج" />
                                        {formik.errors.name && formik.touched.name ? (
                                            <div>{formik.errors.name}</div>
                                        ) : null}
                                    </div>

                                    <div className="col-span-12 sm:col-span-6">
                                        <label for="modal-form-3" className="form-label">قیمت پکیج</label>
                                        <Field
                                            name="price"
                                            type="text"
                                            className="form-control mb-2"
                                            placeholder="قیمت پکیج"
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                        />
                                        {formik.errors.price && formik.touched.price ? (
                                            <div>{formik.errors.price}</div>
                                        ) : null}
                                    </div>

                                    <div className="col-span-12 sm:col-span-6">
                                        <label for="horizontal-form-2" className="form-label sm:w-20">ویژگی پکیج</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="یک ویژگی را وارد کنید"
                                            value={oneOption}
                                            onChange={(e) => setOneOption(e.target.value)}
                                        // onKeyPress={(e) => {
                                        //     if (e.key === "Enter") {
                                        //         addOption()
                                        //     }
                                        // }}
                                        />
                                    </div>
                                    <div className="modal-body text-right" style={{ marginTop: "7px" }}>
                                        <button onClick={addOption} type="button" className="btn btn-secondary w-40" >افزودن ویژگی </button>
                                    </div>

                                </div>
                                <div id="horizontal-form">
                                    <div className="preview">

                                        <div className="modal-body text-right">
                                            {options.length ? options.map((item, index) => (
                                                <span key={index} className="px-5 py-2 rounded-full bg-theme-10 text-white ml-1 inline-flex my-4"> <FaWindowClose onClick={() => removeOption(item)} className="ml-2" style={{ marginTop: "2px", cursor: "pointer" }} /> {item}</span>
                                            )) : null}
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer text-right">
                                {location.state ?
                                    <button type="submit" className="btn btn-primary w-40" >بروزرسانی پکیج </button>
                                    :
                                    <button type="submit" className="btn btn-primary w-40" >افزودن پکیج </button>
                                }</div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default PackageManage