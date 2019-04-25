import React from 'react';
import Sidebar from "../Sidebar/Sidebar";
import ReactDOM from 'react-dom';
import './AddCaKham.css';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

function add() {
    sessionStorage.setItem("Name", document.getElementsByName("userName")[0].value);
    ReactDOM.render(<Add_com2 />, document.getElementById("com2"))

}
class Add_com4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          bool: false,
          listCaKham: []
        };
    }
    addHS() {
        alert("xin chào");
    }
    componentDidMount() {
        var proxy = 'https://cors-anywhere.herokuapp.com/'
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
                console.log("Ca khám: "+JSON.stringify(resData))
                console.log("Token: " + sessionStorage.getItem('userData'))
                this.setState({ listCaKham: resData.result});

            })
    }
    render() {
        const props = this.props;
        const {listCaKham} = this.state;
        return (
            <div>
                <h4>Thêm hồ sơ khám bệnh</h4>
                <label>Chọn ca khám</label>
                {listCaKham.map(row =>(
                    <label>< Checkbox
                    name = "id"

                    color="primary"
                    />{row.TenPhong} -{row.Bacsi} - {row.ThongTinPhong}({row.dangCho})</label>
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

    addDK = () => {
        // var Arr = [];
        // Arr.push(sessionStorage.getItem('idPatient'));
        // Arr.push(this.refs.infor.value);
        // console.log("list: " + Arr);
        // var proxy = 'https://cors-anywhere.herokuapp.com/'
        // var userName = localStorage.getItem("userName");
        // fetch(proxy + 'http://168.61.49.94:8080/DOANHTTT/rest/recip/addDotKham', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'Origin': '',
        //         'Token': sessionStorage.getItem('userData'),
        //     },
        //     body: JSON.stringify(Arr),
        // })
        //     .then(response => response.json())
        //     .then(resData => {


        //     })
        ReactDOM.render(<Add_com4 /> , document.getElementById("com4"));
    }
    reset = () =>{
        this.refs.infor.value = '';
    }
    render() {
        return (
            <div>
                <h4>Thêm đợt khám</h4>
                <label>Thông tin bệnh</label>
                <input type="text" id="reset" ref="infor" name="ThongTinBenh" placeholder="ThongTinBenh" onChange={this.onChange} />
                <div className="bt">
                    <input type="submit" className="button" value="Add" onClick={this.addDK} />
                    <input type="submit" className="button" value="Reset" onClick={this.reset} />
                </div>
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
    }
    selectDK() {

        ReactDOM.render(<Add_com4 />, document.getElementById("com4"));
    }
    addDK = () => {
        this.setState({bool: true})
        ReactDOM.render(<Add_com3_add /> , document.getElementById("com3_add"));

    }
    componentDidMount() {
        var proxy = 'https://cors-anywhere.herokuapp.com/'
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
                this.setState({ listDotKham: resData.result});

            })
    }
    render() {
        const props = this.props;
        const {listDotKham} = this.state;
        return (
            <div>
                <h4>Chọn đợt khám</h4>
                <label>Đợt khám</label>
                <select name="idDotKham" onChange={this.onChange} ref="dotkham">
                    <option value="" disabled>Chọn đợt khám</option>
                    {listDotKham.map(row=>(
                        <option key={row.IdHoSoDotKham} value="">{row.ThongTinBenh}</option>
                     ))}
                </select>
                <div className="bt">
                    <input type="submit" disabled={this.state.bool} ref= "select" className="button" value="Add" onClick={this.selectDK} />
                    <input type="submit" className="button" value="Reset" onClick={this.reset} />
                </div>
                <a onClick= {this.addDK} >Thêm đợt khám</a>
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
            value: ''

        };
        this.onChange = this.onChange.bind(this);
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };
    select_patient = () => {
        sessionStorage.setItem('idBenhNhan',this.refs.select_patient.value);
        ReactDOM.render(<Add_com3_selsect />, document.getElementById("com3_select"));
    }
    componentDidMount() {
        var proxy = 'https://cors-anywhere.herokuapp.com/'
        var userName = localStorage.getItem("userName");
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
                console.log(JSON.stringify(resData))
                console.log("Token: " + sessionStorage.getItem('userData'))
                this.setState({ listBenhNhan: resData.listBenhNhan });

            })
    }

    render() {
        const { listBenhNhan } = this.state;
        return (
            <div>
                <h4>Chọn bệnh nhân</h4>
                <label>Tên bệnh nhân</label>
                <select name="idBenhNhan" onChange={this.onChange} ref="select_patient">
                    <option value="" disabled>Tên bênh nhân</option>
                    {listBenhNhan.map((row, index) => (
                        <option key={row.id} value={row.id}>{row.name}</option>
                    ))}
                </select>
                <div className="bt">
                    <input type="submit" className="button" value="Add" onClick={this.select_patient} />
                    <input type="submit" className="button" value="Reset" onClick={this.reset} />
                </div>
            </div>
        );
    }
};

class AddCaKham extends React.Component {
    reset= () =>{
        this.refs.someUser.value = '';
    }
    render() {
        return (
            <div>
                <div className="com1">
                    <div className="">
                        <label>Username</label>
                        <input type="text" ref="someUser" name="userName" placeholder="Username" onChange={this.onChange} />
                        <div className="bt">
                            <input type="submit" className="button success" value="Chọn" onClick={add} />
                            <input type="reset" className="button reset" value="reset" onClick={this.reset} />
                        </div>
                    </div><br></br><br></br>
                    <div id="com2">

                    </div>
                </div>
                <div className="com2">
                    <div id= "com3_select"></div><br></br>
                    <div id = "com3_add"></div>
                </div>
                <div className="com3" id="com4">

                </div>
                <div className="clear"></div>
            </div>

        );
    }
};

export default AddCaKham;
