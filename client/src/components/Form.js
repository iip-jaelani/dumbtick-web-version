import React, { Component } from "react";
import { loginUser } from '../_actions/Auth';
import "./Modal.css";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

class Form extends Component {
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
    const { isPost, res } = this.props.auth;

    if (isPost) {
      localStorage.setItem("AUTH_TOKEN", res.token);
      // window.location.replace("/");
    }
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <FormControl style={{ width: '100%' }}>
            <Input value={this.state.email} onChange={this.handleChangeEmail} style={{ color: 'white', borderBottom: '1.5px solid white', marginBottom: 30 }} id="input-with-icon-adornment" startAdornment={
              <InputAdornment position="start">
                <MailOutlineIcon />
              </InputAdornment>
            }
            />
            <Input value={this.state.password} onChange={this.handleChangePassword} type="password" style={{ color: 'white', borderBottom: '1.5px solid white', marginBottom: 30 }} id="input-with-icon-adornment" startAdornment={
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            }
            />
            <button type="submit" className="btn btn-warning">Continue</button>
          </FormControl>
        </form>

      </>
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
    loginUser: (user) => {
      dispatch(loginUser(user));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form);
