import React, { useEffect, useState, Fragment } from "react";
import moment from 'jalali-moment'

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ShowImageModal from "../common/images/ShowImageModal";
import { useRef } from "react";
import { BaseApi } from "../../services/config";

const ShowMessage = ({ newData, filterDataHandler }) => {

    const [messageData, setMessageData] = useState([])

    console.log(newData)

    useEffect(() => {
        if (newData) {
            setMessageData((newData?.docs))
        }
    }, [newData])

    const imageChildRef = useRef()

    const [userImage, setUserImage] = useState("")

    const showUserImage = (item) => {
        setUserImage(item?.to?.images[0])
        imageChildRef.current.showModal()
    }

    return (
        <Fragment>
            <ShowImageModal userImage={userImage} ref={imageChildRef} />

            <div className="grid grid-cols-1">
                <div className="intro-y box mt-5">
                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5">
                        <h2 className="font-medium text-base ml-auto">
                            لیست پیام ها
                        </h2>
                    </div>
                    <div id="additional-content-alert" className="p-5">
                        <div className="preview">
                            {messageData?.length ? messageData.map((item) => (
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
                                    <div key={item?._id} className="alert alert-success show mb-2" role="alert">
                                        <div className="flex items-center">
                                            <div className="font-medium text-lg"> پیام به همه</div>
                                            <div className="text-xs bg-white px-1 rounded-md text-gray-800 mr-auto  p-2">
                                                {item?.createdAt ? moment(item?.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD') : ""}
                                            </div>
                                        </div>
                                        <div className="mt-3">{item?.message}</div>
                                    </div>
                            ))
                                :
                                <div className="w-full truncate text-gray-600 mt-0.5">
                                    پیامی برای نمایش وجود ندارد
                                </div>
                            }
                        </div>
                    </div>
                </div>

                {newData?.totalPages !== 1 ?
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
                    : null}
            </div>
        </Fragment>
    )
}


export default ShowMessage