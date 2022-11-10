import React from 'react';
import logo from './images/logo.png';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import { handleClick } from '../container/login.jsx';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick
    }
    handleChange = (event) => {
        let states = Object.assign(this.state);
        states[event.target.id] = event.target.value;
        this.setState(states);
    }
    clickLogIn = (event) => {
        event.preventDefault();
        handleClick(this.state, this.props);
    }
    render = () => {
        let fieldIds = {
            email: 'email',
            password: 'password'
        };
        return (
            <div className='container login-page'>
                <img src={logo}></img>
                <div className='login-error' id='error'></div>
                <div className='login-form'>
                    <input
                        type="email"
                        placeholder="Your email address"
                        id={fieldIds.email}
                        onChange={this.handleChange}
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Password"
                        id={fieldIds.password}
                        onChange={this.handleChange}
                    />
                    <br />
                    <button className='btn-primary login-btn' onClick={this.clickLogIn}>Login</button>
                </div>
            </div>
        );
    }
}
export default LoginPage;