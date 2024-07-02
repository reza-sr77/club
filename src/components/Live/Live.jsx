import React, { Fragment, useRef } from "react";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { BaseApi } from "../../services/config";
import { FaUserAlt, FaThList, FaMoneyBillWave, FaMoneyBillAlt, FaMoneyBill, FaRegCalendarAlt, FaFacebookMessenger } from 'react-icons/fa'

const socket = io.connect("https://clubserver.omidshayan.info");

const Live = () => {

    const [messageReceived, setMessageReceived] = useState("");

    const sendMessage = (value) => {
        setMessageReceived("")
        socket.emit("userFisInfo", value);
    };

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    useEffect(() => {
        socket.on("userFisInfo", (data) => {
            setMessageReceived(data);
            if (data.success) {
                countDown()
                setShow(true)
                inputRef.current.value = "";
                inputRef.current.focus()
                setTimeout(() => {
                    setMessageReceived('')
                    setShow(false)
                    document.getElementById("seconds").innerHTML = String(5);
                }, 5000)
            }
            console.log(data)
        });
    }, [socket]);

    const [show, setShow] = useState(false)

    const countDown = () => {
        var timeLeft = 5;
        function countdown() {
            timeLeft--;
            document.getElementById("seconds").innerHTML = String(timeLeft);
            if (timeLeft > 0) {
                setTimeout(countdown, 1000);
            }
        };
        setTimeout(countdown, 1000);
    }

    return (
        <Fragment>

            <div className="w-10/12 mx-auto">
                <div className="intro-y box lg:mt-5">
                    <div className="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
                        <h2 className="font-medium text-base ml-auto">
                            باشگاه فرهنگی ورزشی دنیا
                        </h2>
                        {messageReceived?.message ?
                            <div class="preview">
                                <div class="alert alert-warning show  text-center" role="alert">{messageReceived?.message}</div>
                            </div>
                            : null}
                    </div>
                    <div className="p-5">

                        <div className="flex flex-col-reverse xl:flex-row flex-col">
                            <div className="flex-1 mt-6 xl:mt-0">
                                <div className="grid grid-cols-12 gap-x-5">
                                    <div className="col-span-4 xxl:col-span-6">
                                        <div className="mt-3">
                                            <label className="form-label">اسکن کارت</label>
                                            <input
                                                name="barcode"
                                                ref={inputRef}
                                                type="text"
                                                className="form-control"
                                                placeholder="لطفا کارت خود را اسکن کنید"
                                                onChange={(e) => e.target.value.length === 10 && sendMessage(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {show ?
                                        <div className="col-span-4 xxl:col-span-6">
                                            <div className="" style={{ marginTop: "28px" }}>
                                                <button type="button" className="btn btn-primary w-20 mt-3" id="seconds">5</button>
                                            </div>
                                        </div>
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    {messageReceived?.user ?
                        <div className="flex items-center p-5 border-t border-gray-200 dark:border-dark-5">
                            <div>
                                <div className="w-52 mx-auto xl:mr-0 xl:mr-6">
                                    <div className="border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5">
                                        <div className="h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                                            {messageReceived?.user?.images ?
                                                <img className="rounded-md" alt="User Image" src={messageReceived?.user?.images[0] ? `${BaseApi}${messageReceived?.user?.images[0]["720"]}` : "dist/images/profile-9.jpg"} />
                                                : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="flex w-auto px-8">
                                    <ul className="flex w-full h-full flex-col justify-center items-start gap-4 text-lg">
                                        <li className="flex"><FaUserAlt size="16px" style={{ marginTop: "7px", marginLeft: "7px" }} /> نام : {messageReceived?.user?.name}</li>
                                        {messageReceived?.lastFise ?
                                            <Fragment>
                                                <li className="flex"> <FaThList size="16px" style={{ marginTop: "7px", marginLeft: "7px" }} /> نام پکیج : {messageReceived?.lastFise?.packageName}</li>
                                                <li className="flex"><FaMoneyBillWave size="16px" style={{ marginTop: "7px", marginLeft: "7px" }} /> مبلغ پکیج : {messageReceived?.lastFise?.price}</li>
                                                <li className="flex"><FaMoneyBillWave size="16px" style={{ marginTop: "7px", marginLeft: "7px" }} /> تخفیف : {messageReceived?.lastFise?.discount}</li>
                                            </Fragment> : null}
                                    </ul>
                                </div>
                                <div className="flex w-auto px-8">
                                    <ul className="flex w-full h-full flex-col justify-center items-start gap-4 text-lg">
                                        {messageReceived?.lastFise ?
                                            <Fragment>

                                                <li className="flex"><FaMoneyBillAlt size="16px" style={{ marginTop: "7px", marginLeft: "7px" }} /> مبلغ پرداخت شده : {messageReceived?.lastFise?.paidPrice}</li>
                                                <li className="flex"><FaMoneyBill size="16px" style={{ marginTop: "7px", marginLeft: "7px" }} /> باقی مانده : {parseInt(messageReceived?.lastFise?.price) - parseInt(messageReceived?.lastFise?.paidPrice) - parseInt(messageReceived?.lastFise?.discount)}</li>
                                                <li className="flex text-xl"> <FaRegCalendarAlt size="16px" style={{ marginTop: "7px", marginLeft: "7px" }} />
                                                    {messageReceived?.lastFise?.days > 0 ?
                                                        <span>{messageReceived?.lastFise?.days} روز مانده</span>
                                                        : <span>{messageReceived?.lastFise?.days} روز گذشته</span>
                                                    }
                                                </li>
                                            </Fragment> :
                                            <li className="flex text-xl"> <FaFacebookMessenger size="16px" style={{ marginTop: "7px", marginLeft: "7px" }} />
                                                برای شما هیچ فیسی ثبت نشده است
                                            </li>
                                        }
                                    </ul>
                                </div>
                            </div>

                        </div>
                        : null}


                    <div className="flex items-center p-5 border-t border-gray-200 dark:border-dark-5">
                        {messageReceived?.success ?
                            <Fragment>
                                {messageReceived?.fis ?
                                    <div className="w-full mx-auto">
                                        <div className="intro-y box w-full mt-4">
                                            {messageReceived?.fis?.length > 0 ?
                                                <div id="basic-alert" class="p-5">
                                                    <div class="preview">
                                                        <div class="alert alert-danger  show mb-2 text-center" role="alert">شما هنوز فیس خود را پرداخت نکرده اید !</div>
                                                    </div>
                                                </div>
                                                :
                                                <div id="basic-alert" class="p-5">
                                                    <div class="preview">
                                                        <div class="alert alert-success  show mb-2 text-center" role="alert">شما فیس خود را پرداخت کرده اید .</div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    : null}
                            </Fragment>
                            : null}
                    </div>
                </div>
            </div>




            {/* <div className="w-10/12 mx-auto" style={{ marginBottom: "40px" }}>
                {messageReceived?.fis?.length > 0 ?
                    <div className="grid grid-cols-12 gap-6 mt-5 bg-white rounded-lg">
                        <div className="flex w-72 items-center p-5 border-b border-gray-200 dark:border-dark-5">
                            <h2 className="font-medium w-full text-base ml-auto">
                                لیست فیس ها (پرداخت نشده)
                            </h2>
                        </div>
                        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible" style={{ overflowX: "scroll" }
                        } >
                            <table className="table table-report -mt-2">
                                <thead>
                                    <tr>
                                        <th className="text-center whitespace-nowrap">نام پکیج</th>
                                        <th className="text-center whitespace-nowrap">مبلغ پکیج</th>
                                        <th className="text-center whitespace-nowrap">مبلغ پرداخت شده</th>
                                        <th className="text-center whitespace-nowrap">مانده</th>
                                        <th className="text-center whitespace-nowrap">روز</th>
                                        <th className="text-center whitespace-nowrap">وضعیت</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <Fragment>
                                        {messageReceived?.fis.map((item) => (

                                            <tr className="intro-x" key={item?._id}>
                                                <td className="text-center">{item?.packageName}</td>
                                                <td className="text-center">{item?.price}</td>
                                                <td className="text-center">{item?.paidPrice}</td>
                                                <td className="text-center">{item?.price - item?.paidPrice}</td>
                                                <td className="text-center">{item?.days > 0 ?
                                                    <span>{item?.days} روز مانده</span>
                                                    : <span>{item?.days} روز گذشته</span>
                                                }</td>
                                                {item?.price - item?.paidPrice === 0 ?
                                                    <td className="text-center">
                                                        <div className="flex items-center justify-center text-theme-10">
                                                            پرداخت شده
                                                        </div>
                                                    </td>
                                                    :
                                                    <td className="text-center">
                                                        <div className="flex items-center justify-center text-theme-24">
                                                            منتظر پرداخت
                                                        </div>
                                                    </td>
                                                }

                                            </tr>
                                        ))}
                                    </Fragment>
                                </tbody>
                            </table>
                        </div >
                    </div>
                    :
                    null
                }
            </div> */}



        </Fragment>
    )
}

export default Live