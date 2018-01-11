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
      profileUrl: '',
    }
    this.consoleState = this.consoleState.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.showToast = this.showToast.bind(this);
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
          profileUrl: res.data.profileUrl
        })
        console.log('Pre-fetching user data... \nServer response:', res)
      })
      .then(() => {
        this.props.setName(this.state.firstname, this.state.lastname);
      })
      .catch((e) => {
        console.error('Could not fetch user data...', e);
      })
  }

  consoleState() {
    console.log('info being sent to db:', this.state);
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  showToast() {
    Materialize.toast('User Info Updated!', 3000, 'rounded');
  }

  updateUserInfo() {
    const payload = {
      info: this.state,
      email: this.props.currentUser.email,
    }
    axios.put('/users/update', payload)
      .then((response) => {
        console.log('User data updating... \nServer response:', response.data);
        this.showToast();
      })
      .catch((e) => {
        console.log('User data was not sent to db for update', e)
      })
  }

  render() {
    return (
      <div id="userProfile" className="scrollable">
      <h1 className="header center teal-text text-lighten-2">User Profile</h1>
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
                <label htmlFor="firstname" className="active">First Name</label>
              </div>

              <div className="input-field col s6">
                <input
                  placeholder={this.state.lastname}
                  name="lastname"
                  type="text"
                  className="validate"
                  onChange={this.onChangeHandler}
                />
                <label htmlFor="lastname" className="active">Last Name</label>
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
                <label htmlFor="address" className="active">Address</label>
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
                <label htmlFor="dogname" className="active">Dog Name</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <textarea
                  placeholder={this.state.dogbio}
                  name="dogbio"
                  type="text"
                  className="materialize-textarea"
                  onChange={this.onChangeHandler}
                ></textarea>
                <label htmlFor="dogbio" className="active">Dog Bio</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder='Insert link to profile url'
                  name="profileUrl"
                  type="text"
                  className="validate"
                  onChange={this.onChangeHandler}
                />
                <label htmlFor="profileUrl" className="active">Profile Image</label>
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