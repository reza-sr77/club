import React, { Fragment } from "react";

import moment from 'jalali-moment'
import { FaDollarSign } from "react-icons/fa";

const FisReportage = (
    {
        newData,
        filterDataHandler
    }
) => {

    const countTime = (e) => {
        filterDataHandler({ dateReportaion: e })
    }

    return (
        <div className="intro-y box mt-5">
            <div className="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200">
                <h2 className="font-medium text-base ml-auto">
                    گزارشات اخیر فیس ها (پرداخت نشده)
                </h2>
            </div>
            <div className="p-5" id="responsive-table">
                <div className="preview">
                    {newData?.fisesNoPaied?.length ?
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr className="bg-gray-700 dark:bg-dark-1 text-white">
                                        <th className="whitespace-nowrap">#</th>
                                        <th className="whitespace-nowrap">نام</th>
                                        <th className="whitespace-nowrap">شماره موبایل</th>
                                        <th className="whitespace-nowrap">پکیج</th>
                                        <th className="whitespace-nowrap">مبلغ</th>
                                        <th className="whitespace-nowrap"> تخفیف</th>
                                        <th className="whitespace-nowrap"> پرداخت شده</th>
                                        <th className="whitespace-nowrap">باقی مانده</th>
                                        <th className="whitespace-nowrap">روز</th>
                                        <th className="whitespace-nowrap">تاریخ شروع</th>
                                        <th className="whitespace-nowrap">تاریخ پایان</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Fragment>
                                        {newData?.fisesNoPaied.map((item, index) => (
                                            <tr key={item?._id}>
                                                <td className="border-b dark:border-dark-5">{index + 1}</td>
                                                <td className="border-b dark:border-dark-5">{item?.user?.name}</td>
                                                <td className="border-b dark:border-dark-5">{item?.user?.mobile}</td>
                                                <td className="border-b dark:border-dark-5">{item?.packageName}</td>
                                                <td className="border-b dark:border-dark-5">{item?.price}</td>
                                                <td className="border-b dark:border-dark-5">{item?.discount}</td>
                                                <td className="border-b dark:border-dark-5">{item?.paidPrice}</td>
                                                <td className="border-b dark:border-dark-5">{item?.price - item?.paidPrice - item?.discount}</td>
                                                <td className="border-b dark:border-dark-5">{item?.days > 0 ?
                                                    <span>{item?.days} روز مانده</span>
                                                    : <span>{item?.days} روز گذشته</span>
                                                }</td>
                                                <td className="border-b dark:border-dark-5">{item?.startDate ? moment(item?.startDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD') : ""}</td>
                                                <td className="border-b dark:border-dark-5">{item?.endDate ? moment(item?.endDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD') : ""}</td>
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

            <div className="modal-body grid grid-cols-12 gap-4 gap-y-3">
                <div className="col-span-4 sm:col-span-6 mt-4 relative">
                    <label for="modal-form-6" className="form-label">بازه زمانی درآمد</label>
                    <select onChange={e => countTime(e.target.value)} id="modal-form-6" className="form-select">
                        <option value="today" >روزانه</option>
                        <option value="month">ماهانه</option>
                        <option value="year" >سالانه</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box p-5">
                            <div className="flex">
                                <div className="mr-auto">
                                    <div className="report-box__indicator  cursor-pointer" title="33% بالاتر از ماه گذشته"> 33%
                                        <FaDollarSign className="report-box__icon text-theme-21" />
                                    </div>
                                </div>
                            </div>
                            <div className="text-3xl font-bold leading-8 mt-6">{newData?.count}</div>
                            <div className="text-base text-gray-600 mt-1">درآمد </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FisReportage