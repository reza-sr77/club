import React, { Fragment, useRef, useState } from "react";
import { useEffect } from "react";
import { getApi } from "../../services/api/globalApi";
import { FaUsers, FaDollarSign, FaBoxOpen, FaCheck } from 'react-icons/fa'
import moment from 'jalali-moment'
import { BaseApi } from "../../services/config";
import ShowImageModal from "../common/images/ShowImageModal";

const Dashboard = () => {

    const [fis, setFis] = useState("")

    const getFisReportages = async () => {
        try {
            const { data } = await getApi({ path: "reportages/fises", params: { dateReportaion: "today" } })
            setFis(data.data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    const [product, setProduct] = useState("")

    const getProductReportages = async () => {
        try {
            const { data } = await getApi({ path: "reportages/products", params: { limit: 5 } })
            setProduct(data.data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const [user, setUser] = useState("")
    const getUserReportages = async () => {
        try {
            const { data } = await getApi({ path: "reportages/users", params: { limit: 5 } })
            setUser(data.data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }


    const [message, setMessage] = useState("")
    const getMesages = async () => {
        try {
            const { data } = await getApi({ path: "messages", params: { limit: 10 } })
            setMessage(data?.data)
            console.log(data.data.docs)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFisReportages()
        getProductReportages()
        getUserReportages()
        getMesages()
    }, [])

    const imageChildRef = useRef()

    const [userImage, setUserImage] = useState("")

    const showUserImage = (item) => {
        setUserImage(item?.to?.images[0])
        imageChildRef.current.showModal()
    }

    return (
        <Fragment>
            <ShowImageModal userImage={userImage} ref={imageChildRef} />

            <div className="intro-y box mt-5">
                <div className="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200">
                    <h2 className="font-medium text-base ml-auto">
                        داشبورد
                    </h2>
                </div>

                <div className="grid grid-cols-12 gap-6 mt-5">

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                        <div className="report-box zoom-in">
                            <div className="box p-5">
                                <div className="flex">
                                    <div className="mr-auto">
                                        <div className="report-box__indicator  cursor-pointer" title="33% بالاتر از ماه گذشته">
                                            <FaUsers className="report-box__icon text-theme-21" />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold leading-8 mt-6">{user?.totalUser}</div>
                                <div className="text-base text-gray-600 mt-1">کاربر </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                        <div className="report-box zoom-in">
                            <div className="box p-5">
                                <div className="flex">
                                    <div className="mr-auto">
                                        <div className="report-box__indicator  cursor-pointer" title="33% بالاتر از ماه گذشته">
                                            <FaCheck className="report-box__icon text-theme-21" />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold leading-8 mt-6">{product?.sumInventory}</div>
                                <div className="text-base text-gray-600 mt-1">کالا موجود </div>
                            </div>
                        </div>
                    </div>

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
                                <div className="text-3xl font-bold leading-8 mt-6">{product?.totlalProductType}</div>
                                <div className="text-base text-gray-600 mt-1">نوع کالا  </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                        <div className="report-box zoom-in">
                            <div className="box p-5">
                                <div className="flex">
                                    <div className="mr-auto">
                                        <div className="report-box__indicator  cursor-pointer" title="33% بالاتر از ماه گذشته">
                                            <FaDollarSign className="report-box__icon text-theme-21" />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold leading-8 mt-6">{fis?.count}</div>
                                <div className="text-base text-gray-600 mt-1">درآمد </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1">
                <div className="intro-y box mt-5">
                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5">
                        <h2 className="font-medium text-base ml-auto">
                            آخرین پیام ها
                        </h2>
                    </div>
                    <div id="additional-content-alert" className="p-5">
                        <div className="preview">
                            {message.docs?.length ? message.docs.map((item) => (
                                item.to ?
                                    <div key={item?._id} className="alert alert-primary show mb-2" >
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                {item?.to?.images.length > 0 ?
                                                    <div className="ml-4">
                                                        <img className="h-10 w-10 bg-green-500 rounded-full cursor-pointer" onClick={() => showUserImage(item)} src={`${BaseApi}${item?.to?.images[0]["720"]}`} alt="" />
                                                    </div>
                                                    :
                                                    <div className="ml-4">
                                                        <img className="h-10 w-10 bg-green-500 rounded-full" src="dist/images/profile-9.jpg" alt="" />
                                                    </div>
                                                }
                                                <div className="font-medium text-lg">پیام به {item?.to?.name}</div>
                                            </div>
                                            <div className="text-xs bg-white px-1 rounded-md text-gray-800 mr-auto p-2">
                                                {item?.createdAt ? moment(item?.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD') : ""}
                                            </div>

                                        </div>
                                        <div className="mt-3">{item?.message}</div>
                                    </div>
                                    :
                                    <div key={item?._id} className="alert alert-success show mb-2" >
                                        <div className="flex items-center">
                                            <div className="font-medium text-lg"> پیام به همه</div>
                                            <div className="text-xs bg-white px-1 rounded-md text-gray-800 mr-auto p-2">
                                                {item?.createdAt ? moment(item?.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD') : ""}
                                            </div>
                                        </div>
                                        <div className="mt-3">{item?.message}</div>
                                    </div>
                            )) :
                                <div className="w-full truncate text-gray-600 mt-0.5">
                                    پیامی برای نمایش وجود ندارد
                                </div>
                            }
                        </div>
                    </div>
                </div>


            </div>
        </Fragment>


    )
}

export default Dashboard