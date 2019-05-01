import React from 'react';
import Sidebar from "../../Sidebar/Sidebar";
import {Redirect} from 'react-router-dom';

class Add extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password:'',
            redirect: false,
            listSidebar: [{ text: "Admin", path: "/admin" },
                        { text: "Bác sĩ", path: "/admin/doctor" },
                        { text: "Lễ tân", path: "/admin/recep" },
                        { text: "Chuyên khoa", path: "/admin/chuyen_khoa" },
                        { text: "Phòng khám", path: "/admin/phong_kham" },
                        ],
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    componentDidMount() {
        // var proxy = 'https://doanhttt.herokuapp.com/'
        // var id = sessionStorage.getItem('id_patient');
        // var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/account/getBenhNhanById?idBenhNhan=' + id;
        // fetch(proxy + apiadd, {
        //     method: 'GET',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'Origin': '',
        //         'Token': sessionStorage.getItem('userData'),
        //     },
        // })
        //     .then(response => response.json())
        //     .then(resData => {
        //         console.log(JSON.stringify(resData))
        //         console.log("id :" + id);
        //         this.setState({
        //             name: resData.name,
        //             birth: resData.birth,
        //             gender: resData.gender,
        //             add: resData.add,
        //             phone: resData.phone,
        //             insurance: resData.insurance
        //         });

        //     })
    }
    add = () => {
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
            body: (JSON.stringify(this.state.password)),
        })
            .then(response => response.json())
            .then(resData => {
                this.setState({redirect: true})
            })

    }
    render() {
        const { gender,name, birth, add, phone, insurance } = this.state;
        if(this.state.redirect){
            return (<Redirect to="/admin"/>)
        }
        return (
            <div>
                <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
                <div className="row" id="Body">
                    <h2 className="title">Thêm admin mới</h2>
                    <div className="medium-3 columns left">
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
