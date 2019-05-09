import React from 'react';
import Sidebar from "../../Sidebar/Sidebar";
import { Redirect } from 'react-router-dom';

class Add extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            BacSiTruongKhoa:'',
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
        var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/admin/getDoctorByName?HoTen=';
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
                console.log(JSON.stringify(resData))
                this.setState({ arr: resData.arr ,BacSiTruongKhoa: localStorage.getItem("idBacSiTruongKhoa")});
                console.log(this.state.BacSiTruongKhoa);
            })
    }
    edit = () => {
        var idChuyenKhoa= localStorage.getItem("idChuyenKhoa")
        var proxy = 'https://doanhttt.herokuapp.com/'
        var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/admin/assignedDoctor?idChuyenKhoa='+idChuyenKhoa;
        fetch(proxy + apiadd, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'token': localStorage.getItem('userData'),
            },
            body: this.state.BacSiTruongKhoa,
        })
            .then(response => response.json())
            .then(resData => {
                this.setState({ redirect: true })
                console.log(resData.errCode)
            })

    }
    render() {
        const {arr,BacSiTruongKhoa} = this.state;
        if (this.state.redirect) {
            return (<Redirect to="/admin/chuyenkhoa" />)
        }
        return (
            <div>
                <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
                <div className="row" id="Body">
                    <h2 className="title">Sửa bác sĩ trưởng khoa</h2>
                    <div className="medium-3 columns left">
                        <h6>Bác sĩ trưởng khoa:</h6>
                        <select ref="bacsi" value={BacSiTruongKhoa} name="BacSiTruongKhoa" onChange={this.handleChange}>
                            {arr.map((row,index)=> (
                                <option key={index} value={row.idBacSi}>{row.HoTen}</option>
                            ))}
                        </select>
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
