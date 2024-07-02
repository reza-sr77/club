import React from 'react'
import { FaDumbbell, FaList } from 'react-icons/fa'
import Profile from './Profile'
import Notification from './Notification'
import { useContext } from 'react'
import { context } from '../../context/context'
import MobailNav from './mobileNav';

const Header = () => {

    const showMenu = useContext(context)

    const { show, setShow } = showMenu;

    return (
        <div className="top-bar-boxed border-b border-theme-2 -mt-7 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 md:pt-0 mb-12 fixedHeader">
            <div className="h-full flex items-center">
                <p className="-intro-x hidden md:flex">
                    <FaDumbbell size="28px" color='#fff' src="dist/images/logo.svg" />
                    <span className="text-white text-lg mr-3 adjust "> باشگاه فرهنگی ورزشی دنیا<span className="font-medium"></span> </span>
                </p>
                <p onClick={() => setShow(!show)} className="-intro-x md:hidden cursor-pointer">
                    <FaList size="28px" color='#fff' src="dist/images/logo.svg" />
                </p>
                <div className="-intro-x breadcrumb ml-auto"> <a href="">  </a> <i data-feather="chevron-left" className="breadcrumb__icon"></i> <a href="" className="breadcrumb--active"></a> </div>
                <Notification />
                <Profile />
            </div>
            <MobailNav />
        </div>
    )
}

export default Header