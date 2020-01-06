import React, { Component } from "react";
import { loginUser } from '../_actions/Auth';
import "./Modal.css";
import { connect } from "react-redux";
import Form from './Form';
import Axios from "axios";



class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    this.props.loginUser();

  }

  handleChangeEmail = event => {
    this.setState(
      {
        email: event.target.value
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

  handleSubmit = event => {
    event.preventDefault();
    const input = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(input)
  }

  render() {
    const { auth } = this.props.auth
    return (
      <div className="modal fade" id="modal-login" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog bg-danger" role="document">
          <div className="modal-content bd-danger">
            <div className="modal-header  bg-danger">
              <h5 className="modal-title text-white" id="exampleModalLabel">Login</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="modal-body bg-danger">
                <Form />
              </div>
              <div className="modal-footer bg-danger">
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
    loginUser: () => {
      dispatch(loginUser());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
