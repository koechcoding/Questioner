import { BrowserRouter, Link, Swittch, Route } from "react-router-dom";
import React from 'react'
import SingupRender from './signup.jsx';
import LoginRender from './login.jsx';
import MeetupsRender from './meetups.jsx';

class NotFound extends React.Component {
    render=()=>{
        return(
            <div>OOps! No page like thah</div>
        );
    }
}
class Routes extends React.Component{
    render=()=>{
        return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact render={props => <SingupRender {...props} />} />
                <Route path="/login" exact render={props => <LoginRender {...props} />} />
                <Route path="/meetups" exact render={props => <MeetupsRender {...props} />} />
                <Route component={NotFopund} />
            </Switch>
        </BrowserRouter>
        );
    }
}
export default Routes;