import React from 'react';
import Sidebar from "../Sidebar/Sidebar";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class InfoPatient extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      birth: '',
      gender: '',
      add: '',
      phone: '',
      insurance: ''
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleGender = this.handleGender.bind(this);
  }

  componentDidMount() {
    var proxy = 'https://cors-anywhere.herokuapp.com/'
    var id= sessionStorage.getItem('id_patient');
    var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/account/getBenhNhanById?idBenhNhan='+id;
    fetch(proxy+apiadd,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Origin': '',
          'Token' : sessionStorage.getItem('userData'),
        },
    })
    .then(response =>  response.json())
    .then(resData => {
       console.log(JSON.stringify(resData))
       console.log("id :"+id);
       this.setState({
        name: resData.name,
        birth:  resData.birth,
        gender: this.handleGender(resData.gender),
        add: resData.add,
        phone: resData.phone,
        insurance: resData.insurance
    });

    })
}
handleGender(gender){
    if(gender){
        if(gender == '1'){
            return "Nữ"
        }else{
            return "Nam"
        }
    }

}

  render() {
    const{name,birth,gender,add,phone,insurance} = this.state;
    return (
      <Paper className="">
        <h1>Thông tin bệnh nhân</h1>
          <Table className="">
            <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">Tên bệnh nhân: {name}</TableCell>
                  <TableCell component="th" scope="row">Địa chỉ: {add}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Ngày sinh: {birth}</TableCell>
                  <TableCell component="th" scope="row">SĐT: {phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Giới tính: {gender}</TableCell>
                  <TableCell component="th" scope="row">Số thẻ bảo hiểm: {insurance}</TableCell>
                </TableRow>
            </TableBody>
          </Table>
      </Paper>
    );
  }
}

export default InfoPatient;
