import React, { Fragment, useRef, useState } from "react";
import { useEffect } from "react";
import { IoIosCloseCircle } from 'react-icons/io'
import { useLocation, useNavigate } from "react-router-dom";
import { getApi, putApi } from "../../../services/api/globalApi";
import { BaseApi } from '../../../services/config'
import ImageUploader from "react-images-upload";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/action/actions";
import Loading from "../Loading";
import ShowImageModal from "./ShowImageModal";


const ChangeImage = () => {

    const location = useLocation()

    const navigator = useNavigate()

    const dispatch = useDispatch()

    const userId = useSelector(state => state._id)

    const [loading, setLoading] = useState(false)

    const [data, setData] = useState(null)
    const [userImages, setUserImages] = useState(null);

    const myRef = useRef();

    const getUserDataById = async () => {
        try {
            const { data, status } = await getApi({ path: `users/${location?.state?._id}` || "" })
            setData(data?.data)

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getUserDataById()
    }, [])


    const showDeleteModal = async (id) => {
        Swal.fire({
            text: "آیا شما مطمئن به حذف عکس هستید؟",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "کنسل",
            confirmButtonText: 'بله، آن را حذف کن!',
            preConfirm: async () => {
                const body = new FormData;
                console.log(id)
                body.append("removeImages[]", [id])
                try {
                    const { status, data } = await putApi({ path: `users/${location?.state?._id}/images`, body })
                    if (status === 200) {
                        toast.success("عکس با موفقیت حدف شد .", {
                            position: "top-right",
                            closeOnClick: true
                        });
                        if (userId === location?.state._id) {
                            dispatch(setUser(data.data));
                        }
                        getUserDataById()
                    }
                } catch (error) {
                    console.log(error)
                }


            }
        })
    }

    const addPicture = async () => {
        const body = new FormData();
        userImages?.map((image) => {
            body.append("images", image);
        });
        setLoading(true)

        try {
            const { status, data } = await putApi({ path: `users/${location?.state?._id}/images`, body })
            getUserDataById()
            // if (userId === location?.state._id) {
            //     dispatch(setUser(data.data));
            //     navigator("/profile")
            // } else {
            //     navigator("/user-list")
            // }
            myRef.current.state.files = [];
            myRef.current.state.pictures = [];
            setUserImages([])

            if (status === 200) {
                toast.success("عکس با موفقیت آپدیت شد .", {
                    position: "top-right",
                    closeOnClick: true
                });
                setLoading(false)

            }
        } catch (error) {
            console.log(error)
            setLoading(false)

        }

    }


    const imageChildRef = useRef()

    const [userImage, setUserImage] = useState(false)
    const showUserImage = (item) => {
        setUserImage(item)
        imageChildRef.current.showModal()
    }

    return (
        <Fragment>
            <div className="grid grid-cols-1">
                <ShowImageModal userImage={userImage} ref={imageChildRef} />
                <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
                    <h2 class="text-lg font-medium ml-auto">
                        تصاویر ({location?.state?.name})
                    </h2>
                    {loading && <Loading />}

                </div>

                <div class="intro-y grid grid-cols-12 gap-6 mt-5">

                    {data?.images.length ?
                        <Fragment>
                            {data?.images.map((item) => (
                                <div class="intro-y col-span-12 md:col-span-6 xl:col-span-4 box">
                                    <div>{console.log(item)}</div>
                                    <div class="p-5">
                                        <div class="h-40 xxl:h-56 image-fit">
                                            <img onClick={() => showUserImage(item)} alt="UserImage" class="rounded-md" src={`${BaseApi}${item["720"]}`} />
                                        </div>
                                    </div>
                                    <div className="deleteImg">
                                        <IoIosCloseCircle onClick={() => showDeleteModal(item?._id)} size="30px" color="rgb(255 0 0)" />
                                    </div>
                                </div>
                            ))}
                        </Fragment>
                        :
                        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                            <p className="w-full truncate text-gray-600 mt-0.5">
                                عکسی برای نمایش وجود ندارد
                            </p>
                        </div>}

                </div>

            </div>

            <div className="intro-y box  mt-4">
                <div className="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5">
                    <h2 className="font-medium text-base ml-auto">
                        افزودن عکس
                    </h2>
                </div>
                <form>
                    <div id="vertical-form" className="p-5">
                        <div className="col-span-12 sm:col-span-6">

                            <ImageUploader
                                name="imageInput"
                                type="file"
                                withIcon={true}
                                withPreview={true}
                                buttonText="انتخاب عکس"
                                label="png - gif - jpg حداکثر حجم عکس 1 مگابایت | فرمت عکس ها "
                                fileSizeError="حجم عکس بیش از حد مجاز است"
                                fileTypeError="فرمت  عکس پشتیبانی نمیشود."
                                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                maxNumber="5"
                                ref={myRef}
                                onChange={(e) => {
                                    console.log(e);
                                    setUserImages(e);
                                }}
                                maxFileSize={5242880}
                            />
                        </div>
                    </div>
                    <div className="modal-footer text-right">
                        <button onClick={addPicture} type="button" className="btn btn-primary w-30" > ارسال عکس </button>
                    </div>
                </form>

            </div>

        </Fragment>

    )
}

export default ChangeImage