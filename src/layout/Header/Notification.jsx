import React, { Fragment, useContext, useState } from 'react'
import { useEffect } from 'react'
import { getApi } from '../../services/api/globalApi'
import moment from 'jalali-moment'
import { context } from '../../context/context'

const Notification = () => {

    const showManage = useContext(context)

    const { notif, setNotif, setProfile } = showManage;


    const showToggle = () => {
        setNotif(!notif)
        setProfile(false)
    }

    const [message, setMessage] = useState("")

    const getMessageData = async () => {
        try {
            const { data } = await getApi({ path: "messages", params: { limit: 5 } })
            setMessage(data?.data?.docs)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMessageData()
    }, [])

    return (
        <Fragment>
            <div className="intro-x dropdown ml-4 sm:ml-6 dropDownBox">
                <div className="dropdown-toggle notification cursor-pointer" onClick={showToggle}>
                    {/* <i data-feather="bell" className="notification__icon dark:text-gray-300"></i> s */}
                    <img alt="Notification" src="dist/images/Notif.png" style={{ width: "30px" }} />
                </div>
                <div className={notif ? "notification-content pt-2 dropdown-menu show showNotification fixedMargin" : "notification-content pt-2 dropdown-menu"}>
                    <div className="notification-content__box dropdown-menu__content box dark:bg-dark-6">
                        <div className="notification-content__title"> پیام های اخیر </div>

                        {message?.length ?
                            message.map((item) => (
                                <div key={item?._id} className="cursor-pointer relative flex items-center mt-5">
                                    <div className="w-12 h-12 flex-none image-fit ml-1">
                                        <img alt="Icewall Tailwind HTML Admin Template" className="rounded-full" style={{ borderRadius: "50%", background: "#071a50" }} src={require('./../../assets/images/weight.png')} />
                                        {/* <div className="w-3 h-3 bg-theme-10 absolute left-0 bottom-0 rounded-full border-2 border-white"></div> */}
                                    </div>
                                    <div className="mr-2 overflow-hidden">
                                        <div className="flex items-center" style={{ width: "240px" }}>
                                            <a className="font-medium truncate ml-5">پیام باشگاه</a>
                                            <div className="text-xs text-gray-500 mr-auto whitespace-nowrap"> {item?.createdAt ? moment(item?.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD') : ""}</div>
                                        </div>
                                        <div className="w-full truncate text-gray-600 mt-0.5">
                                            {item?.message}
                                        </div>
                                    </div>
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

            {notif ?
                <div className='closeDropDown' onClick={() => setNotif(false)}>
                </div>
                : null}

        </Fragment>
    )
}

export default Notification