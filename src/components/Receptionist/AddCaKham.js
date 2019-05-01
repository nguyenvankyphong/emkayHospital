import React from 'react';
import Sidebar from "../Sidebar/Sidebar";
import ReactDOM from 'react-dom';
import './AddCaKham.css';
import Checkbox from '@material-ui/core/Checkbox';

function FormError(props) {
    /* nếu isHidden = true, return null ngay từ đầu */
    if (props.isHidden) { return null; }

    return (<div>{props.errorMessage}</div>)
}
const validateInput = (checkingText) => {

    const regexp = /^\d{0}$/; 
    if (regexp.exec(checkingText) == null) {
    //if (checkingText !== null) {
        return {
            isInputValid: true,
            errorMessage: ''
        };
    } else {
        return {
            isInputValid: false,
            errorMessage: 'Vui lòng nhập dữ liệu đầy đủ'
        };
    }
}
class Add_com4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bool: false,
            listCaKham: [],
            checkB: [],
            object: {},
            idDotKham: '',
            list: [],
        };
    }
    addHS = (e) => {
        var Arr = [];
        if (localStorage.getItem("listID").length != 0) {
            var idDotKham = localStorage.getItem("idDotKham");
            console.log(JSON.parse(localStorage.getItem("listID")));
            var listCaKham = JSON.parse(localStorage.getItem("listID")).join("-");
            Arr.push(idDotKham);
            Arr.push(listCaKham);

            var proxy = 'https://doanhttt.herokuapp.com/'
            fetch(proxy + 'http://168.61.49.94:8080/DOANHTTT/rest/recip/themHoSo', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Origin': '',
                    'Token': sessionStorage.getItem('userData'),
                },
                body: JSON.stringify(Arr),
            })
                .then(response => response.json())
                .then(resData => {
                    console.log("Thêm thành công");
                })
        } else {
            alert("Vui lòng chọn ca khám");
        }
    }
    componentDidMount() {

        var proxy = 'https://doanhttt.herokuapp.com/'
        fetch(proxy + 'http://168.61.49.94:8080/DOANHTTT/rest/recip/getCaKham', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'Token': sessionStorage.getItem('userData'),
            },
        })
            .then(response => response.json())
            .then(resData => {
                console.log("Ca khám: " + JSON.stringify(resData))
                console.log("Token: " + sessionStorage.getItem('userData'))
                this.setState({ listCaKham: resData.result });

            })
    }
    componentWillMount() {

    }
    handleChangeCheckbox = (s) => {
        var checks = document.getElementsByName("check");
        var list = [];
        for (let i = 0; i < s; i++) {
            if (checks[i].checked == true) {
                list.push(checks[i].value);
            }
        }

        localStorage.setItem("listID", JSON.stringify(list));
    }

    render() {
        const props = this.props;
        const { listCaKham } = this.state;
        return (
            <div>
                <h4>Thêm hồ sơ khám bệnh</h4>
                <label>Chọn ca khám</label>
                {listCaKham.map(row => (
                    <label key={row.idCaKham}>< Checkbox
                        value={row.idCaKham}
                        name="check"
                        onChange={() => this.handleChangeCheckbox(listCaKham.length)}
                        color="primary"
                    />{row.TenPhong} - {row.Bacsi} - {row.ThongTinPhong}({row.dangCho})</label>
                ))}

                <div className="bt">
                    <input type="submit" className="button" value="Add" onClick={this.addHS} />
                    <input type="submit" className="button" value="Reset" onClick={this.reset} />
                </div>
            </div>
        );
    }
};
class Add_com3_add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bool: false,
        };
    }
    addDK = () => {
        var Arr = [];
        Arr.push(sessionStorage.getItem('idBenhNhan'));
        Arr.push(this.refs.infor.value);
        console.log("list: " + Arr);
        var proxy = 'https://doanhttt.herokuapp.com/'
        var userName = localStorage.getItem("userName");
        fetch(proxy + 'http://168.61.49.94:8080/DOANHTTT/rest/recip/addDotKham', {
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
            })

        ReactDOM.render(<Add_com3_selsect />, document.getElementById("com3_select"));
    }
    reset = () => {
        this.refs.infor.value = '';
    }
    selectDK = () => {
        this.setState({ bool: true });
        ReactDOM.render(<Add_com3_selsect />, document.getElementById("com3_select"));
    }
    render() {
        return (
            <div>
                <h4>Thêm đợt khám</h4>
                <label>Thông tin bệnh</label>
                <input type="text" id="reset" ref="infor" name="ThongTinBenh" placeholder="ThongTinBenh" onChange={this.onChange} />
                <div className="bt">
                    <input type="submit" disabled={this.state.bool} className="button" value="Thêm" onClick={this.addDK} />
                    <input type="submit" className="button" value="Reset" onClick={this.reset} />
                </div>
                <a onClick={this.selectDK} >Chọn đợt khám cũ</a>
            </div>
        );
    }
};
class Add_com3_selsect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bool: false,
            listDotKham: []
        };
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        console.log(this.refs.dotkham.value);
    }
    selectDK = () => {
        localStorage.setItem("idDotKham", this.refs.dotkham.value);
        ReactDOM.render(<Add_com4 />, document.getElementById("com4"));
    }
    componentDidMount() {
        var proxy = 'https://doanhttt.herokuapp.com/'
        var idBenhNhan = sessionStorage.getItem("idBenhNhan");
        fetch(proxy + 'http://168.61.49.94:8080/DOANHTTT/rest/recip/getDotKhamHopLeByIdBenhNhan?idBenhNhan=' + idBenhNhan, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'Token': sessionStorage.getItem('userData'),
            },
        })
            .then(response => response.json())
            .then(resData => {
                console.log(JSON.stringify(resData.result))
                console.log("Token: " + sessionStorage.getItem('userData'))
                this.setState({ listDotKham: resData.result });

            })
    }
    reset = () => {
        this.refs.dk.value = '';
    }
    render() {
        const props = this.props;
        const { listDotKham } = this.state;
        return (
            <div>
                <h4>Chọn đợt khám</h4>
                <label>Đợt khám</label>
                <select name="idDotKham" onChange={this.onChange} ref="dotkham">
                    <option value="0" >Chọn đợt khám</option>
                    {listDotKham.map(row => (
                        <option key={row.IdHoSoDotKham} value={row.IdHoSoDotKham} ref="dk">{row.ThongTinBenh}</option>
                    ))}
                </select>
                <div className="bt">
                    <input type="submit" ref="select" className="button" value="Chọn" onClick={this.selectDK} />
                </div>
            </div>
        );
    }
};
class Add_com2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            open: false,
            active_com2: false,
            listBenhNhan: [],
            idBenhNhan: '',

        };
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        this.setState({ selectValue: e.target.value });
        console.log(this.refs.select_patient.value);
    }
    select_patient = () => {
        sessionStorage.setItem('idBenhNhan', this.refs.select_patient.value);
        ReactDOM.render(<Add_com3_add />, document.getElementById("com3_add"));
    }
    componentDidMount() {
        this.setState({ listBenhNhan: JSON.parse(localStorage.getItem('listBenhNhanKham')) });
    }

    render() {
        const { listBenhNhan } = this.state;
        return (
            <div>
                <h4>Chọn bệnh nhân</h4>
                <label>Tên bệnh nhân</label>
                <select name="idBenhNhan" onChange={this.onChange} ref="select_patient">
                    <option value="0">Tên bênh nhân</option>
                    {listBenhNhan.map((row, index) => (
                        <option key={row.id} value={row.id}>{row.name}</option>
                    ))}
                </select>
                <div className="bt">
                    <input type="submit" className="button" value="Chọn" onClick={this.select_patient} />
                </div>
            </div>
        );
    }
};

