import React from 'react';
import LoginPage from '../presentational/login.jsx';
import { bodySetup } from './signup.jsx';
import urls from './urls.js';
import { renderError, clearError } from './signup.jsx';
import { Checkers } from '../presentational/signup.jsx';

class LoginRender extends React.Component {
    constructor(props) {
        super(props);
        bodySetup();
    }
    render = () => {
        return (
            <LoginPage {...this.props} />
        );
    }
}
let handleClick = (data,props) => {
    if (Checkers.isEmptyOject(data)) {
        renderError('Please fill in the fields');
    } else if (Checkers.isMissingKey('email', data) || Checkers.isMissingValue('email', data)) {
        renderError('Please enter your email address');
    } else if (Checkers.isMissingKey('password', data) || Checkers.isMissingValue('password', data)) {
        renderError('Please enter your password');
    } else if (!Checkers.emailIsValid(data.email)) {
        renderError('The email address is not valid');
    } else {
        clearError();
        let loginHandler = new LoginHandler(data,props);
        loginHandler.postData();
    }
}
class LoginHandler {
    constructor(data,props) {
        this.data = data;
        this.props = props
    }
    postData = () => {
        fetch(urls.logInUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.data)
        }).then(response => response.json())
            .then(data => {
                if (data.code == 'authentication_failed') {
                    renderError(data.detail);
                }else{
                    this.props.history.push('/meetups');
                }
            });
    }
}
export { handleClick };
export default LoginRender;