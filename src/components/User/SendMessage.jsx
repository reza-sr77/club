import React, { useState } from "react";

import { toast } from "react-toastify";
import { Modal } from 'antd';

import Loading from "../common/Loading";
import { postApi } from "../../services/api/globalApi";

const { forwardRef, useRef, useImperativeHandle } = React;

const SendMessage = forwardRef(({ userData }, ref) => {

    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");

    const showModal = () => {
        setLoading(false)
        setVisible(!visible);
        setMessage("")
    };

    useImperativeHandle(ref, () => ({
        showModal() {
            setVisible(!visible);
        }
    }));

    const SendMessageToUser = async () => {
        if (message) {
            setLoading(true)
            const body = JSON.stringify(
                {
                    message,
                    to: userData._id
                }
            )
            try {
                const { status } = await postApi(
                    {
                        path: 'messages',
                        body
                    }
                )
                if (status === 200) {
                    toast.success("پیام شما با موفقیت ارسال شد", {
                        position: "top-right",
                        closeOnClick: true
                    });
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
        } else {
            toast.warning("لطفا متن پیام را وارد کنید", {
                position: "top-right",
                closeOnClick: true
            });
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
                            ارسال پیام به {userData?.name}
                        </h2>
                        {loading && <Loading />}
                    </div>

                    <div className="modal-body">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="متن پیام"
                            name="message"
                            style={{ minHeight: "110px" }}
                            type="text" className="form-control w-full mt-4"
                        />
                    </div>

                    <div className="modal-footer text-right">
                        <button type="button" onClick={showModal} data-dismiss="modal" className="btn btn-outline-secondary w-20 ml-1">لغو</button>
                        <button type="button" onClick={SendMessageToUser} className="btn btn-primary w-20" >ارسال </button>

                    </div>
                </div>
            </div>
        </Modal>
    )
})
export default SendMessage