import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      address: '',
      dogname: '',
      dogbio: '',
    }
    this.consoleState = this.consoleState.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
  }
  componentWillMount() {
    console.log(this.props.currentUser.uid)
    axios.get('/users/update/' + this.props.currentUser.uid)
      .then((res) => {
        this.setState({
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          address: res.data.address,
          dogname: res.data.dogname,
          dogbio: res.data.dogbio,
        })
        console.log('Pre-fetched user info:', res.data)
      })
  }

  consoleState() {
    console.log('info being sent to db:', this.state)
    console.log('passed down props:', this.props.currentUser)
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  updateUserInfo() {
    const payload = {
      info: this.state,
      email: this.props.currentUser.email,
    }
    axios.post('/users/update', payload)
      .then((response) => {
        console.log('User data sent to db for update. \nServer response:', response)
      })
      .catch((e) => {
        console.log('User data was not sent to db for update', e)
      })
  }

  render() {
    return (
      <div id="userPage">
        <Link to="userprofile"><i>Edit Profile</i></Link>
      </div>
    )
  }
}

export default UserPage;