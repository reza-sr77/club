import React, { useState } from "react"

import { FaMobileAlt, FaStream, FaTextHeight, FaUserAlt, FaUserCheck, FaWeight, FaImage } from "react-icons/fa";
import { FaUserEdit } from 'react-icons/fa';

import { BaseApi } from './../../services/config'

import { Link } from 'react-router-dom'

const User = ({ name, age, mobile, edit, height, weight, sendMessage, images, editImage, showBarCode }) => {

    const [showMore, setShowMore] = useState(true)
    const toggleShow = () => {
        setShowMore(!showMore)
    }

    return (
        <div className="intro-y col-span-12 md:col-span-6 lg:col-span-4">
            <div className="box">
                <div className="flex items-start px-5 pt-5">
                    <div className="w-full flex flex-col lg:flex-row items-center">
                        <div className="w-16 h-16 image-fit">
                            <img alt="User Pic" className="rounded-full" src={images && images[0] ? `${BaseApi}${images[0]["720"]}` : "dist/images/profile-9.jpg"} />
                        </div>
                        <div className="lg:mr-4 text-right lg:text-right mt-3 lg:mt-0">
                            <p className="font-medium">{name}</p>
                            <div className="text-gray-600 text-xs mt-0.5">{mobile}</div>
                        </div>
                    </div>
                    <div className="absolute left-0 top-0 ml-5 mt-3 dropdown" data-placement="bottom-start">
                        <p style={{ cursor: "pointer" }} className="dropdown-toggle w-5 h-5 block"> <FaStream onClick={toggleShow} className="w-5 h-5 text-gray-600 dark:text-gray-300" /> </p>
                        <div className={showMore ? "dropdown-menu w-40" : "dropdown-menu w-40 dropDown-user"}>
                            <div className="dropdown-menu__content box dark:bg-dark-1 p-2 marginTopReset">
                                <p onClick={edit} className="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md" style={{ cursor: "pointer" }}> <FaUserEdit className="w-4 h-4 ml-2" /> ویرایش</p>
                                <p onClick={editImage} className="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md" style={{ cursor: "pointer" }}> <FaImage className="w-4 h-4 ml-2" /> ویرایش عکس </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center lg:text-right p-5">
                    <div className="flex items-center justify-center lg:justify-start text-gray-600 mt-2"> <FaUserAlt className="w-3 h-3 ml-2" /> نام : {name} </div>
                    <div className="flex items-center justify-center lg:justify-start text-gray-600 mt-1"> <FaMobileAlt className="w-3 h-3 ml-2" />موبایل : {mobile} </div>
                    <div className="flex items-center justify-center lg:justify-start text-gray-600 mt-1"> <FaWeight className="w-3 h-3 ml-2" />وزن : {weight ? weight : "-"}</div>
                    <div className="flex items-center justify-center lg:justify-start text-gray-600 mt-1"> <FaTextHeight className="w-3 h-3 ml-2" />قد : {height ? height : "-"} </div>
                    <div className="flex items-center justify-center lg:justify-start text-gray-600 mt-1"> <FaUserCheck className="w-3 h-3 ml-2" />سن : {age ? age : "-"} </div>
                </div>
                <div className="text-center lg:text-left p-5 border-t border-gray-200 dark:border-dark-5">
                    <button onClick={sendMessage} className="btn btn-primary py-1 px-2 ml-2">ارسال پیام</button>
                    <button onClick={showBarCode} className="btn btn-warning py-1 px-2">بارکد</button>
                </div>
            </div>
        </div>
    )
}

export default User