import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Navbar from '../components/Navbar';
import NavbarLogin from '../components/Navbarlogin';
import Footer from '../components/Footer';
import DateRangeIcon from '@material-ui/icons/DateRange';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkIcon from '@material-ui/icons/Link';
import Hidden from '@material-ui/core/Hidden';
//
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { getEventWhiteId, orderEvent } from '../_actions/Events';
// getEventWhiteId dipangil ke bawah simpan di mapDispatchToProps

import './Event.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none',
      quantity: ''
    };
    this.handleOrder = this.handleOrder.bind(this);
    this.handleClick = this.handleClick.bind(this)
    this.handleEdit = this.handleEdit.bind(this);
  }
  componentDidMount() {
    //getEventWhiteId1 di ambil dari mapDispatchToProps
    this.props.orderEvent()
    this.props.getEventWhiteId(this.props.id_event);
  }
  //
  //
  handleEdit = (event) => {
    this.setState({ quantity: event.target.value })
  }
  //
  handleClick() {
    if (this.state.display === 'none') {
      this.setState(state => ({
        display: 'block'
      }));
    } else {
      this.setState(state => ({
        display: 'none'
      }));
    }
  }
  //
  handleOrder(event) {
    const dataOrder = {
      event_id: this.props.id_event,
      quantity: this.state.quantity
    }
    this.props.orderEvent(dataOrder)
    event.preventDefault()
  }
  //
  render() {
    const { isPost } = this.props.events;
    //events di ambil dari store
    const { eventDetail } = this.props.events;
    console.log(isPost);

    const token = localStorage.getItem('AUTH_TOKEN')
    let nav;
    console.log(token);
    if (token) {
      nav = <Navbar />
    } else {
      nav = <NavbarLogin />
    }

    //
    return (
      <>
        {nav}
        <div style={{ backgroundColor: '#F5B7B1', paddingTop: 50, paddingBottom: 50 }}>
          <Container maxWidth="md">
            <div>
              <Card style={{ backgroundColor: 'transparent' }}>
                <CardActionArea>
                  <img style={{ width: '100%' }} src={eventDetail.image} />
                  <CardContent>
                    {/* <div style={{ display: 'flex' }}> */}
                    <h3 style={{ marginRight: 'auto' }}>{eventDetail.title}</h3>
                    <h4 style={{ color: '#C0392B' }}> Rp. {eventDetail.price}</h4>
                    {/* </div> */}
                    <div style={{ display: 'flex' }}>
                      <p style={{ color: '#C0392B', marginRight: 'auto' }}>{eventDetail.name}</p>
                      <Button style={{ marginRight: 20 }} variant="contained" color="secondary" onClick={this.handleClick} >Order</Button>
                    </div>
                    {/* input order buy */}
                    <div style={{ display: this.state.display }} className='slideDown'>
                      <Button style={{ marginRight: 20 }} variant="contained" color="secondary" onClick={this.handleOrder}>Buy</Button>
                      <TextField id="outlined-basic" label="Quantity" variant="outlined" onChange={this.handleEdit} />
                    </div>
                    {/* end order */}
                    <hr />
                    <Grid container>
                      <Grid style={{ marginRight: 'auto', marginTop: 20 }} item lg={4} xs={12}>
                        <div>
                          <p style={{ fontWeight: 'bold' }}>Hosted By</p>
                          <div style={{ display: 'flex' }}>
                            <p style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', width: 80, fontSize: 20, textAlign: 'center', height: 80, paddingTop: 5 }}>JUNI <span style={{ fontWeight: 100 }}>consert</span></p>
                            <p style={{ marginTop: 25, marginLeft: 20, fontWeight: 100 }}>Juni consert</p>
                          </div>
                        </div>
                      </Grid>
                      <Grid style={{ marginRight: 'auto', marginTop: 20 }} item lg={4} xs={12}>
                        payment          <p style={{ fontWeight: 'bold' }}>Date & Time</p>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <p style={{ fontSize: 13 }}><DateRangeIcon /><span style={{ marginLeft: 10 }}>{eventDetail.startTime}</span> - <span>{eventDetail.endTime}</span></p>
                          <p style={{ fontSize: 13 }}> <QueryBuilderIcon /> <span style={{ marginLeft: 10 }}>20:29</span> - <span>01-00</span> WIB</p>
                        </div>
                      </Grid>
                      <Grid style={{ marginRight: 'auto', marginTop: 20 }} item lg={4} xs={12}>
                        <p style={{ fontWeight: 'bold' }}>Contact Person</p>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <p style={{ fontSize: 13 }}><ContactMailIcon /><span style={{ marginLeft: 10 }}>{eventDetail.nameUser}</span></p>
                          <p style={{ fontSize: 13 }}> <PhoneIcon /> <span style={{ marginLeft: 10 }}>{eventDetail.phone}</span></p>
                          <p style={{ fontSize: 13 }}> <EmailOutlinedIcon /> <span style={{ marginLeft: 10 }}>{eventDetail.email}</span></p>
                        </div>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
              <div style={{ marginTop: 50, textAlign: 'center' }}>
                <Grid container spacing={6}>
                  <Grid item lg={6}>
                    <h4 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Event descriptions</h4>
                    <p style={{ textAlign: 'justify' }}>{eventDetail.description}</p>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <h4 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Location</h4>
                    <p style={{ fontSize: 13 }}> <LocationOnOutlinedIcon /> <span style={{ marginLeft: 10 }}>{eventDetail.address}</span></p>
                    <iframe style={{ width: '100%', height: 300 }} src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15862.891199670808!2d106.73949719999999!3d-6.300108599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1577633325607!5m2!1sen!2sid"></iframe>
                    <h4 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 20, marginTop: 20 }}>Search Event</h4>
                    <Button style={{ marginRight: 20, backgroundColor: 'aqua', color: 'white', textTransform: 'none' }} variant="contained"><TwitterIcon /> Facebook</Button>
                    <Button style={{ marginRight: 20, backgroundColor: 'blue', color: 'white', textTransform: 'none' }} variant="contained"><FacebookIcon /> Facebook</Button>
                    <Button style={{ marginRight: 20, backgroundColor: 'gray', color: 'white', textTransform: 'none' }} variant="contained"><LinkIcon /> Facebook</Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}


const mapStateToProps = (state, getparam) => {
  return {
    //events dari store
    events: state.events,
    //id taruh di atas dalam {} fuction didmount
    id_event: getparam.match.params.id,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getEventWhiteId: id_event => {
      //getEventWhitId1 ditaruh di atas sebagai function componendidmount
      dispatch(getEventWhiteId(id_event));
    },
    orderEvent: order => {
      dispatch(orderEvent(order));
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Events)
);