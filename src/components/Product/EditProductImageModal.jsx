import React, { useState } from "react";

import { toast } from "react-toastify";
import { Modal } from 'antd';

import Loading from "../common/Loading";
import { putApi } from "../../services/api/globalApi";
import { BaseApi } from './../../services/config'

const { forwardRef, useRef, useImperativeHandle } = React;

const EditProductImageModal = forwardRef(({ productData, reGetData }, ref) => {

    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false);
    const [file, setFile] = useState(null);

    const fileRef = useRef()

    const showModal = () => {
        setLoading(false)
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => ({
        showModal() {
            setVisible(!visible);
        }
    }));

    const editProductImage = async () => {
        if (file) {
            setLoading(true)
            const body = new FormData()
            productData?.images[0] && body.append("removeImages[]", productData?.images[0]["_id"] || "")
            body.append("images", file)
            // for (let property of body.entries()) {
            //     console.log(property[0], property[1]);
            // }
            try {
                const { status } = await putApi(
                    {
                        path: `products/${productData._id}/images`,
                        body
                    }
                )
                if (status === 200) {
                    toast.success("عکس کالا با موفقیت بروزرسانی شد", {
                        position: "top-right",
                        closeOnClick: true
                    });
                    reGetData()
                    setLoading(false)
                    showModal()
                    fileRef.current.value = null;
                }
            } catch (error) {
                toast.error(error.response.data.error, {
                    position: "top-right",
                    closeOnClick: true
                });
                setLoading(false)
            }
        } else {
            toast.warning("لطفا عکس را بارگذاری کنید", {
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
                            ویرایش عکس {productData?.name}
                        </h2>
                        {loading && <Loading />}
                    </div>

                    <div class="modal-body">
                        عکس فعلی : {productData?.images.length ?
                            <img style={{ height: "150px", margin: "auto" }} src={`${BaseApi}${productData?.images[0][720]}`} alt="" />
                            :
                            " فاقد عکس"
                        }
                        <div class="col-span-12 sm:col-span-6 mt-4">
                            <label for="modal-form-5" class="form-label"> عکس جدید</label>
                            <input ref={fileRef} onChange={(e) => setFile(e.target.files[0])} type="file" class="form-control" placeholder="عکس" />
                        </div>
                    </div>

                    <div class="modal-footer text-right">
                        <button type="button" onClick={showModal} data-dismiss="modal" class="btn btn-outline-secondary w-20 ml-1">لغو</button>
                        <button type="button" onClick={editProductImage} class="btn btn-primary w-20" >ارسال </button>

                    </div>
                </div>
            </div>
        </Modal>
    )
})

export default EditProductImageModal