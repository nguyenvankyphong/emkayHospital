import React from 'react';
import Sidebar from "../../Sidebar/Sidebar";
import {Redirect} from 'react-router-dom';
import './Admin.css';

class Add extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password:'',
            username:'',
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
        var arr=[];
        arr.push(this.state.username);
        arr.push(this.state.password);
        var proxy = 'https://doanhttt.herokuapp.com/'
        var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/admin/addNewAdmin';
        fetch(proxy + apiadd, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'token': sessionStorage.getItem('userData'),
            },
            body: (JSON.stringify(arr)),
        })
            .then(response => response.json())
            .then(resData => {
                this.setState({redirect: true})
            })

    }
    render() {
        const {  } = this.state;
        if(this.state.redirect){
            return (<Redirect to="/admin"/>)
        }
        return (
            <div>
                <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
                <div className="row" id="Body">
                    <h2 className="title">Thêm admin mới</h2>
                    <div className="medium-3 columns left" id ="addAdmin">
                        <h6>Username:</h6>
                        <input type="text" ref="username" name="username" onChange={this.handleChange} />
                        <h6>Password:</h6>
                        <input type="text" ref="password" name="password" onChange={this.handleChange} />
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
