import React, { useState } from "react";

import { Modal } from 'antd';

import { BaseApi } from './../../../services/config'

const { forwardRef, useRef, useImperativeHandle } = React;

const ShowImageModal = forwardRef(({ userImage }, ref) => {

    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => ({
        showModal() {
            setVisible(!visible);
        }
    }));

    return (
        <Modal
            title="نمایش"
            visible={visible}
            onOk={showModal}
            onCancel={showModal}
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <img style={{ width: "100%", margin: "auto" }} src={`${BaseApi}${userImage[720]}`} alt="" />
                    </div>
                    <div class="modal-footer text-right">
                        <button type="button" onClick={showModal} data-dismiss="modal" class="btn btn-outline-secondary w-20 ml-1">بستن</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
})

export default ShowImageModal