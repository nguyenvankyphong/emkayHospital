import React from 'react';
import Sidebar from "../../Sidebar/Sidebar";
import { Redirect } from 'react-router-dom';
import { checkErrCode } from '../../Layout/checkErrCode';

class Add extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            arr: [],
            tenChuyenKhoa: '',
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
        this.setState({tenChuyenKhoa: localStorage.getItem("tenChuyenKhoa")})
    }
    edit = () => {
        var idChuyenKhoa= localStorage.getItem("idChuyenKhoa");
        var proxy = 'https://doanhttt.herokuapp.com/'
        var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/admin/updateSpecialist?idChuyenKhoa='+idChuyenKhoa;
        fetch(proxy + apiadd, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'token': localStorage.getItem('userData'),
            },
            body: this.state.tenChuyenKhoa,
        })
            .then(response => response.json())
            .then(resData => {
                this.setState({ redirect: true })
                console.log(resData.errCode)
            })

    }
    render() {
        const { tenChuyenKhoa } = this.state;

        if (this.state.redirect) {
            return (<Redirect to="/admin/chuyenkhoa" />)
        }
        return (
            <div>
                <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
                <div className="row" id="Body">
                    <h2 className="title">Sửa chuyên khoa</h2>
                    <div className="medium-3 columns left">
                        <h6>Tên chuyên khoa:</h6>
                        <input type="text" value={tenChuyenKhoa} name="tenChuyenKhoa" onChange={this.handleChange} />
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
