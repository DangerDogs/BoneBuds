import React, { Component } from "react";
import UserEventTile from "./UserEventTile.jsx";
import axios from 'axios';
import io from 'socket.io-client';

class UserEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    }
  }

  componentDidMount() {
    this.setState({
      events: this.props.events.filter(event => event.userID === this.props.user.uid),
    })
    const socket = io('/');
    socket.on('fetchAllEvents', data => {
      this.setState({
        events: data.filter(event => event.userID === this.props.user.uid)
      })
    })
  }

  render() {
    return (
      <div className="wrapper">
        <div className="scrollable">
          {this.state.events.map((event, index) => {
            return (
              <UserEventTile event={event} key={index} identifyEvent={this.props.identifyEvent}/>
            );
          })}
        </div>
      </div>
    );
  }
}

export default UserEvents;
