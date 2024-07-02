import React, { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PayFisModal from "./PayFisModal";
import { putApi } from "../../services/api/globalApi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ShowUserImageModal from "./ShowUserImageModal";
import { BaseApi } from "../../services/config";
import ShowDetailModal from "./ShowDetailModal";

const ShowFis = ({
    newData,
    filterDataHandler,
    againGetData
}) => {

    console.log(newData)

    const childRef = useRef();
    const [fisData, setFisData] = useState()

    const payFis = (item) => {
        setFisData(item)
        childRef.current.showModal()
    }

    const showByPaid = (e) => {
        console.log(e)
        if (e === "0" || e === "1") {
            filterDataHandler({ paid: e })
        } else {
            filterDataHandler({ paid: "" })
        }
    }


    const showExtensionModal = async (item) => {
        Swal.fire({
            text: "آیا شما مطمئن به تمدید فیس هستید؟",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "کنسل",
            confirmButtonText: 'بله، آن را تمدید کن!',
            preConfirm: async () => {
                try {
                    const { status } = await putApi({
                        path: `fises/${item._id}/extension`
                    })
                    if (status === 200) {
                        toast.success("فیس با موفقیت تمدید شد", {
                            position: "top-right",
                            closeOnClick: true
                        });
                        againGetData()
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    const imageChildRef = useRef()

    const [userImage, setUserImage] = useState(false)
    const showUserImage = (item) => {
        setUserImage(item.user)
        imageChildRef.current.showModal()
    }




    const detailChildRef = useRef();

    const showDetail = (item) => {
        setFisData(item)
        detailChildRef.current.showModal()
    }


    return (
        <Fragment>
            <PayFisModal fisData={fisData} ref={childRef} reGetData={againGetData} />
            <ShowDetailModal fisData={fisData} ref={detailChildRef} />
            <ShowUserImageModal userImage={userImage} ref={imageChildRef} />
            <h2 className="intro-y text-lg font-medium mt-10">
                لیست فیس ها
            </h2>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
                    <Link to="/fis-add">
                        <button className="btn btn-primary shadow-md ml-2">افزودن فیس</button>
                    </Link>
                    {/* <div className="hidden md:block mx-auto text-gray-600">
                    </div> */}

                </div>
                <div className="flex sm:flex-row flex-col gap-2">
                    <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                        <div className="w-52 relative text-gray-700 dark:text-gray-300">
                            <input
                                type="text"
                                className="form-control w-52 box px-4 placeholder-theme-8"
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
                    
                    <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                        <div className="w-52 relative text-gray-700 dark:text-gray-300">
                            <input
                                type="text"
                                className="form-control w-52 box px-4 placeholder-theme-8"
                                placeholder="جستجو توسط نام ..."
                                onChange={(e) => (e.target.value.length > 2 ||
                                    e.target.value.length === 0) && filterDataHandler({ username: e.target.value, page: 1 })}
                            />
                            <i className="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0" data-feather="search"></i>
                        </div>
                    </div>

                    <div className="col-span-12 sm:col-span-6 marginTopSm" >
                        <select className="w-auto form-select" onChange={(e) => showByPaid(e.target.value)} name="status">
                            <option value="">همه</option>
                            <option value="1">پرداخت شده</option>
                            <option value="0">پرداخت نشده</option>
                        </select>
                    </div>
                </div>

                {newData?.docs?.length ?
                    <div className="intro-y col-span-12 overflow-auto lg:overflow-visible" style={{ overflowX: "scroll" }}>
                        <table className="table table-report -mt-2">
                            <thead>
                                <tr>
                                    <th class="whitespace-nowrap">تصویر</th>
                                    <th className="text-center whitespace-nowrap">نام کاربر</th>
                                    <th className="text-center whitespace-nowrap">موبایل</th>
                                    <th className="text-center whitespace-nowrap">مبلغ پکیج</th>
                                    <th className="text-center whitespace-nowrap">تخفیف</th>
                                    <th className="text-center whitespace-nowrap">مبلغ پرداخت شده</th>
                                    <th className="text-center whitespace-nowrap">مانده</th>
                                    <th className="text-center whitespace-nowrap">روز</th>
                                    <th className="text-center whitespace-nowrap">وضعیت</th>
                                    <th className="text-center whitespace-nowrap">فعالیت</th>
                                    <th className="text-center whitespace-nowrap">جزییات</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Fragment>
                                    {newData?.docs.map((item) => (

                                        <tr className="intro-x" key={item?._id}>
                                            <td class="w-40">
                                                <div class="flex">
                                                    <div onClick={() => showUserImage(item)} class="w-10 h-10 image-fit zoom-in">
                                                        <img alt="user image" class="tooltip rounded-full" src={item?.user?.images && item?.user?.images[0] ? `${BaseApi}${item?.user?.images[0]["720"]}` : "dist/images/preview-8.jpg"} title="تصویر مشتری" />
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="text-center">{item?.user?.name}</td>
                                            <td className="text-center">{item?.user?.mobile}</td>
                                            <td className="text-center">{item?.price}</td>
                                            <td className="text-center">{item?.discount}</td>
                                            <td className="text-center">{item?.paidPrice}</td>
                                            <td className="text-center">{item?.price - item?.paidPrice - item.discount}</td>
                                            <td className="text-center">{item?.days > 0 ?
                                                <span>{item?.days} روز مانده</span>
                                                : <span>{item?.days} روز گذشته</span>
                                            }</td>
                                            {item?.price - item?.paidPrice - item.discount === 0 ?
                                                <td className="text-center">
                                                    <div className="flex items-center justify-center text-theme-10">
                                                        پرداخت شده
                                                    </div>
                                                </td>
                                                :
                                                <td className="text-center">
                                                    <div className="flex items-center justify-center text-theme-24">
                                                        منتظر پرداخت
                                                    </div>
                                                </td>
                                            }
                                            <td className="table-report__action w-56">
                                                <div className="flex justify-center items-center">
                                                    <Link to="/fis-edit" state={item}>
                                                        <p className="flex items-center ml-3"> ویرایش</p>
                                                    </Link>
                                                    {item?.price - item?.paidPrice - item.discount !== 0 ?
                                                        <p onClick={() => payFis(item)} style={{ cursor: "pointer" }} className="flex items-center ml-3 text-theme-26" data-toggle="modal" data-target="#delete-confirmation-modal">  پرداخت </p>
                                                        // <i data-feather="trash-2" className="w-4 h-4 ml-1"></i>
                                                        : null}

                                                    {!item?.isExtension ?
                                                        <p onClick={() => showExtensionModal(item)} style={{ cursor: "pointer" }} className="flex items-center text-theme-21">تمدید </p>
                                                        : null}

                                                </div>
                                            </td>
                                            <td onClick={() => showDetail(item)} className="text-center cursor-pointer">مشاهده</td>

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

        </Fragment >
    )
}

export default ShowFis