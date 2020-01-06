import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getTicketPending } from "../_actions/user";
import Axios from 'axios';
const QRCode = require('qrcode.react');
//


class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'block'
    };
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.getTicketPending();
  }
  handleChange() {

  }

  render() {
    const { ticketNonConfirm } = this.props.profile;

    return (
      <>
        <Navbar />
        <div style={{ backgroundColor: '#F5B7B1', paddingTop: 50, paddingBottom: 50, minHeight: '100vh' }}>
          <Container maxWidth="md">
            <h3 style={{ marginTop: 60, marginBottom: 20, marginRight: '100%', color: '#C0392B' }}>Payment</h3>
            <div style={{ backgroundColor: 'red', width: '50%', padding: 10, marginBottom: '-20px', color: 'white', textAlign: 'center' }}>
              <p>Payment</p>
            </div>
            <Card style={{ minHeight: '100vh', marginBottom: '-100px' }} >
              {ticketNonConfirm.map(data => {
                return (
                  <CardActionArea >
                    <div style={{ backgroundColor: 'red', width: '100%', height: 5 }}></div>
                    <CardContent>
                      <div style={{ backgroundColor: 'red', width: 700, height: "100%", margin: 'auto', padding: 10 }}>
                        <div style={{ width: "100%", height: 60, backgroundColor: 'gray', padding: 10, display: 'flex' }}>
                          <div style={{ marginRight: 'auto' }}>
                            <p style={{ marginBottom: 1 }}>{data.user.name}</p>
                            <p>Id user</p>
                          </div>
                          <div>
                            <p style={{ marginBottom: 1 }}>Face Value Rp.{data.price}</p>
                            <p>Id: {data.id}</p>
                          </div>
                        </div>
                        <div style={{ width: "100%", height: 90, backgroundColor: 'white', display: 'flex', padding: 10 }}>
                          <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: "nowrap" }}>
                            <h3 style={{ marginBottom: 0 }}>{data.event.title}</h3>
                            <p style={{ marginBottom: 0 }}>{data.event.start_time} <span>18.00</span></p>
                            <p style={{ fontSize: 12 }}>{data.event.address}</p>
                          </div>
                          <div style={{ marginLeft: 'auto' }}>
                            <QRCode style={{ marginLeft: 20, width: 60, height: 60 }} value="https://www.facebook.com/ip.jailani" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <Container style={{ marginBottom: 100, display: 'block' }} maxWidth='sm'>
                      <p style={{ fontWeight: 'bold' }}>Shopping Summary</p>
                      <div style={{ display: 'flex' }}>
                        <p style={{ marginRight: 'auto' }}>Total price ({data.quantity} item)</p>
                        <p>Rp. {data.price}</p>
                      </div>
                      <hr />
                      <p style={{ fontWeight: 'bold' }}>Prove Of Payment</p>
                      <img style={{ width: 100 }} src='https://assets.revolut.com/media/business/payments/features/feature_5.svg' />
                      <p>Total price (2 item)</p>
                      <ButtonConfim orderId={data.id} />
                    </Container>
                  </CardActionArea>
                )
              })}
            </Card>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}
class ButtonConfim extends Component {
  confirm = (id) => (e) => {
    const token = localStorage.getItem('AUTH_TOKEN')
    Axios({
      method: 'PUT',
      url: `http://localhost:7000/order/${id}`,
      data: {
        status: 'cofirmed'
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  render() {
    return (
      <>
        <Button style={{ marginLeft: '100%' }} variant="contained" color="secondary" onClick={this.confirm(this.props.orderId)}>Confirm</Button>
      </>
    )
  }
}


const mapStateToProps = (state, getparam) => {
  return {
    profile: state.profile,
    id_ticket: getparam.match.params.id,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getTicketPending: id_ticket => {
      dispatch(getTicketPending(id_ticket));
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Payment)
);