import React, { Suspense, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import meetupIcon from './images/society_icon_meetup.png';
import urls from '../container/urls.js';

class Meetups extends React.Component {
    constructor(props) {
        super(props);
        this.page = 1;
        this.pageLimit = 1;
        this.state = {};
    }
    componentDidMount() {
        fetch(urls.upcomingMeetups(1, 7), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                this.setState(data);
            });
    }
    renderMeetups = () => {
        let upcomingMeetups;
        let meetups = [];
        if (this.state.results) {
            upcomingMeetups = this.state.results;
            let renderTags = (tags, meetupid) => {
                let tagCards = [];
                if (tags) {
                    let tagCount = 0;
                    tags.map(tag => {
                        tagCount += 1;
                        tagCards.push(
                            <div
                                className='card small-card'
                                key={`tag${meetupid}${tagCount}`}>{tag}
                            </div>
                        );
                    });
                }
                return tagCards;
            }
            upcomingMeetups.map(meetup => {
                meetups.push(
                    <div className='card meetup-card' key={`card${meetup.id}`}>
                        <div className='card-header'>{meetup.title}</div>
                        <div className='card-body'>
                            <div className='meetup-icon'>
                                <img src={meetupIcon}></img>
                            </div>
                            {meetup.body}<br />
                            At: {meetup.location}<br />
                            Time: {meetup.scheduled_date}<br />
                            By: {meetup.creator.nick_name}<br /><br />
                            <strong>Attendance</strong><br />
                            <table className='table card-table'>
                                <tbody>
                                    <tr>
                                        <td>Yes</td>
                                        <td>No</td>
                                        <td>Maybe</td>
                                    </tr>
                                    <tr>
                                        <td>{meetup.rsvp_summary.yes}</td>
                                        <td>{meetup.rsvp_summary.no}</td>
                                        <td>{meetup.rsvp_summary.maybe}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='card-footer'>
                            <div className='tags'>
                                {renderTags(meetup.tags, meetup.id)}
                            </div>
                        </div>
                    </div>
                );
            });
        }
        return meetups;
    }
    render = () => {
        return (
            <div className='upcoming-body'>{this.renderMeetups()}</div>
        );
    }
}
export default Meetups;