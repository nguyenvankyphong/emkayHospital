import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';

export function checkErrCode(err) {
  switch (err) {
    case 0:
    console.log("success");
      break;
    case 1:
      console.log("lỗi 1");
      alert("Chuyên khoa không tồn tại");
      break;
    case 2:
      alert("Phiên làm việc hết hạn");
      console.log("2");
      localStorage.clear();
      localStorage.clear();
      window.location.pathname = '/login'
      break;
    case 3:
      console.log("lỗi 3");
      alert("Lỗi kết nối database");
      window.location.reload();
      break;
    case 4:
    alert("Giá trị đã tồn tại");
      console.log("lỗi 4");
      break;
    case 5:
      alert("Tài khoản không có trong danh sách");
      window.location.reload();
      break;
      case 6:
      console.log("lỗi 6");
      alert("Thông tin chưa đầy đủ");
      break;
      case 7:
      console.log("lỗi 7");
      alert("Lỗi");
      break;
      case 8:
      console.log("lỗi 8");
      alert("Sai username hoặc password");
      break;
      case 9:
      console.log("lỗi 9");
      alert("QR không được kết nối");
      break;
      case 10:
      console.log("lỗi 10");
      alert("Lỗi");
      break;
      case 11:
      
      break;
      case 12:
      console.log("lỗi 12");
      alert("Đã tồn tại");
      break;
      case 13:
      console.log("lỗi 13");
      alert("Hồ sơ khám bệnh không tồn tại");
      break;
      case 14:
      console.log("lỗi 14");
      alert("Mẫu hồ sơ không tồn tại");
      break;
      case 15:
      console.log("lỗi 15");
      alert("Góp ý không tồn tại");
      break;

    case 16:
      alert("Password không đúng");
      //window.location.reload();
      break;
      case 17:
      console.log("lỗi 17");
      alert("Lỗi");
      break;
    default:
  }
}
