import React from 'react';
import Sidebar from "../../Sidebar/Sidebar";
import { Redirect } from 'react-router-dom';
import {checkErrCode} from '../../Layout/checkErrCode';

class Add extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            TenPhong: '',
            SoPhong: '',
            redirect: false,
            listSidebar: [{ text: "Admin", path: "/admin" },
            { text: "Bác sĩ", path: "/admin/doctor" },
            { text: "Lễ tân", path: "/admin/recep" },
            { text: "Chuyên khoa", path: "/admin/chuyenKhoa" },
            { text: "Phòng khám", path: "/admin/phongKham" },
            ],
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

    }
    componentDidMount() {
        var idPhongKham = localStorage.getItem("idPhongKham");
        var proxy = 'https://doanhttt.herokuapp.com/'
        var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/admin/getLabById?idPhongKham='+idPhongKham;
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
                console.log(resData.errCode)
                this.setState({TenPhong: resData.arr[0].tenPhong,
                                SoPhong: resData.arr[0].SoPhong})
            })

    }
    edit = () => {
        var arr = [];
        console.log(this.state.TenPhong);
        arr.push(this.state.SoPhong);
        arr.push(this.state.TenPhong);
        console.log(arr);
        var idPhongKham= localStorage.getItem("idPhongKham");
        var proxy = 'https://doanhttt.herokuapp.com/'
        var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/admin/updateLab?idPhongKham='+idPhongKham;
        fetch(proxy + apiadd, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'token': localStorage.getItem('userData'),
            },
            body: (JSON.stringify(arr)),
        })
            .then(response => response.json())
            .then(resData => {
                this.setState({ redirect: true })
                console.log(resData.errCode)
            })

    }
    render() {
        const {TenPhong,SoPhong } = this.state;
        if (this.state.redirect) {
            return (<Redirect to="/admin/phongKham" />)
        }
        return (
            <div>
                <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
                <div className="row" id="Body">
                    <h2 className="title">Sửa phòng khám</h2>
                    <div className="medium-3 columns left">
                        <h6>Tên Phòng:</h6>
                        <input type="text" value={TenPhong} name="TenPhong" onChange={this.handleChange} />
                        <h6>Số phòng:</h6>
                        <input type="text" value={SoPhong} name="SoPhong" onChange={this.handleChange} />
                        <div className="bt">
                            <input type="submit" className="button success" value="Sửa" onClick={this.edit} />
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default Add;
