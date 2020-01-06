import React, { Component } from "react";
import "./Modal.css";
import { withRouter } from "react-router";
//
import { connect } from "react-redux";
import { registerUser } from '../_actions/Auth';

class Modalregister extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: ''
    }
  }

  componentWillMount() {
    this.props.registerUser();

  }

  handleChangeUsername = event => {
    this.setState(
      {
        username: event.target.value
      }
    )
  }

  handleChangePassword = event => {
    this.setState(
      {
        password: event.target.value
      }
    )
  }

  handleChangeEmail = event => {
    this.setState(
      {
        email: event.target.value
      }
    )
  }

  handlePost = event => {
    event.preventDefault();
    const input = {
      name: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    this.props.registerUser(input)
  }

  render() {
    const { isPost, res } = this.props.auth;

    if (isPost) {
      const token = res.token
      localStorage.setItem("AUTH_TOKEN", token);
      window.location.replace("/");
    }
    return (
      <div className="modal fade modal-lg" id="modal-register" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog bg-danger" role="document">
          <div className="modal-content bd-danger">
            <div className="modal-header  bg-danger">
              <h5 className="modal-title text-white" id="exampleModalLabel">Register</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form>
              <div className="modal-body bg-danger">
                <input value={this.state.username} onChange={this.handleChangeUsername} type="text" className="form-control mb-3" placeholder="uername" aria-label="Username" />
                <input value={this.state.password} onChange={this.handleChangePassword} type="text" className="form-control mb-3" placeholder="password" aria-label="password" />
                <input value={this.state.email} onChange={this.handleChangeEmail} type="text" className="form-control" placeholder="email" aria-label="email" />
              </div>
              <div className="modal-footer bg-danger">
                <button onClick={this.handlePost} type="submit" className="btn btn-warning">Continue</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = dispatch => {
  return {
    registerUser: (data) => {
      dispatch(registerUser(data));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Modalregister);
