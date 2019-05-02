import React from 'react';
import {Redirect} from 'react-router-dom';

class InfoPatient extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      birth: '',
      gender: '',
      add: '',
      phone: '',
      insurance: '',
      redirect: false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.onChange = this.onChange.bind(this);
  }
onChange(e){
  this.setState({[e.target.name]:e.target.value});
}
  componentDidMount() { 
    var proxy = 'https://doanhttt.herokuapp.com/'
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
update_Page=()=>{
  this.setState({redirect: true});
}
  render() {
    if(this.state.redirect){
      return (<Redirect to="/patients/patient/update_Info"/>)
    }
    const { name, birth, gender, add, phone, insurance } = this.state;
    return (
     <div>
       <h2 className="title">Thông tin bệnh nhân</h2>
        <div className="medium-3 columns" id= "tt">
        <h6>Tên bệnh nhân:</h6>
        <input type="text" value={name} onChange={this.onChange} />
        <h6>Ngày sinh:</h6>
        <input type="text" value={birth} onChange={this.onChange} />
        <h6> Giới tính:</h6>
        <input type="text" value={gender} onChange={this.onChange} />
        <h6> Địa chỉ:</h6>
        <input type="text" value={add} onChange={this.onChange} />
        <h6>SĐT:</h6>
        <input type="text" value={phone} onChange={this.onChange} />
        <h6>Số thẻ bảo hiểm:</h6>
        <input type="text" value={insurance} onChange={this.onChange} />
        <div className="bt">
          <input type="submit" className="button success" value="Sửa" onClick={this.update_Page} />
        </div>
      </div>
     </div>
    );
  }
}

export default InfoPatient;
