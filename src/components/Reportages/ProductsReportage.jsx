import React, { Fragment } from "react";

import moment from 'jalali-moment'
import { FaBoxOpen, FaCheck } from "react-icons/fa";

const ProductsReportage = ({
    newData
}) => {
    // console.log(newData)

    return (
        <div className="intro-y box mt-5">
            <div className="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200">
                <h2 className="font-medium text-base ml-auto">
                    گزارشات اخیر کالا ها
                </h2>
            </div>

            <div className="p-5" id="responsive-table">
                <div className="preview">
                    {newData?.lastProduct?.length ?
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr className="bg-gray-700 dark:bg-dark-1 text-white">
                                        <th className="whitespace-nowrap">#</th>
                                        <th className="whitespace-nowrap">نام</th>
                                        <th className="whitespace-nowrap">موجودی</th>
                                        <th className="whitespace-nowrap">توضیحات</th>
                                        <th className="whitespace-nowrap">تاریخ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Fragment>
                                        {newData?.lastProduct.map((item, index) => (
                                            <tr key={item?._id}>
                                                <td className="border-b dark:border-dark-5">{index + 1}</td>
                                                <td className="border-b dark:border-dark-5">{item?.name}</td>
                                                <td className="border-b dark:border-dark-5">{item?.inventory}</td>
                                                <td className="border-b dark:border-dark-5">{item?.description}</td>
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
                                        <FaBoxOpen className="report-box__icon text-theme-21" />
                                    </div>
                                </div>
                            </div>
                            <div className="text-3xl font-bold leading-8 mt-6">{newData?.totlalProductType}</div>
                            <div className="text-base text-gray-600 mt-1">نوع کالا </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box p-5">
                            <div className="flex">
                                <div className="mr-auto">
                                    <div className="report-box__indicator  cursor-pointer" title="">
                                        <FaCheck className="report-box__icon text-theme-21" />
                                    </div>
                                </div>
                            </div>
                            <div className="text-3xl font-bold leading-8 mt-6">{newData?.sumInventory}</div>
                            <div className="text-base text-gray-600 mt-1">کالا موجود </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsReportage