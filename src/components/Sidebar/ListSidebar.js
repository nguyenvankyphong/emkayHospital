import {Redirect} from 'react-router-dom';
import React, {Component} from 'react';
import MailIcon from '@material-ui/icons/Mail';
import Home from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import PersonAdd from '@material-ui/icons/PersonAdd';
import InputBase from '@material-ui/core/InputBase';

  var key = 0;

  if (window.location.pathname.includes("patients/patient")) {
    console.log("đúng 5");
    key = 5;
  } else if (window.location.pathname.includes("receptionist")) {
    key = 2;
  } else if (window.location.pathname.includes("doctor")) {
    key = 3;
  } else if (window.location.pathname.includes("admin")) {
    key = 4;
  } else if (window.location.pathname.includes("patients")) {
    key = 1;
  }

  var icon = <Home/>;
  let listSidebar = [];
    switch (key) {
      case 1: listSidebar = [{text: "Home", path: "/patients", icon: icon}]
              break;
      case 2: listSidebar = [{ text: "Home", path: "/receptionist", icon: icon },
                            { text: "Tạo tài khoản", path: "/receptionist/register", icon: icon },
                            { text: "Đặt lịch khám", path: "/receptionist/datLich", icon: icon },
                            { text: "Thêm khoản phí", path: "/receptionist/addKhoanPhi", icon: icon },
                            { text: "Xuất hóa đơn", path: "/receptionist/xuatHoaDon", icon: icon },
                            {text: "Tạo QR mới", path: "/receptionist/newqr", icon: icon}]
              break;
      case 3: listSidebar = [{text: "Home", path: "/doctor", icon: icon},
                            {text: "Lịch trực", path: "/doctor/lichtruc", icon: icon}]
              break;
      case 4: listSidebar= [{ text: "Admin", path: "/admin", icon: icon },
                            { text: "Bác sĩ", path: "/admin/doctor", icon: icon },
                            { text: "Lễ tân", path: "/admin/recep", icon: icon },
                            { text: "Chuyên khoa", path: "/admin/chuyenKhoa", icon: icon },
                            { text: "Phòng khám", path: "/admin/phongKham", icon: icon }]
              break;
      case 5: listSidebar= [{ text: "Home", path: "/patients/patient", icon: icon },
                            { text: "Lịch sử khám bệnh", path: "/patients/patient/history", icon: icon },
                            { text: "Lịch tái khám", path: "/patients/patient/lich_tai_kham", icon: icon },
                            { text: "Đặt lịch khám", path: "/patients/patient/dat_lich_kham", icon: icon },
                            { text: "Góp ý", path: "/patients/patient/gopy", icon: icon }]
              break;
      default:

  }

 export default listSidebar;
