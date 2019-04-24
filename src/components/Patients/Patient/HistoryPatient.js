import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';

class HistoryPatient extends React.Component {
  constructor(props){
    super(props);

    this.state = {
     result: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    var proxy = 'https://cors-anywhere.herokuapp.com/'
    var id= sessionStorage.getItem('id_patient');
    var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/recip/getDotKhamByIdBenhNhan?idBenhNhan='+id;
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
       console.log("His"+JSON.stringify(resData));
       console.log("idHis :"+id);
       this.setState({
        result: resData.result
    });

    })
}

  render() {
    const{result} = this.state;
    return (
      <Paper className="">
          <h1>Lịch sử khám bệnh</h1>
          <Table className="">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Thông tin bệnh</TableCell>
              <TableCell align="left">Ngày khám</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>


            <TableBody>
            {result.map(row => (
                <TableRow key = {row.IdHoSoDotKham}>
                  <TableCell component="th" scope="row" align="left">{row.IdHoSoDotKham}</TableCell>
                  <TableCell component="th" scope="row" align="left">{row.ThongTinBenh}</TableCell>
                  <TableCell component="th" scope="row" align="left">{row.NgayKham}</TableCell>
                  <TableCell component="th" scope="row" align="left">{row.Status}</TableCell>
                </TableRow>

          ))}
           </TableBody>
          </Table>
      </Paper>
    );
  }
}

export default HistoryPatient;