class AddCaKham extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listBenhNhan: [],
            value: '',
            isInputValid: true,
            errorMessage: ''
        };
    }
    add = () => {

        var proxy = 'https://doanhttt.herokuapp.com/'
        var userName = this.refs.someUser.value;
        console.log(userName);
        fetch(proxy + 'http://168.61.49.94:8080/DOANHTTT/rest/account/getListBenhNhanByUserName?userName=' + userName, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'Token': sessionStorage.getItem('userData'),
            },
        })
            .then(response => response.json())
            .then(resData => {
                console.log(JSON.stringify(resData));
                this.setState({ listBenhNhan: resData.listBenhNhan })

                if (this.refs.someUser.value != '') {
                    if (JSON.stringify(resData.errCode) == 5) {
                        alert("Tài khoản của bạn không có trong danh sách đăng kí");
                    } else {
                        if (this.state.listBenhNhan.length == 0) {
                            alert("Bạn chưa đăng kí tài khoản khám bệnh");
                        } else {
                            localStorage.setItem('listBenhNhanKham', JSON.stringify(resData.listBenhNhan));
                            ReactDOM.render(<Add_com2 />, document.getElementById("com2"));
                            JSON.stringify(resData.listBenhNhan)
                        }
                    }
                } else {
                   alert("Vui lòng nhập username");
                }
            })
    }
    reset = () => {
        this.refs.someUser.value = '';
    }
    onChange = (event) => {
        const { value } = event.target;
        this.setState({ value });
    }
    handleInputValidation = (event) => {
        const { isInputValid, errorMessage } = validateInput(this.state.value);
        this.setState({
            isInputValid: isInputValid,
            errorMessage: errorMessage
        })
    }
    render() {
        return (
            <div>
                <div className="com1">
                    <div className="" id="com1">
                        <h4>Nhập Username</h4>
                        <label>Username</label>
                        <input 
                        type="text" 
                        ref="someUser" 
                        name="userName" 
                        placeholder="Username" 
                        onChange={this.onChange}
                        />
                     
                        <div className="bt">
                            <input type="submit" className="button success" value="Chọn" onClick={this.add} />
                            <input type="reset" className="button reset" value="reset" onClick={this.reset} />
                        </div>
                    </div><br></br><br></br>
                    <div id="com2">

                    </div>
                </div>
                <div className="com3">
                    <div id="com3_add"></div><br></br>
                    <div id="com3_select"></div>
                </div>
                <div className="com4" id="com4">

                </div>
                <div className="clear"></div>
            </div>

        );
    }
};

export default AddCaKham;
