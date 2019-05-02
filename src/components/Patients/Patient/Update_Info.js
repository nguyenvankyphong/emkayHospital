import React from 'react';
import Sidebar from "../../Sidebar/Sidebar";
import {Redirect} from 'react-router-dom';

class InfoPatient extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            birth: '',
            gender: '',
            add: '',
            phone: '',
            insurance: '',
            Arr: [],
            redirect: false,
            listSidebar: [{ text: "Home", path: "/patients/patient" },
            { text: "Lịch sử khám bệnh", path: "/register" },
            { text: "Lịch tái khám", path: "/patients/patient" },
            { text: "Đặt lịch khám", path: "/patients/patient" },
            { text: "Góp ý", path: "/patients/patient" }],
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({
            name: this.refs.name_BN.value,
            birth: this.refs.birth.value,
            gender: this.refs.gender.value,
            add: this.refs.add.value,
            phone: this.refs.phone.value,
        });
    }
    componentDidMount() {
        var proxy = 'https://doanhttt.herokuapp.com/'
        var id = sessionStorage.getItem('id_patient');
        var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/account/getBenhNhanById?idBenhNhan=' + id;
        fetch(proxy + apiadd, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'Token': sessionStorage.getItem('userData'),
            },
        })
            .then(response => response.json())
            .then(resData => {
                console.log(JSON.stringify(resData))
                console.log("id :" + id);
                this.setState({
                    name: resData.name,
                    birth: resData.birth,
                    gender: resData.gender,
                    add: resData.add,
                    phone: resData.phone,
                    insurance: resData.insurance
                });

            })
    }
    update_Page = () => {
        console.log("Gender" + this.state.gender);
        var Arr = [];
        Arr.push(this.state.phone);
        Arr.push(this.state.name);
        Arr.push(this.state.birth);
        Arr.push(this.state.gender);
        Arr.push(this.state.add);
        var proxy = 'https://doanhttt.herokuapp.com/'
        var id = sessionStorage.getItem('id_patient');
        var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/patient/updateInformation?idBenhNhan=' + id;
        fetch(proxy + apiadd, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'token': sessionStorage.getItem('userData'),
            },
            body: (JSON.stringify(Arr)),
        })
            .then(response => response.json())
            .then(resData => {
                this.setState({redirect: true})
            })

    }
    render() {
        const { gender,name, birth, add, phone, insurance } = this.state;
        if(this.state.redirect){
            return (<Redirect to="/patients/patient"/>)
        }
        return (
            <div>
                <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
                <div className="row" id="Body">
                    <h2 className="title">Cập nhật thông tin</h2>
                    <div className="medium-3 columns" id="tt">
                        <h6>Tên bệnh nhân:</h6>
                        <input type="text" value={name} ref="name_BN" onChange={this.handleChange} />
                        <h6>Ngày sinh:</h6>
                        <input type="text" value={birth} ref="birth" onChange={this.handleChange} />
                        <h6> Giới tính:</h6>
                        <select value={gender} onChange={this.handleChange} ref="gender">
                            <option key="0" value="0">Nam</option> 
                            <option key="1" value="1">Nữ</option>                           
                        </select>
                        <h6> Địa chỉ:</h6>
                        <input type="text" value={add} ref="add" onChange={this.handleChange} />
                        <h6>SĐT:</h6>
                        <input type="text" value={phone} ref="phone" onChange={this.handleChange} />
                        <h6>Số thẻ bảo hiểm:</h6>
                        <input type="text" value={insurance} ref="insurance" onChange={this.handleChange} />
                        <div className="bt">
                            <input type="submit" className="button success" value="Cập nhật" onClick={this.update_Page} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoPatient;
