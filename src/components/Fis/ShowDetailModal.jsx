import React, { useState } from "react";
import moment from 'jalali-moment'

import { Modal } from 'antd';

const { forwardRef, useRef, useImperativeHandle } = React;

const ShowDetailModal = forwardRef(({ fisData }, ref) => {

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
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="font-medium text-base ml-auto">
                            جزییات فیس {fisData?.user.name}
                        </h2>
                    </div>
                    <div className="modal-body">
                        <p className="fisDetail box px-5 py-3 zoom-in">
                            نام پکیج : {fisData?.packageName || "-"}
                        </p>
                        <p className="fisDetail box px-5 py-3 zoom-in fisDetail">
                            تاریخ شروع : {fisData?.startDate ? moment(fisData?.startDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD') : ""}
                        </p>
                        <p className="fisDetail box px-5 py-3 zoom-in fisDetail">
                            تاریخ پایان : {fisData?.endDate ? moment(fisData?.endDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD') : ""}
                        </p>
                        <p className="fisDetail box px-5 py-3 zoom-in fisDetail">
                            توضیحات : {fisData?.description || "-"}
                        </p>
                    </div>

                    <div className="modal-footer text-right">
                        <button type="button" onClick={showModal} data-dismiss="modal" className="btn btn-outline-secondary w-20 ml-1">بستن</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
})
export default ShowDetailModal