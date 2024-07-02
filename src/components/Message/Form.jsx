import React, { Fragment, useState } from "react";
import { formik, Form, Field, Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify';

import { getApi } from "../../services/api/globalApi";
import Loading from "../common/Loading";
import MessageCss from './message.module.css'

const Message = ({ postDataHandler }) => {

    const [loading, setLoading] = useState(false)

    const [selectUserData, setSelectUserData] = useState([]);
    const [customerId, setCustomerId] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [searchCustomer, setSearchCustomer] = useState(null);
    const [showSearchCustomer, setShowSearchCustomer] = useState(null);
    const [isSendToUser, setIsSendToUser] = useState(false);

    const AddCustomer = (item) => {
        setCustomerId(item._id)
        setSearchCustomer(item.name)
        setIsSendToUser(true)
        setShowSearchCustomer(null)
    }

    const getCustomerData = async (value) => {
        setSearchCustomer(value)
        setShowSearchCustomer(value)
        // console.log(value)
        const path = "users";
        try {
            const { data } = await getApi({ path, params: { mobile: value } });
            setSelectUserData(data.data.docs);
            // console.log(data.data.docs);
        } catch (error) {
            console.log(error);
        }
    }

    const selectMessageType = (value) => {
        if (value === "person") {
            setShowAll(true)
        } else {
            setShowAll(false)
            setCustomerId(null)
            setIsSendToUser(false)
            setSearchCustomer("")
        }
    }

    const sendMessage = async (values, { resetForm }) => {
        setLoading(true)
        if (isSendToUser && showAll) {
            const body = JSON.stringify({
                message: values.message,
                to: customerId
            })
            const requestInfo = {
                path: "messages",
                body: body,
            };
            const data = await postDataHandler(requestInfo)
            if (data.status === 200) {
                resetForm()
                setCustomerId(null)
                setIsSendToUser(false)
                setSearchCustomer("")
                setLoading(false)
            } else {
                setLoading(false)
            }
        } else if (!isSendToUser && showAll) {
            toast.warning("لطفا مشتری را انتخاب کنید", {
                position: "top-right",
                closeOnClick: true
            });
        }
        else {
            const body = JSON.stringify({
                message: values.message,
                to: ""
            })
            const requestInfo = {
                path: "messages",
                body: body,
            };
            const data = await postDataHandler(requestInfo)
            if (data.status === 200) {
                resetForm()
                setLoading(false)
            } else {
                setLoading(false)
            }
        }

    }

    const validate = Yup.object().shape({
        message: Yup.string()
            .required("واردکردن پیام الزامیست")
    });

    return (
        <Fragment>
            <Formik
                validationSchema={validate}
                onSubmit={sendMessage}
                initialValues={{
                    message: ""
                }}

            >
                {(formik) => (
                    <Form>
                        <div className="intro-y box  mt-4">
                            <div className="modal-header">
                                <h2 className="font-medium text-base ml-auto" >
                                    ارسال پیام
                                </h2>
                                {loading && <Loading />}
                            </div>
                            <div className="intro-y box px-4  mt-4">
                                <Field name="message">
                                    {({ field, form, meta }) => {
                                        return (
                                            <textarea
                                                value={field.value}
                                                onChange={field.onChange}
                                                placeholder="متن پیام"
                                                name="message"
                                                style={{ minHeight: "150px" }}
                                                type="text" className="form-control w-full mt-4"
                                            />
                                        );
                                    }}
                                </Field>
                                {formik.errors.message && formik.touched.message ? (
                                    <div>{formik.errors.message}</div>
                                ) : null}
                                <div className="modal-body grid grid-cols-12 gap-4 gap-y-3">

                                    <div className="col-span-12 sm:col-span-6 mt-4">
                                        <label for="modal-form-6" className="form-label">ارسال به :</label>
                                        <select onChange={(e) => selectMessageType(e.target.value)} id="modal-form-6" className="form-select">
                                            <option value={"all"}>همه</option>
                                            <option value={"person"}>شخص</option>
                                        </select>
                                    </div>
                                    {showAll ?
                                        <div className="col-span-12 sm:col-span-6 mt-4 relative">
                                            <label for="modal-form-6" className="form-label">جستوجو مشتری</label>
                                            <input type="text"
                                                // className="form-control"
                                                value={searchCustomer}
                                                onChange={e => getCustomerData(e.target.value)}
                                                allowClear
                                                placeholder="جست و جو مشتری"
                                                className={`${MessageCss.searchInput} form-control`}

                                            />
                                            {showSearchCustomer?.length > 0 ?
                                                <div className={MessageCss.resultBox}>
                                                    <ul className={selectUserData?.length > 4 ? MessageCss.moreData : ""}>
                                                        {selectUserData?.length !== 0 ?
                                                            selectUserData?.map((item) => {
                                                                return (
                                                                    <li key={item._id} onClick={() => AddCustomer(item)}>{item.name}</li>
                                                                );
                                                            })
                                                            : <li>No Data</li>
                                                        }

                                                    </ul>
                                                </div>
                                                : ""}
                                        </div>
                                        : null}
                                </div>

                            </div>
                            <div className="text-left mt-5">
                                <button type="submit" className="btn btn-primary w-24" style={{ margin: "15px" }} >ارسال پیام</button>
                            </div>
                        </div>

                    </Form>
                )}
            </Formik>
        </Fragment>
    )
}
export default Message
