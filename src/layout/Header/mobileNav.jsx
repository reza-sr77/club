import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Col } from "reactstrap";
import "./../../assets/css/mobileNav.css";
// import { InitialContext } from "./../../context/InitialContext";
import { FaHome, FaMoneyBillWaveAlt, FaMoneyCheck, FaRegCommentDots, FaRegComments, FaStream, FaThLarge, FaUserLock, FaUsersCog, FaUserTie } from "react-icons/fa";

const MobileNav = () => {
  // const { moonLight } = useContext(InitialContext);
  const [activeLink, setActiveLink] = useState({
    active1: false,
    active2: false,
    active3: true,
    active4: false,
    active5: false,
  });
  const location = useLocation();
  console.log(activeLink);
  // console.log(moonLight);
  useEffect(() => {
    switch (location.pathname) {
      case "/message-list":
        return setActiveLink({ activeLink, active1: true, active3: false });
      case "/fis-list":
        return setActiveLink({ activeLink, active2: true, active3: false });
      case "/":
        return setActiveLink({ activeLink, active3: true });
      case "/package-list":
        return setActiveLink({ activeLink, active4: true, active3: false });
      case "/profile":
        return setActiveLink({ activeLink, active5: true, active3: false });
      default:
        return setActiveLink({ activeLink, active3: true });

    }
  }, [location.pathname]);
  return (
    <>
      <Col className="d-block d-sm-none p-0 mx-0 mt-4">
        <div className="navigat flex justify-content-center">
          <ul>
            <li
              className={`list ${activeLink.active1 ? "active" : "remove"}`}
              onClick={() => {
                setActiveLink({ activeLink, active1: true, active3: false });
              }}
            >
              <Link to="/message-list">
                <span className="icon">
                  <FaRegCommentDots />{" "}
                </span>
                <span className="text">پیام ها</span>
              </Link>
            </li>
            <li
              className={`list ${activeLink.active2 ? "active" : "remove"}`}
              onClick={() => {
                setActiveLink({ activeLink, active2: true, active3: false });
              }}
            >
              <Link to="/fis-list">
                <span className="icon">
                  <FaMoneyBillWaveAlt />
                </span>
                <span className="text">فیس ها</span>
              </Link>
            </li>
            <li
              className={`list ${activeLink.active3 ? "active" : "remove"}`}
              onClick={() => {
                setActiveLink({ activeLink, active3: true });
              }}
            >
              <Link to="/">
                <span className="icon">
                  <FaHome />
                </span>
                <span className="text">داشبورد</span>
              </Link>
            </li>
            <li
              className={`list ${activeLink.active4 ? "active" : "remove"}`}
              onClick={() => {
                setActiveLink({ activeLink, active4: true, active3: false });
              }}
            >
              <Link to="/package-list">
                <span className="icon">
                  <FaThLarge />
                </span>
                <span className="text">پکیج ها</span>
              </Link>
            </li>
            <li
              className={`list ${activeLink.active5 ? "active" : "remove"}`}
              onClick={() => {
                setActiveLink({ activeLink, active5: true, active3: false });
              }}
            >
              <Link to="/profile">
                <span className="icon">
                  <FaUserTie />{" "}
                </span>
                <span className="text">پروفایل</span>
              </Link>
            </li>
            {/* <div className={`hover ${!moonLight && "dark-mode"}`}></div> */}
          </ul>
        </div>
      </Col>
    </>
  );
};

export default MobileNav;