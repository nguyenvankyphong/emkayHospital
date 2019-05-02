import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";

class Add_khoan_phi extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tenchiphi:'',
            donvitinh:'',
            dongia:'',
            soluongtonkho:'',
            redirectToReferrer: false,
            isRegistered: false,
            listSidebar: [{ text: "Home", path: "/receptionist" },
                        { text: "Tạo tài khoản", path: "/receptionist/register" },
                        { text: "Đặt lịch khám", path: "/receptionist/datLich" },
                        { text: "Thêm khoản phí", path: "/receptionist/addKhoanPhi" },
                        { text: "Xuất hóa đơn", path: "/receptionist/xuatHoaDon" },
                        {text: "Tạo QR mới", path: "/receptionist/newqr"}
                        ],
                            };
        this.onChange = this.onChange.bind(this);
        this.add = this.add.bind(this);
        this.convertTime = this.convertTime.bind(this);
    }

    componentWillMount() {

    }

    convertTime(created) {
        let date = new Date(created * 1000);
        return date;
    }

    add() {
        var Arr = [];
        Arr.push(this.state.tenchiphi);
        Arr.push(this.state.donvitinh);
        Arr.push(this.state.dongia);
        Arr.push(this.refs.type.value);
        Arr.push(this.state.soluongtonkho);

        var proxy = 'https://doanhttt.herokuapp.com/'
        fetch(proxy + 'http://168.61.49.94:8080/DOANHTTT/rest/bill/addService', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'token': sessionStorage.getItem('userData'),
            },
            body: JSON.stringify(Arr),
        })
            .then(response => response.json())
            .then(resData => {
                console.log("Thêm thành công");
            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handlereset=()=>{
        this.refs.tenchiphi.value= '';
        this.refs.donvitinh.value= '';
        this.refs.dongia.value= '';
        this.refs.soluongtonkho.value= '';
    }
    render() {
        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/login'} />)
        }
        return (
            <div>
                <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
                <div className="row" id="Body">
                    <div className="row" cid="Body">
                        <div className="medium-4 columns left">
                            <h1>Thêm khoản phí</h1>
                            <label>Tên chi phí</label>
                            <input type="text" ref="tenchiphi" name="tenchiphi" placeholder="Tên chi phí" onChange={this.onChange} />

                            <label>Đơn vị tính</label>
                            <input type="text" ref="donvitinh" name="donvitinh" placeholder="Đơn vị tính" onChange={this.onChange} />

                            <label>Đơn giá</label>
                            <input type="text" ref="dongia" name="dongia" placeholder="Đơn giá" onChange={this.onChange} />
                            <label>Hình thức</label>
                            <select name="type"  onChange={this.onChange} ref="type">
                                <option key="0" value="1">Dịch vụ</option>
                                <option key="1" value="2">Thuốc</option>
                            </select>
                            <label>Số lượng tồn kho</label>
                            <input type="text" ref="soluongtonkho" name="soluongtonkho" placeholder="Số lượng tồn kho" onChange={this.onChange} />                          
                            <div className="bt">
                                <input type="submit" className="button success" value="Thêm" onClick={this.add} />
                                <input type="reset" className="button reset" value="Nhập lại" onClick={this.handlereset} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Add_khoan_phi;
