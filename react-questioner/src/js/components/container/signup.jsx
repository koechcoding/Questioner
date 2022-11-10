
import SignUp,{ Checkers } from '../presentational/signup.jsx';
import React from 'react';
import urls from './urls.js';

let errorLogs = {};
class SingupRender extends React.Component {
    constructor(props) {
        super(props);
        bodySetup();
    }
    render = () => {
        return (
            <SignUp {...this.props} />
        );
    }
}
class EventHandler {
    constructor(data, props) {
        this.data = data;
        this.props = props;
    }
    handleClick = () => {
        let formHandler = new HandleFormData(this.data, this.props);
        formHandler.postData();
        return errorLogs;
    }
}
class HandleFormData {
    constructor(data, props) {
        this.props = props;
        this.Data = () => {
            let logs;
            if (!data) {
                logs = {};
                logs['invalidInput'] = 'Please fill in all the fields';
                let errorString = 'Please fill in all the fields';
                renderError(errorString);
            } else {
                logs = {};
                const fieldNames = [
                    'name',
                    'password',
                    'nick_name',
                    'email'
                ];
                for (let key of fieldNames) {
                    if (Checkers.isMissingKey(key, data) || Checkers.isMissingValue(key, data)) {
                        logs['invalidInput'] = 'Please fill in all the fields';
                        let errorString = 'Please fill in all the fields';
                        renderError(errorString);
                        break;
                    }
                    if (key == 'email') {
                        if (!Checkers.emailIsValid(data.email)) {
                            let errorString = 'The email address is not valid';
                            renderError(errorString);
                            logs['invalidEmail'] = 'The email address is not valid';
                            break;
                        }
                    }
                }
            }
            errorLogs = logs;
            return data;
        };
    }
    postData = () => {
        let data = this.Data();
        if (Checkers.isEmptyOject(errorLogs)) {
            clearError();
            fetch(urls.signupUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
                .then(data => {
                    let dataKeys = Object.keys(data);
                    if (dataKeys.includes('detail')) {
                        let errorString = data.detail;
                        renderError(errorString);
                    } else if (dataKeys.includes('password')) {
                        let errorString = data.password[0];
                        renderError(errorString);
                    } else {
                        fetch(urls.activationUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        }).then(res => {
                            this.props.history.push("/login");
                        });
                    }
                });
        }
    }
}
let renderError = (errorString) => {
    clearError();
    document.getElementById('error').innerHTML += `
    <div id='err-log'>
        <div class="alert alert-danger alert-dismissible fade show">
            <button type="button" class="close" data-dismiss="alert">&times;
            </button>
            <strong>
                ${errorString}
            </strong>
        </div>
    </div>
    `;
};
let clearError = () => {
    if (document.getElementById('err-log')) {
        document.getElementById('error').innerHTML = '';
    }
};
let bodySetup = () => {
    document.body.style.height = '100%';
    document.body.style.minHeight = '100%';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
};
export default SingupRender;
export { EventHandler, bodySetup, renderError, clearError };