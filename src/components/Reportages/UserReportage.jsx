import React, { Fragment } from "react";

import moment from 'jalali-moment'
import { FaUserCheck, FaUsers, FaUserTie, FaUserTimes } from "react-icons/fa";

const UserReportage = ({
    newData
}) => {
    return (
        <div className="intro-y box mt-5">
            <div className="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200">
                <h2 className="font-medium text-base ml-auto">
                    گزارشات اخیر کاربران
                </h2>
            </div>

            <div className="p-5" id="responsive-table">
                <div className="preview">
                    {newData?.lastUser?.length ?
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr className="bg-gray-700 dark:bg-dark-1 text-white">
                                        <th className="whitespace-nowrap">#</th>
                                        <th className="whitespace-nowrap">نام</th>
                                        <th className="whitespace-nowrap">موبایل</th>
                                        <th className="whitespace-nowrap">وزن</th>
                                        <th className="whitespace-nowrap">قد</th>
                                        <th className="whitespace-nowrap">وزن</th>
                                        <th className="whitespace-nowrap">وضعیت</th>
                                        <th className="whitespace-nowrap">age</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Fragment>
                                        {newData?.lastUser.map((item, index) => (
                                            <tr key={item?._id}>
                                                <td className="border-b dark:border-dark-5">{index + 1}</td>
                                                <td className="border-b dark:border-dark-5">{item?.name}</td>
                                                <td className="border-b dark:border-dark-5">{item?.mobile}</td>
                                                <td className="border-b dark:border-dark-5">{item?.weight}</td>
                                                <td className="border-b dark:border-dark-5">{item?.height}</td>
                                                <td className="border-b dark:border-dark-5">{item?.age}</td>
                                                <td className="border-b dark:border-dark-5">
                                                    {item?.status === "active" ? "فعال" :
                                                        (
                                                            item?.status === "inActive" ? "غیر فعال" : "منتظر تایید"
                                                        )
                                                    }


                                                </td>
                                                <td className="border-b dark:border-dark-5">{item?.updatedAt ? moment(item?.updatedAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD') : ""}</td>
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
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box p-5">
                            <div className="flex">
                                <div className="mr-auto">
                                    <div className="report-box__indicator  cursor-pointer" title="33% بالاتر از ماه گذشته">
                                        <FaUserTie className="report-box__icon text-theme-21" />
                                    </div>
                                </div>
                            </div>
                            <div className="text-3xl font-bold leading-8 mt-6">{newData?.avgAge}</div>
                            <div className="text-base text-gray-600 mt-1">میانگین سنی کاربران </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box p-5">
                            <div className="flex">
                                <div className="mr-auto">
                                    <div className="report-box__indicator  cursor-pointer" title="">
                                        <FaUsers className="report-box__icon text-theme-21" />
                                    </div>
                                </div>
                            </div>
                            <div className="text-3xl font-bold leading-8 mt-6">{newData?.totalUser}</div>
                            <div className="text-base text-gray-600 mt-1">کاربر </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box p-5">
                            <div className="flex">
                                <div className="mr-auto">
                                    <div className="report-box__indicator  cursor-pointer" title="">
                                        <FaUserCheck className="report-box__icon text-theme-21" />
                                    </div>
                                </div>
                            </div>
                            <div className="text-3xl font-bold leading-8 mt-6">{newData?.activeUser}</div>
                            <div className="text-base text-gray-600 mt-1">کاربر فعال</div>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box p-5">
                            <div className="flex">
                                <div className="mr-auto">
                                    <div className="report-box__indicator  cursor-pointer" title="">
                                        <FaUserTimes className="report-box__icon text-theme-21" />
                                    </div>
                                </div>
                            </div>
                            <div className="text-3xl font-bold leading-8 mt-6">{(newData?.activeUser) - (newData?.activeUser)}</div>
                            <div className="text-base text-gray-600 mt-1">کاربر غیر فعال</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserReportage