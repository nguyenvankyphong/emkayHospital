import React from 'react';
import Sidebar from "../../Sidebar/Sidebar";
import { Redirect } from 'react-router-dom';
import {checkErrCode} from '../../Layout/checkErrCode';

class Add extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sdt: '',
            name: '',
            birth: '',
            insuarance: '',
            add: '',
            redirect: false,
            arr:[],
            listSidebar: [{ text: "Admin", path: "/admin" },
            { text: "Bác sĩ", path: "/admin/bacsi" },
            { text: "Lễ tân", path: "/admin/letan" },
            { text: "Chuyên khoa", path: "/admin/chuyenkhoa" },
            { text: "Phòng khám", path: "/admin/phongkham" },
            ],
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    componentWillMount() {
        var proxy = 'https://doanhttt.herokuapp.com/'
        var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/recip/getChuyenKhoa';
        fetch(proxy + apiadd, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'token': localStorage.getItem('userData'),
            },
        })
            .then(response => response.json())
            .then(resData => {
                checkErrCode(resData.errCode);
                console.log(JSON.stringify(resData))
                this.setState({ arr: resData.arr });

            })
    }
    add = () => {
        var Arr = [];
        Arr.push(this.state.sdt);
        Arr.push(this.state.name);
        Arr.push(this.refs.gender.value);
        Arr.push(this.refs.chuyenkhoa.value);
        console.log(Arr);
        var proxy = 'https://doanhttt.herokuapp.com/'
        var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/admin/addDoctor';
        fetch(proxy + apiadd, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'token': localStorage.getItem('userData'),
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
        const {arr} = this.state;
        if (this.state.redirect) {
            return (<Redirect to="/admin/bacsi" />)
        }
        return (
            <div>
                <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
                <div className="row" id="Body">
                    <h2 className="title">Thêm tài khoản bác sĩ</h2>
                    <div className="medium-3 columns left">
                        <h6>SĐT:</h6>
                        <input type="text" name="sdt" ref="phone" onChange={this.handleChange} />
                        <h6>Họ tên:</h6>
                        <input type="text" name="name" ref="name_BN" onChange={this.handleChange} />
                        <h6> Giới tính:</h6>
                        <select name="gender" onChange={this.handleChange} ref="gender">
                            <option key="0" value="0">Nam</option>
                            <option key="1" value="1">Nữ</option>
                        </select>
                        <h6>Chuyên khoa:</h6>
                        <select ref="chuyenkhoa" onChange={this.handleChange}>
                            {arr.map(row => (
                                <option key={row.idChuyenKhoa} value={row.idChuyenKhoa}>{row.tenChuyenkhoa}</option>
                            ))}
                        </select>
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
