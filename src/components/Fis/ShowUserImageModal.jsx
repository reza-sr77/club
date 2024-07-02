import React, { useState } from "react";

import { Modal } from 'antd';

import { BaseApi } from './../../services/config'
import { useNavigate } from "react-router-dom";

const { forwardRef, useRef, useImperativeHandle } = React;

const ShowUserImageModal = forwardRef(({ userImage }, ref) => {

    const [visible, setVisible] = useState(false);

    const navigator = useNavigate()
    const showModal = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => ({
        showModal() {
            setVisible(!visible);
        }
    }));

    const showAllImage = () => {
        navigator('/chnage-image', {
            state: userImage
        })
    }

    return (
        <Modal
            title="نمایش"
            visible={visible}
            onOk={showModal}
            onCancel={showModal}
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="font-medium text-base ml-auto">
                            نمایش عکس {userImage?.name}
                        </h2>
                    </div>
                    <div class="modal-body">
                        {userImage?.images?.length ?
                            <img style={{ width: "75%", margin: "auto" }} src={`${BaseApi}${userImage?.images[0][720]}`} alt="" />
                            : "فاقد عکس"}
                    </div>
                    <div class="modal-footer text-right">
                        <button type="button" onClick={showModal} data-dismiss="modal" class="btn btn-outline-secondary w-20 ml-1">بستن</button>
                        {userImage?.images?.length > 1 ?
                            <button type="button" onClick={showAllImage} data-dismiss="modal" class="btn  btn-instagram w-30 ml-1">نمایش تمام عکس ها</button>
                            : null}
                    </div>
                </div>
            </div>
        </Modal>
    )
})

export default ShowUserImageModal