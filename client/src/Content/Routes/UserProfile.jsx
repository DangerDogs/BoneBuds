import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UserProfile extends Component{
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
      <div id="userProfile">
        <h3>User Profile Page</h3>
        <button onClick={this.consoleState}>Show State</button>
        <Link to='/userpage'><button onClick={this.updateUserInfo}>Update user info</button></Link>

        <div className="row">
          <form className="col s12">

            <div className="row">
              <div className="input-field col s6">
                <input
                  placeholder={this.state.firstname}
                  name="firstname"
                  type="text"
                  className="validate"
                  onChange={this.onChangeHandler}
                />
                <label htmlFor="firstname">First Name</label>
              </div>

              <div className="input-field col s6">
                <input
                  placeholder={this.state.lastname}
                  name="lastname"
                  type="text"
                  className="validate"
                  onChange={this.onChangeHandler}
                />
                <label htmlFor="lastname">Last Name</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder={this.state.address}
                  name="address"
                  type="text"
                  className="validate"
                  onChange={this.onChangeHandler}
                />
                <label htmlFor="address">Address</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder={this.state.dogname}
                  name="dogname"
                  type="text"
                  className="validate"
                  onChange={this.onChangeHandler}
                />
                <label htmlFor="dogname">Dog Name</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder={this.state.dogbio}
                  name="dogbio"
                  type="text"
                  className="validate"
                  onChange={this.onChangeHandler}
                />
                <label htmlFor="dogbio">Dog Bio</label>
              </div>
            </div>

          </form>
        </div>
      </div>
    )
  }
}

export default UserProfile;

// <div class="row">
//   <div class="input-field col s12">
//     <input id="email" type="email" class="validate"/>
//     <label for="email" data-error="enter a valid password" data-success="Success!">Email</label>
//   </div>
// </div>