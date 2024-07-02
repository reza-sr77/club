import React, { Fragment, useState } from "react";
import { Modal } from 'antd';

var Barcode = require('react-barcode');

const { forwardRef, useRef, useImperativeHandle } = React;

const BarCode = forwardRef(({ barCodeData }, ref) => {

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
        <Fragment>
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
                                بارکد {barCodeData?.name}
                            </h2>
                        </div>
                        <div className="modal-body flex flex-row justify-center items-center">
                            <Barcode value={barCodeData?.mobile} />
                        </div>
                    </div>
                </div>

                <div className="modal-footer text-right">
                    <button type="button" onClick={showModal} data-dismiss="modal" className="btn btn-outline-secondary w-20 ml-1">لغو</button>
                </div>


            </Modal >

        </Fragment >

    )
}
)

export default BarCode
