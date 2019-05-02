import React from 'react';
import Sidebar from "../../Sidebar/Sidebar";
import { Redirect } from 'react-router-dom';

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
    add = () => {
        var Arr = [];
        Arr.push(this.state.SoPhong);
        Arr.push(this.state.TenPhong);
        console.log(Arr);
        var proxy = 'https://doanhttt.herokuapp.com/'
        var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/admin/addLab';
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
            return (<Redirect to="/admin/phongKham" />)
        }
        return (
            <div>
                <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
                <div className="row" id="Body">
                    <h2 className="title">Thêm phòng khám</h2>
                    <div className="medium-3 columns left">
                        <h6>Tên Phòng:</h6>
                        <input type="text" name="TenPhong" onChange={this.handleChange} />
                        <h6>Số phòng:</h6>
                        <input type="text" name="SoPhong" onChange={this.handleChange} />
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
