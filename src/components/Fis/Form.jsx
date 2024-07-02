import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { DateInput } from "react-hichestan-datetimepicker";
import moment from 'jalali-moment'

import { toast } from 'react-toastify';

import { getApi } from "../../services/api/globalApi";
import Loading from "../common/Loading";
import FissCss from './fis.module.css'

const FisManage = ({
    postDataHandler,
    editdataHandler
}) => {

    const location = useLocation()
    // console.log(location?.state)

    const [description, setDescription] = useState('');

    ////User
    const [selectUserData, setSelectUserData] = useState([]);
    const [customerId, setCustomerId] = useState(null);
    const [searchCustomer, setSearchCustomer] = useState(null);
    const [discount, setDiscount] = useState(0);
    const [showSearchCustomer, setShowSearchCustomer] = useState(null);

    const AddCustomer = (item) => {
        setCustomerId(item._id)
        setSearchCustomer(item.name)
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

    ////Package
    const [selectPackageData, setSelectPackageData] = useState([]);
    const [packageId, setPackageId] = useState(null);

    const getPackageData = async () => {
        const path = "packages";
        try {
            const { data } = await getApi({ path });
            setSelectPackageData(data.data.docs);
            // console.log(data.data.docs);
        } catch (error) {
            console.log(error);
        }
    }



    //////Date Picker
    const [loading, setLoading] = useState(false)
    const [startDateForShow, setStartDateForShow] = useState("")
    const [startDate, setStartDate] = useState(moment().locale('en').format('YYYY-M-D') || "")
    const [endDateForShow, setEndDateForShow] = useState("")
    const [endDate, setEndDate] = useState(moment().locale('en').add(1, 'month').format('YYYY-M-D') || "")
    const startDateHandler = (event) => {
        setStartDateForShow(event.target.formatted)
        setStartDate(event.target.value.slice(0, 10))
    }
    const endDateHandler = (event) => {
        setEndDateForShow(event.target.formatted)
        setEndDate(event.target.value.slice(0, 10))
    }

    useEffect(() => {
        getPackageData()
        if (location.state) {
            setSearchCustomer(location?.state?.user.name || null)
            setCustomerId(location?.state?.user._id || null)
            setDescription(location?.state?.description || null)
            setStartDate(location?.state?.startDate || null)
            setEndDate(location?.state?.endDate || null)
            setDiscount(location?.state?.discount || 0)
            setStartDateForShow(moment(location?.state?.startDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD') || null)
            setEndDateForShow(moment(location?.state?.endDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD') || null)
            setPackageId(location?.state?.packageId)
        }
    }, [])


    const fisHandler = async () => {
        if (startDate === "") {
            toast.warning("مقدار ورودی  تاریخ شروع را کنترل کنید", {
                position: "top-right",
                closeOnClick: true
            });
        } else if (endDate === "") {
            toast.warning("مقدار ورودی  تاریخ پایان را کنترل کنید", {
                position: "top-right",
                closeOnClick: true
            });
        }
        //  else if (description === "") {
        //     toast.warning("مقدار ورودی  توضیحات را کنترل کنید", {
        //         position: "top-right",
        //         closeOnClick: true
        //     });
        // }
        else if (customerId === "") {
            toast.warning("مقدار ورودی  مشتری را کنترل کنید", {
                position: "top-right",
                closeOnClick: true
            });
        }
        else if (packageId === "") {
            toast.warning("مقدار ورودی  پکیج را کنترل کنید", {
                position: "top-right",
                closeOnClick: true
            });
        }
        else {
            const body = JSON.stringify(
                description === "" ?
                    {
                        user: customerId,
                        package: packageId,
                        startDate: startDate,
                        endDate: endDate,
                        discount: discount
                    }
                    :
                    {
                        description: description,
                        user: customerId,
                        package: packageId,
                        startDate: startDate,
                        endDate: endDate,
                        discount: discount
                    }
            )
            setLoading(true)
            if (!location.state) {
                const requestInfo = {
                    path: "fises",
                    body: body,
                };
                const data = await postDataHandler(requestInfo)
                if (data.status === 200) {
                    setLoading(false)
                    reset()

                } else {
                    setLoading(false)
                }
            } else {
                const requestInfo = {
                    path: `fises/${location?.state._id}`,
                    body: body,
                };
                const data = await editdataHandler(requestInfo)
                if (data.status === 201) {
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            }
        }
    }

    const reset = () => {
        setCustomerId("")
        setDescription("")
        setEndDate("")
        setEndDateForShow("")
        setPackageId("")
        setStartDate("")
        setStartDateForShow("")
        setDiscount(0)
        setSearchCustomer("")
        setStartDateForShow(moment(location?.state?.startDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD') || null)
        setEndDateForShow(moment(location?.state?.endDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD') || null)
    }


    return (
        <Fragment>
            <div className="intro-y box  mt-4">
                <div className="modal-header">
                    {location?.state ?
                        <h2 className="font-medium text-base ml-auto">
                            ویرایش فیس
                        </h2>
                        :
                        <h2 className="font-medium text-base ml-auto">
                            افزودن فیس
                        </h2>
                    }

                    {loading && <Loading />}
                </div>
                <div className="intro-y box  mt-4">
                    <div className="modal-body grid grid-cols-12 gap-4 gap-y-3">
                        <div className="col-span-12 sm:col-span-6 mt-4 relative">
                            <label for="modal-form-6" className="form-label">شماره موبایل مشتری</label>
                            <input type="text"
                                // className="form-control"
                                value={searchCustomer}
                                onChange={e => getCustomerData(e.target.value)}
                                allowClear
                                placeholder="شماره موبایل مشتری"
                                className={`${FissCss.searchInput} form-control`}

                            />
                            {showSearchCustomer?.length > 0 ?
                                <div className={FissCss.resultBox}>
                                    <ul className={selectUserData?.length > 4 ? FissCss.moreData : ""}>
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

                        <div className="col-span-12 sm:col-span-6 mt-4 relative">
                            <label for="modal-form-6" className="form-label">انتخاب پکیج</label>
                            <select value={packageId} onChange={e => setPackageId(e.target.value)} id="modal-form-6" className="form-select">
                                {selectPackageData ?
                                    <Fragment>
                                        {location.state ?
                                            <Fragment>
                                                {
                                                    selectPackageData.map((item) => (
                                                        <option key={item._id} value={item._id} selected={(item.name) === location?.state.packageName ? "selected" : null} >{item.name}</option>
                                                    ))
                                                }
                                            </Fragment>
                                            :
                                            <Fragment>
                                                <option value="" >انتخاب پکیج</option>

                                                {
                                                    selectPackageData.map((item) => (
                                                        <option key={item._id} value={item._id} >{item.name}</option>
                                                    ))
                                                }
                                            </Fragment>
                                        }
                                    </Fragment>
                                    : null}
                            </select>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <label for="modal-form-3" className="form-label">توضیحات</label>
                            <input value={description} onChange={e => setDescription(e.target.value)} id="modal-form-3" type="text" className="form-control" placeholder="توضیحات" />
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <label for="modal-form-3" className="form-label">تخفیف</label>
                            <input
                                value={discount}
                                onChange={e => setDiscount(e.target.value)}
                                id="modal-form-3"
                                type="text"
                                className="form-control"
                                placeholder="تخفیف"
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}

                            />
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <label for="modal-form-6" className="form-label">تاریخ شروع</label>
                            <div className={`${FissCss.DateInput}`}>
                                <DateInput
                                    defaultValue={undefined}
                                    name={'data'}
                                    className="form-control"
                                    autoOk
                                    value={startDateForShow}
                                    onChange={event => startDateHandler(event)}
                                    style={{ textAlign: 'right' }}
                                    placeholder="تاریخ شروع" />

                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <label for="modal-form-6" className="form-label">تاریخ پایان</label>
                            <div className={`${FissCss.DateInput}`}>
                                <DateInput
                                    defaultValue={undefined}
                                    name={'data'}
                                    className="form-control"
                                    autoOk
                                    value={endDateForShow}
                                    onChange={event => endDateHandler(event)}
                                    style={{ textAlign: 'right' }}
                                    placeholder="تاریخ پایان" />

                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer text-right">
                    {location.state ?
                        <button onClick={fisHandler} type="button" className="btn btn-primary w-40" >بروزرسانی فیس </button>
                        :
                        <button onClick={fisHandler} type="button" className="btn btn-primary w-40" >افزودن فیس </button>
                    }</div>

            </div>
        </Fragment>
    )
}

export default FisManage