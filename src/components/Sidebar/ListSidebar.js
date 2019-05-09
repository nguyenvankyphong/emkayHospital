import {Redirect} from 'react-router-dom';
import React, {Component} from 'react';
import MailIcon from '@material-ui/icons/Mail';
import SearchIcon from '@material-ui/icons/Search';
import PersonAdd from '@material-ui/icons/PersonAdd';
import InputBase from '@material-ui/core/InputBase';
import Home from '@material-ui/icons/Home';
import Patient1 from '@material-ui/icons/History';
import Patient2 from '@material-ui/icons/CalendarToday';
import Patient3 from '@material-ui/icons/Comment';
import Recep1 from '@material-ui/icons/Create';
import Recep3 from '@material-ui/icons/Add';
import Recep4 from '@material-ui/icons/Receipt';
import Recep5 from '@material-ui/icons/Image';
import Admin1 from '@material-ui/icons/People';
import Admin2 from '@material-ui/icons/PeopleOutlineOutlined';
import Admin3 from '@material-ui/icons/LibraryAdd';


  var key = 0;

  if (window.location.pathname.includes("patients/patient")) {
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
  var icon = "";
  var listIcon = {};
  listIcon.home = <Home/>;
  listIcon.history= <Patient1 />;
  listIcon.book= <Patient2 />;
  listIcon.comment= <Patient3 />;
  listIcon.recep1= <Recep1 />;
  listIcon.recep3= <Recep3 />;
  listIcon.recep4= <Recep4 />;
  listIcon.recep5= <Recep5 />;
  listIcon.admin1= <Admin1 />;
  listIcon.admin2= <Admin2 />;
  listIcon.admin3= <Admin3 />;


  let listSidebar = [];
    switch (key) {
      case 1: listSidebar = [{text: "Home", path: "/patients", icon: listIcon.home}]
              break;
      case 2: listSidebar = [{ text: "Home", path: "/receptionist", icon: listIcon.home },
                            { text: "Tạo tài khoản", path: "/receptionist/register", icon: listIcon.recep1 },
                            { text: "Đặt lịch khám", path: "/receptionist/datLich", icon: listIcon.book },
                            { text: "Thêm khoản phí", path: "/receptionist/addKhoanPhi", icon: listIcon.recep3 },
                            { text: "Xuất hóa đơn", path: "/receptionist/xuatHoaDon", icon: listIcon.recep4 },
                            {text: "Tạo QR mới", path: "/receptionist/newqr", icon: listIcon.recep5}]
              break;
      case 3: listSidebar = [{text: "Home", path: "/doctor", icon: listIcon.home },
                            {text: "Lịch trực", path: "/doctor/lichtruc", icon: listIcon.book}]
              break;
      case 4: listSidebar= [{ text: "Home", path: "/admin", icon: listIcon.home },
                            { text: "Bác sĩ", path: "/admin/doctor", icon: listIcon.admin1 },
                            { text: "Lễ tân", path: "/admin/recep", icon: listIcon.admin2 },
                            { text: "Chuyên khoa", path: "/admin/chuyenKhoa", icon: listIcon.admin3 },
                            { text: "Phòng khám", path: "/admin/phongKham", icon: listIcon.recep4 }]
              break;
      case 5: listSidebar= [{ text: "Home", path: "/patients/patient", icon: listIcon.home },
                            { text: "Lịch sử khám bệnh", path: "/patients/patient/history", icon: listIcon.history },
                            { text: "Đặt lịch khám", path: "/patients/patient/dat_lich_kham", icon: listIcon.comment },
                            { text: "Góp ý", path: "/patients/patient/gopy", icon: listIcon.comment }]
              break;
      default:

  }

 export default listSidebar;
