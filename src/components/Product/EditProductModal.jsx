import React, { useState } from "react";

import { toast } from "react-toastify";
import { Modal } from 'antd';

import { putApi } from "../../services/api/globalApi";
import Loading from "../common/Loading";

const { forwardRef, useRef, useImperativeHandle } = React;

const EditProductModal = forwardRef(({ productData, getData, reGetData }, ref) => {

    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false);
    const [inventory, setInventory] = useState("");

    const showModal = () => {
        setLoading(false)
        setVisible(!visible);
        setInventory("")
    };

    useImperativeHandle(ref, () => ({
        showModal() {
            setVisible(!visible);
        }
    }));

    const editProduct = async () => {
        if (inventory) {
            setLoading(true)
            const body = JSON.stringify(
                {
                    inventory
                }
            )
            try {
                const { status } = await putApi(
                    {
                        path: `products/${productData._id}`,
                        body
                    }
                )
                if (status === 200) {
                    toast.success("تعداد کالا با موفقیت بروزرسانی شد", {
                        position: "top-right",
                        closeOnClick: true
                    });
                    reGetData()
                    setLoading(false)
                    showModal()
                    getData()
                }
            } catch (error) {
                toast.error(error.response.data.error, {
                    position: "top-right",
                    closeOnClick: true
                });
                setLoading(false)
            }
        } else {
            toast.warning("لطفا تعداد جدید را وارد کنید", {
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
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="font-medium text-base ml-auto">
                            ویرایش تعداد {productData?.name}
                        </h2>
                        {loading && <Loading />}
                    </div>

                    <div class="modal-body">
                        کالا تعداد فعلی : {productData?.inventory}
                        <input
                            value={inventory}
                            onChange={(e) => setInventory(e.target.value)}
                            placeholder="تعداد جدید کالا"
                            type="text"
                            class="form-control w-full mt-4"
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                        />
                    </div>

                    <div class="modal-footer text-right">
                        <button type="button" onClick={showModal} data-dismiss="modal" class="btn btn-outline-secondary w-20 ml-1">لغو</button>
                        <button type="button" onClick={editProduct} class="btn btn-primary w-20" >ارسال </button>

                    </div>
                </div>
            </div>
        </Modal>
    )
})
export default EditProductModal