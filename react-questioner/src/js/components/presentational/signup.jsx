import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import { EventHandler } from '../container/signup.jsx';
import logo from './images/logo.png';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    handleChange = (event) => {
        let states = Object.assign({}, this.state);
        states[event.target.id] = event.target.value;
        this.setState(states);
    }
    handleClick = (event) => {
        event.preventDefault();
        let eventHandler = new EventHandler(this.getInputData(), this.props);
        eventHandler.handleClick();
    }
    getInputData = () => {
        let returnValue = null;
        if (!Checkers.isEmptyOject(this.state)) {
            returnValue = this.state;
        }
        return returnValue;
    }
    handleCancel = (event) => {
        event.preventDefault();
        this.props.history.push('/login');
    }
    render = () => {
        let fieldIds = {
            name: 'name',
            nickName: 'nick_name',
            email: 'email',
            password: 'password'
        };
        return (
            <div className={`flex-container`}>
                <LeftColumn />
                <div className={`right-column`}>
                    <button className='cancel-btn' onClick={this.handleCancel}>&times;</button>
                    <div className='logo'>
                        <img src={logo}></img>
                    </div>
                    <p className='title'>Welcome to meetups center</p>
                    <div className='error-log' id='error'></div>
                    <div className={`form`}>
                        <form>
                            <input type="text" placeholder="Your name"
                                value={this.state.value}
                                id={fieldIds.name}
                                onChange={this.handleChange}
                            />
                            <br />
                            <input
                                type="text"
                                placeholder="Your nick name"
                                value={this.state.value}
                                id={fieldIds.nickName}
                                onChange={this.handleChange}
                            />
                            <br />
                            <input type="email"
                                placeholder="Your email address"
                                value={this.state.value} id={fieldIds.email}
                                onChange={this.handleChange}
                            />
                            <br />
                            <input
                                type="password"
                                placeholder="Create a password"
                                value={this.state.value}
                                id={fieldIds.password}
                                onChange={this.handleChange}
                            />
                            <br />
                            <button
                                className={`btn-primary button`}
                                onClick={this.handleClick}>Sign Up
                                </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
let LeftColumn = () => {
    return (
        <div className='left-column'>
        </div>
    );
}
class Checkers {
    static isEmptyOject = (obj) => {
        let empty = true;
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                empty = false;
        }
        return empty;
    }
    static isMissingKey = (key, obj) => {
        return (!Object.keys(obj).includes(key));
    }
    static isMissingValue = (key, obj) => {
        let missingValue = true;
        if (obj[key]) {
            missingValue = false;
        }
        return missingValue;
    }
    static emailIsValid = (email) => {
        return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    }
}
export default SignUp;
export { Checkers };