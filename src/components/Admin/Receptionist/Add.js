import React from 'react';
import Sidebar from "../../Sidebar/Sidebar";
import { Redirect } from 'react-router-dom';

class Add extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sdt:'',
            name:'',
            birth:'',
            insuarance:'',
            add:'',
            redirect: false,
            listSidebar: [{ text: "Admin", path: "/admin" },
            { text: "Bác sĩ", path: "/admin/doctor" },
            { text: "Lễ tân", path: "/admin/recep" },
            { text: "Chuyên khoa", path: "/admin/chuyen_khoa" },
            { text: "Phòng khám", path: "/admin/phong_kham" },
            ],
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    add = () => {
        var Arr=[];
        Arr.push(this.state.sdt);
        Arr.push(this.state.name);
        Arr.push(this.state.birth);      
        Arr.push(this.refs.gender.value);
        Arr.push(this.state.insuarance);
        Arr.push(this.state.add);
        console.log(Arr);
        var proxy = 'https://doanhttt.herokuapp.com/'
        var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/admin/addRecep';
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
                this.setState({ redirect: true })
                console.log(resData.errCode)
            })

    }
    render() {
        if (this.state.redirect) {
            return (<Redirect to="/admin/recep" />)
        }
        return (
            <div>
                <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
                <div className="row" id="Body">
                    <h2 className="title">Thêm tài khoản lễ tân</h2>
                    <div className="medium-3 columns left">
                        <h6>SĐT:</h6>
                        <input type="text" name="sdt" ref="phone" onChange={this.handleChange} />
                        <h6>Họ tên:</h6>
                        <input type="text" name="name" ref="name_BN" onChange={this.handleChange} />
                        <h6>Ngày sinh:</h6>
                        <input type="text" name="birth" ref="birth" onChange={this.handleChange} />
                        <h6> Giới tính:</h6>
                        <select name="gender" onChange={this.handleChange} ref="gender">
                            <option key="0" value="0">Nam</option>
                            <option key="1" value="1">Nữ</option>
                        </select>
                        <h6>Số thẻ bảo hiểm:</h6>
                        <input type="text" name="insuarance" ref="insurance" onChange={this.handleChange} />
                        <h6> Địa chỉ:</h6>
                        <input type="text" name="add" ref="add" onChange={this.handleChange} />
                        <div className="bt">
                            <input type="submit" className="button success" value="Thêm" onClick={this.add} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Add;
