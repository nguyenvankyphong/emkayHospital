import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from "../../Sidebar/Sidebar";
import {checkErrCode} from '../../Layout/checkErrCode';

class Lich_tai_kham extends Component {


    constructor(props) {
        super(props);

        this.state = {
            result: [],
            redirectToReferrer: false,
            value:'',
            listSidebar: [{ text: "Home", path: "/patients/patient" },
            { text: "Lịch sử khám bệnh", path: "/patients/patient/history" },
            { text: "Lịch tái khám", path: "/patients/patient/lich_tai_kham" },
            { text: "Đặt lịch khám", path: "/patients/patient/dat_lich_kham" },
            { text: "Góp ý", path: "/patients/patient/gopy" }],
        };
        this.componentWillMount = this.componentWillMount.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    componentWillMount() {
        var proxy = 'https://doanhttt.herokuapp.com/'
        var id = sessionStorage.getItem('id_patient');
        var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/patient/xemlichtaikham?idBenhNhan=' + id;
        fetch(proxy + apiadd, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'token': sessionStorage.getItem('userData'),
            },
        })
            .then(response => response.json())
            .then(resData => {
                checkErrCode(resData.errCode);
                console.log(JSON.stringify(resData))
                this.setState({
                    value: resData.value,
                    result: resData.result                    
                })
            })
    }
    render() {
        const { result,value } = this.state;
        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/login'} />)
        }
        if (value) {
            return (
                <div>
                    <Sidebar listSidebar ={this.state.listSidebar} current_path={window.location.pathname} />
                    <div className="row" id="Body">
                    <h2 className="title">Không có lịch tái khám</h2>
                </div>
                </div>
            );
        }else{
            return (
                <div>
                    <Sidebar listSidebar ={this.state.listSidebar} current_path={window.location.pathname} />
                    <div className="row" id="Body">
                        <div>
                            <h2 className="title">Lịch tái khám</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Tên phòng</th>
                                        <th>Số phòng</th>
                                        <th>Họ tên</th>
                                        <th>Ngày</th>
                                        <th>Buổi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.map((row, index) => (
                                        <tr>
                                            <td>{row.TenPhong}</td>
                                            <td>{row.SoPhong}</td>
                                            <td>{row.HoTen}</td>
                                            <td>{row.Ngay}</td>
                                            <td>{row.Buoi}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }

    }
}

export default Lich_tai_kham;
