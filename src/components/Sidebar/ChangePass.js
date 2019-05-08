import React from 'react';
import Sidebar from "../Sidebar/Sidebar";
import {Redirect} from 'react-router-dom';
import { checkErrCode } from '../Layout/checkErrCode';

class Add extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password_old:'',
            password_new:'',
            repassword:'',
            redirect: false,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    change = () => {
      if(this.state.password_new == this.state.repassword){
        var arr=[];
        arr.push(this.state.password_old);
        arr.push(this.state.password_new);
        var proxy = 'https://doanhttt.herokuapp.com/'
        var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/account/update_pass';
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
                checkErrCode(resData.errCode);
                this.setState({redirect: true})
                console.log(resData.errCode);
                
            })
      }else{
          alert("Mật khẩu không khớp");
      }

    }
    render() {
        return (
            <div>
                <Sidebar listSidebar={JSON.parse(localStorage.listSidebar)} current_path={window.location.pathname} />
                <div className="row" id="Body">
                    <h2 className="title">Change password</h2>
                    <div className="medium-3 columns left">
                        <h6>Password cũ:</h6>
                        <input type="password" ref="password" name="password_old" onChange={this.handleChange} />
                        <h6>Password mới:</h6>
                        <input type="password" ref="password" name="password_new" onChange={this.handleChange} />
                        <h6>Nhập lại password:</h6>
                        <input type="password" ref="password" name="repassword" onChange={this.handleChange} />
                        <div className="bt">
                            <input type="submit" className="button success" value="Change" onClick={this.change} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Add;
