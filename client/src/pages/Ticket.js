import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Navbar from '../components/Navbar';
import NavbarLogin from '../components/Navbarlogin';
import Footer from '../components/Footer';
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { getTicketApproved } from "../_actions/user";

const QRCode = require('qrcode.react');

class Ticket extends Component {
  componentDidMount() {
    this.props.getTicketApproved();
  }


  render() {
    const { ticketApproved } = this.props.profile;
    const token = localStorage.getItem('AUTH_TOKEN')
    let nav;
    if (token) {
      nav = <Navbar />
    } else {
      nav = <NavbarLogin />
    }

    return (
      <>
        {nav}
        <div style={{ backgroundColor: '#F5B7B1', paddingTop: 50, paddingBottom: 50, minHeight: '100vh' }}>
          <Container maxWidth="md">
            <h3 style={{ marginTop: 60, marginBottom: 20, marginRight: '100%', color: '#C0392B' }}>Ticket</h3>
            <Card style={{ minHeight: '100vh', marginBottom: '-100px' }} >
              <CardActionArea>
                <div style={{ backgroundColor: 'red', width: '100%', height: 5 }}></div>
                {ticketApproved.map(data => {
                  return (

                    <CardContent>
                      <div style={{ backgroundColor: 'red', width: 700, height: "100%", margin: 'auto', padding: 10 }}>
                        <div style={{ width: "100%", height: 60, backgroundColor: 'gray', padding: 10, display: 'flex' }}>
                          <div style={{ marginRight: 'auto' }}>
                            <p style={{ marginBottom: 1 }}>{data.user.name}</p>
                            <p>id:  {data.user.id}</p>
                          </div>
                          <div>
                            <p style={{ marginBottom: 1 }}>Face Value  Rp {data.price}</p>
                            <p>status Approved</p>
                          </div>
                        </div>
                        <div style={{ width: "100%", height: 90, backgroundColor: 'white', display: 'flex', padding: 10, marginRight: 'auto' }}>
                          <div style={{ marginRight: 10 }}>
                            <h3 style={{ marginBottom: 0 }}>{data.event.title}</h3>
                            <p style={{ marginBottom: 0 }}>{data.event.start_time} <span>18.00</span></p>
                            <p style={{ fontSize: 12 }}>{data.event.address}</p>
                          </div>
                          <div style={{ marginLeft: "auto" }}>
                            <QRCode style={{ marginLeft: 'auto', width: 60, height: 60 }} value="https://www.facebook.com/ip.jailani" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )
                })}
              </CardActionArea>
            </Card>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state, getparam) => {
  return {
    profile: state.profile,
    user_id: getparam.match.params.id,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getTicketApproved: user_id => {
      dispatch(getTicketApproved(user_id));
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Ticket)
);