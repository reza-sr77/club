import React, { useState } from "react";

import { toast } from "react-toastify";
import { DateInput } from "react-hichestan-datetimepicker";
import { Modal } from 'antd';

import Loading from "../common/Loading";
import { putApi } from "../../services/api/globalApi";
import FissCss from './fis.module.css'

const { forwardRef, useRef, useImperativeHandle } = React;

const PayFisModal = forwardRef(({ fisData, reGetData }, ref) => {

    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false);
    const [price, setPrice] = useState("");
    const [fullPaid, setFullPaid] = useState(false);
    const [date, setDate] = useState("")
    const [description, setDescription] = useState("")
    const [dateForShow, setDateForShow] = useState("")
    const [show, setSHow] = useState(true)


    const reset = () => {
        setPrice("")
        setDate("")
        setDateForShow("")
        setFullPaid(false)
        setSHow(true)
    }

    const dateHandler = (event) => {
        setDateForShow(event.target.formatted)
        setDate(event.target.value)
    }

    const payHandler = (event) => {
        if (event === "false") {
            setFullPaid(false)
            setSHow(true)
        } else {
            setFullPaid(true)
            setPrice("")
            setDate("")
            setDateForShow("")
            setSHow(false)
        }
        setDateForShow(event.target.formatted)
        setDate(event.target.value)
    }

    const showModal = () => {
        setLoading(false)
        setVisible(!visible);
        reset()
    };

    useImperativeHandle(ref, () => ({
        showModal() {
            setVisible(!visible);
        }
    }));

    const payUserFis = async () => {
        setLoading(true)
        const body = JSON.stringify(
            {
                price: parseInt(price),
                date: date,
                description: description,
                fullPaid: fullPaid
            }
        )
        try {
            const { status } = await putApi(
                {
                    path: `fises/${fisData._id}/paid`,
                    body
                }
            )
            if (status === 200) {
                toast.success("پرداخت با موفقیت انجام شد", {
                    position: "top-right",
                    closeOnClick: true
                });
                reset()
                reGetData()
                setLoading(false)
                showModal()
            }
        } catch (error) {
            toast.error(error.response.data.error, {
                position: "top-right",
                closeOnClick: true
            });
            setLoading(false)
        }
    }

    return (
        <Modal
            title="نمایش"
            visible={visible}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="font-medium text-base ml-auto">
                            پرداخت فیس {fisData?.user.name}
                        </h2>
                        {loading && <Loading />}

                    </div>
                    <div className="modal-body">
                        مبلغ کل : {(fisData?.price)}
                        <br />
                        باقی مانده : {(fisData?.price - fisData?.paidPrice)}

                        <div className="modal-body grid grid-cols-12 gap-4 gap-y-3">

                            <div className="col-span-12 sm:col-span-6">
                                <label for="modal-form-6" className="form-label">نوع پرداخت</label>
                                <select value={fullPaid} onChange={(e) => payHandler(e.target.value)} id="modal-form-6" className="form-select">
                                    <option value="false" >کامل پرداخت نشد</option>
                                    <option value="true" >کامل پرداخت شد</option>
                                </select>
                            </div>

                            <div className="col-span-12 sm:col-span-6" style={show ? { display: "block" } : { display: "none" }}>
                                <label for="modal-form-1" className="form-label">مبلغ پرداخت شده</label>
                                <input
                                    className="form-control"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="مبلغ پرداخت شده را وارد کنید"
                                    type="text"
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </div>
                            <div className="col-span-12 sm:col-span-6" style={show ? { display: "block" } : { display: "none" }}>
                                <label for="modal-form-2" className="form-label">توضیحات</label>
                                <input
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="توضیحات"
                                    type="text"
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6" style={show ? { display: "block" } : { display: "none" }}>
                                <label for="modal-form-3" className="form-label">تاریخ</label>

                                <div className={`${FissCss.DateInput}`}>
                                    <DateInput
                                        defaultValue={undefined}
                                        name={'data'}
                                        className="form-control"
                                        autoOk
                                        value={dateForShow}
                                        onChange={event => dateHandler(event)}
                                        style={{ textAlign: 'right' }}
                                        placeholder="تاریخ" />

                                </div>

                            </div>
                        </div>
                        <p className={FissCss.dec}>در صورت وارد نکردن تاریخ، تاریخ امروز ثبت میشود</p>
                    </div>

                    <div className="modal-footer text-right">
                        <button type="button" onClick={showModal} data-dismiss="modal" className="btn btn-outline-secondary w-20 ml-1">لغو</button>
                        <button type="button" onClick={payUserFis} className="btn btn-primary w-20" >ارسال </button>

                    </div>
                </div>
            </div>
        </Modal>
    )
})
export default PayFisModal