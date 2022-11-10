import React from 'react';
import Meetups from '../presentational/meetups.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import '../presentational/style.css';

class MeetupsRender extends React.Component {
    constructor(props) {
        super(props);
    }
    render = () => {
        return (
            <Meetups {...this.props} />
        );
    }
}
export default MeetupsRender;