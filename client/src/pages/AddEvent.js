import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core'
import Navbar from '../components/Navbar';
import NavbarLogin from '../components/Navbarlogin';
import Footer from '../components/Footer';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
//
import { connect } from "react-redux";
import { addEvent } from '../_actions/addEvent';
//
class Addevent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      category: '',
      start_time: '',
      end_time: '',
      price: '',
      address: '',
      urlMaps: '',
      deskription: ''
    };
    this.titleHandler = this.titleHandler.bind(this);
    this.categoryHandler = this.categoryHandler.bind(this);
    this.firstHandler = this.firstHandler.bind(this);
    this.endtHandler = this.endtHandler.bind(this);
    this.priceHandler = this.priceHandler.bind(this);
    this.addressHandler = this.addressHandler.bind(this);
    this.urlHandler = this.urlHandler.bind(this);
    this.descHandler = this.descHandler.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
  }
  componentDidMount() {
    this.props.addEvent();
  }
  titleHandler = (event) => {
    this.setState({ title: event.target.value });
  }
  categoryHandler = (event) => {
    this.setState({ category: event.target.value });
  }
  firstHandler = (event) => {
    this.setState({ start_time: event.target.value });
  }
  endtHandler = (event) => {
    this.setState({ end_time: event.target.value });
  }
  priceHandler = (event) => {
    this.setState({ price: event.target.value });
  }
  descHandler = (event) => {
    this.setState({ deskription: event.target.value });
  }
  addressHandler = (event) => {
    this.setState({ address: event.target.value });
  }
  urlHandler = (event) => {
    this.setState({ urlmap: event.target.value });
  }

  handleAddEvent(event) {
    const EventData = {
      title: this.state.title,
      category: this.state.category,
      startTime: this.state.start_time,
      endTime: this.state.end_time,
      price: this.state.price,
      deskription: this.state.deskription,
      address: this.state.address,
      urlMaps: this.state.urlMaps,
    }
    this.props.addEvent(EventData);
    event.preventDefault();
  }
  render() {
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
        <div style={{ backgroundColor: '#F5B7B1', paddingTop: 50, paddingBottom: 50 }}>
          <Container maxWidth="md" onSubmit={this.handleSubmit}>
            <h3 style={{ marginBottom: 20, marginRight: '100%', color: '#C0392B', width: '100%' }}>Add Event</h3>
            <form onSubmit={this.handleSubmit}>
              <TextField style={{ width: '100%' }} id="standard-basic" onChange={this.titleHandler} label="Title Event" />
              <FormControl style={{ width: '100%', marginTop: 20 }}>
                <NativeSelect
                  inputProps={{
                    name: 'name',
                    id: 'uncontrolled-native',
                  }}
                  onChange={this.categoryHandler}
                >
                  <option value='' />
                  <option value={1}>Music</option>
                  <option value={3}>Sport</option>
                  <option value={4}>Science</option>
                  <option value={5}>Programing</option>
                </NativeSelect>
              </FormControl>
              <TextField style={{ width: '100%', marginTop: 20 }} onChange={this.firstHandler} id="standard-basic" label="Start Time" />
              <TextField style={{ width: '100%', marginTop: 20 }} onChange={this.endtHandler} id="standard-basic" label="End time" />
              <TextField style={{ width: '100%', marginTop: 20 }} onChange={this.priceHandler} id="standard-basic" label="Price" />
              <TextField style={{ width: '100%', marginTop: 20 }} onChange={this.addressHandler} id="standard-basic" label="Address Event" />
              <TextField style={{ width: '100%', marginTop: 20 }} onChange={this.urlHandler} id="standard-basic" label="Url Maps" />
              <TextField style={{ width: '100%', marginTop: 20 }} onChange={this.descHandler} id="standard-basic" label="Deskripsi Event" />
              <div style={{ textAlign: 'center', marginTop: 50 }}>
                <Button type='button' onClick={this.handleAddEvent} style={{ backgroundColor: '#3498DB', textTransform: 'none', fontWeight: 'bold', color: 'white', marginBottom: 50 }} variant="contained">Publish</Button>
              </div>
            </form>
          </Container>
          <Footer />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postevent: state.postevent
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addEvent: orderData => {
      dispatch(addEvent(orderData));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Addevent);
