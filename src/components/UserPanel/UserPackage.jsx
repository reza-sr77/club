import React, { Fragment } from "react";
// import { Link } from "react-router-dom";

import { FaDumbbell } from 'react-icons/fa';

const UserPackage = ({ newData }) => {
    // console.log(newData)
    return (
        <div className="grid grid-cols-1 gap-6 mt-5">
            <div className="intro-y col-span-1 lg:col-span-6">
                <div className="intro-y flex items-center mt-8">
                    <h2 className="text-lg font-medium ml-auto">
                        نمایش پکیج
                    </h2>
                </div>

                {newData?.docs?.length ?
                    <div className="grid grid-cols-12 gap-5 mt-5 pt-5 border-t border-theme-25">
                        <Fragment>
                            {newData?.docs.map((item) => (
                                <p key={item?._id} data-target="#add-item-modal" className="intro-y block col-span-12 sm:col-span-4 xxl:col-span-3">
                                    <div className="box rounded-md p-3 relative zoom-in">
                                        <div className="flex-none pos-image relative block">
                                            <div className="pos-image__preview image-fit">
                                                <FaDumbbell size={"50px"} style={{ margin: "10px auto" }} alt="Icewall Tailwind HTML Admin Template" src="dist/images/food-beverage-17.jpg" />
                                            </div>
                                        </div>
                                        <div className="relative text-2xl font-semibold mt-8 mx-auto text-center"> {item?.name} </div>
                                        <div className="text-gray-700 dark:text-gray-600 text-center mt-5">
                                            {item?.options ?
                                                <Fragment>
                                                    {item?.options.map((option, index) => (
                                                        <Fragment key={index}>
                                                            {option}<span className="mx-1">
                                                                <br />
                                                            </span>
                                                        </Fragment>
                                                    ))}
                                                </Fragment> : ""}
                                        </div>

                                        <div className="flex justify-center">
                                            <div className="relative text-5xl font-semibold mt-8 mx-auto"> <span className="absolute text-2xl top-0 left-0 text-gray-600 -ml-4">افغانی</span> {item?.price} </div>
                                        </div>
                                        {/* <Link to="/package-edit" state={item} >
                                            <button type="button" className="btn btn-rounded-primary py-3 px-4 block mx-auto mt-8">ویرایش</button>
                                        </Link> */}
                                    </div>
                                </p>
                            ))}
                        </Fragment>
                    </div>
                    :
                    <p className="w-full truncate text-gray-600 mt-8">
                        دیتایی برای نمایش وجود ندارد
                    </p>
                }
            </div>
        </div>
    )
}

export default UserPackage