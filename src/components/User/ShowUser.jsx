import React, { Fragment, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import User from "./User";
import SendMessage from "./SendMessage";
import BarCode from "../common/BarCode";

const ShowUser = ({ newData, filterDataHandler, againGetData }) => {

    // console.log(newData)

    const navigator = useNavigate()
    const childRef = useRef();

    const editUser = (item) => {
        navigator('/user-edit', {
            state: item
        })
    }

    const [userData, setUserData] = useState()

    const sendMessage = (item) => {
        setUserData(item)
        childRef.current.showModal()
    }

    const editImage = (item) => {
        navigator('/chnage-image', {
            state: item
        })
    }

    const barCodeChildRef = useRef();

    const [barCodeData, setBarCodeData] = useState()
    const showBarCode = (item) => {
        setBarCodeData(item)
        barCodeChildRef.current.showModal()
    }

    const showByStatus = (e) => {
        console.log(e)
        if (e === "active" || e === "inActive" || e === "pending") {
            filterDataHandler({ status: e })
        } else {
            filterDataHandler({ status: "" })
        }
    }


    return (
        <div >
            <SendMessage userData={userData} ref={childRef} getData={againGetData} />
            <BarCode barCodeData={barCodeData} ref={barCodeChildRef} />
            <h2 className="intro-y text-lg font-medium mt-10">
                لیست مشتریان
            </h2>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
                    <Link to="/user-add">
                        <button className="btn btn-primary shadow-md ml-2">افزودن مشتری جدید</button>
                    </Link>

                    <div className="hidden md:block mx-auto text-gray-600"></div>
                    <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                        <div className="w-56 relative text-gray-700 dark:text-gray-300">
                            <input
                                type="text"
                                className="form-control w-56 box pl-10 placeholder-theme-8"
                                placeholder="جستجو توسط شماره موبایل ..."
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                onChange={(e) => filterDataHandler({ mobile: e.target.value, page: 1 })}
                            />
                            <i className="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0" data-feather="search"></i>
                        </div>
                    </div>
                    <div className="col-span-12 sm:col-span-6 mr-4 marginTopSm" >
                        <select onChange={(e) => showByStatus(e.target.value)} name="status" className="form-select">
                            <option value="">همه</option>
                            <option value="active">فعال</option>
                            <option value="inActive">غیر فعال</option>
                            <option value="pending">منتظر تایید</option>
                        </select>
                    </div>
                </div>

                {newData?.docs?.length ? (
                    newData?.docs.map((item) => (
                        <User
                            key={item?._id}
                            name={item?.name}
                            mobile={item?.mobile}
                            weight={item?.weight}
                            height={item?.height}
                            age={item?.age}
                            images={item?.images}
                            role={item?.role}
                            edit={() => editUser(item)}
                            editImage={() => editImage(item)}
                            sendMessage={() => sendMessage(item)}
                            showBarCode={() => showBarCode(item)}
                        />
                    ))) :

                    <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <p className="w-full truncate text-gray-600 mt-0.5">
                            دیتایی برای نمایش وجود ندارد
                        </p>
                    </div>
                }

                {newData?.totalPages !== 1 ?
                    <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
                        <ul className="pagination">
                            {newData?.hasPrevPage ?
                                <Fragment>
                                    <li onClick={() => filterDataHandler({ page: newData?.prevPage })}>
                                        <p className="pagination__link"> <FaChevronRight className="w-4 h-4" data-feather="chevron-right" /> </p>
                                    </li>
                                    <li> <p className="pagination__link">...</p> </li>
                                    <li onClick={() => filterDataHandler({ page: newData?.prevPage })}> <p className="pagination__link">{newData?.prevPage}</p> </li>
                                </Fragment>
                                : null}

                            <li> <p className="pagination__link pagination__link--active">{newData?.page}</p> </li>
                            {newData?.hasNextPage ?
                                <Fragment>
                                    <li onClick={() => filterDataHandler({ page: newData?.nextPage })} > <p className="pagination__link">{newData?.nextPage}</p> </li>
                                    <li  > <p className="pagination__link">...</p> </li>
                                    <li onClick={() => filterDataHandler({ page: newData?.nextPage })} >
                                        <p className="pagination__link"> <FaChevronLeft className="w-4 h-4" data-feather="chevron-left" /> </p>
                                    </li>
                                </Fragment>
                                : null
                            }
                        </ul>
                    </div>
                    : null}
            </div>
        </div>
    )
}

export default ShowUser