import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { getApi } from "../../services/api/globalApi";
import { useSelector } from "react-redux"
import moment from 'jalali-moment'

const UserDashboard = () => {

    const userData = useSelector(state => state)

    const [message, setMessage] = useState("")
    const getMesages = async () => {
        try {
            const { status, data } = await getApi({ path: "messages", params: { limit: 5 } })
            setMessage(data?.data)
            console.log(data.data.docs)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMesages()
    }, [])


    return (
        <Fragment>
            <div className="intro-y box mt-5">
                <div className="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200">
                    <h2 className="font-medium text-base ml-auto">
                        داشبورد
                    </h2>
                </div>

                {/* <div className="grid grid-cols-12 gap-6 mt-5"> */}
                <div className="startMessage">
                    <p> {userData?.name} عزیز به باشگاه فرهنگی ورزشی دنیا خوش آمدید</p>
                </div>
                {/* </div> */}
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

                                <div key={item?._id} className="alert alert-primary show mb-2" role="alert">
                                    <div className="flex items-center">
                                        <div className="font-medium text-lg">پیام باشگاه</div>
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
        </Fragment >


    )
}

export default UserDashboard