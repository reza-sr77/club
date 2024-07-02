import React, { Fragment } from "react";
import moment from 'jalali-moment'

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const UserShowFis = ({
    newData,
    filterDataHandler,
}) => {

    return (
        <Fragment>

            <h2 className="intro-y text-lg font-medium mt-10">
                لیست فیس ها
            </h2>
            <div className="grid grid-cols-12 gap-6 mt-5">

                {newData?.docs?.length ?
                    <div className="intro-y col-span-12 overflow-auto lg:overflow-visible" style={{ overflowX: "scroll" }}>
                        <table className="table table-report -mt-2">
                            <thead>
                                <tr>
                                    {/* <th className="whitespace-nowrap">نام کاربر</th> */}
                                    <th className="text-center whitespace-nowrap">نام کاربر</th>
                                    <th className="text-center whitespace-nowrap">موبایل</th>
                                    <th className="text-center whitespace-nowrap">نام پکیج</th>
                                    <th className="text-center whitespace-nowrap">مبلغ پکیج</th>
                                    <th className="text-center whitespace-nowrap">مبلغ پرداخت شده</th>
                                    <th className="text-center whitespace-nowrap">مانده</th>
                                    <th className="text-center whitespace-nowrap">روز</th>
                                    <th className="text-center whitespace-nowrap">تاریخ شروع</th>
                                    <th className="text-center whitespace-nowrap">تاریخ پایان</th>
                                    <th className="text-center whitespace-nowrap">وضعیت</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Fragment>
                                    {newData?.docs.map((item) => (

                                        <tr key={item?._id} className="intro-x">
                                            {/* <td>
                                        <a href="" className="font-medium whitespace-nowrap">{item?.user.name}</a>
                                    </td> */}

                                            <td className="text-center">{item?.user?.name}</td>
                                            <td className="text-center">{item?.user?.mobile}</td>
                                            <td className="text-center">{item?.packageName}</td>
                                            <td className="text-center">{item?.price}</td>
                                            <td className="text-center">{item?.paidPrice}</td>
                                            <td className="text-center">{item?.price - item?.paidPrice}</td>
                                            <td className="text-center">{item?.days > 0 ?
                                                <span>{item?.days} روز مانده</span>
                                                : <span>{item?.days} روز گذشته</span>
                                            }</td>
                                            <td className="text-center">{item?.startDate ? moment(item?.startDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD') : ""}</td>
                                            <td className="text-center">{item?.endDate ? moment(item?.endDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD') : ""}</td>
                                            {item?.price - item?.paidPrice === 0 ?
                                                <td className="w-40">
                                                    <div className="flex items-center justify-center text-theme-10">
                                                        {/* <i data-feather="check-square" className="w-4 h-4 ml-2"></i> */}
                                                        پرداخت شده
                                                    </div>
                                                </td>
                                                :
                                                <td className="w-40">
                                                    <div className="flex items-center justify-center text-theme-24">
                                                        <i data-feather="check-square" className="w-4 h-4 ml-2"></i>
                                                        منتظر پرداخت
                                                    </div>
                                                </td>
                                            }
                                        </tr>
                                    ))}
                                </Fragment>

                            </tbody>
                        </table>
                    </div>
                    :
                    <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <p className="w-full truncate text-gray-600 mt-0.5">
                            دیتایی برای نمایش وجود ندارد
                        </p>
                    </div>
                }

                <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-4">
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
                            : null}
                    </ul>
                </div>
            </div>

        </Fragment>
    )
}

export default UserShowFis