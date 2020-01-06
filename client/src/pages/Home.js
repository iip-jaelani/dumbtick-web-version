import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { getCategories } from "../_actions/Categories";
import { getEvents } from "../_actions/Events";
import { getEventsToday } from "../_actions/Events";
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from "axios"
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import './Home.css';
import Navbar from '../components/Navbar';
import NavbarLogin from '../components/Navbarlogin';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import events from "../_reducers/Events";


class Home extends Component {

  state = {
    test: []
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getEvents();
    this.props.getEventsToday();
    axios.get('http://localhost:7000/events?start_time=2019-12-20').then(data => {
      const test = data.data;
      this.setState({ test });
    })
  }

  render() {
    const { data } = this.props.categories;
    const { event, isLoading, error } = this.props.events;
    const { upcoming } = this.props.upcoming;
    const token = localStorage.getItem('AUTH_TOKEN')
    let nav;
    console.log(token);
    if (token) {
      nav = <Navbar />
    } else {
      nav = <NavbarLogin />
    }

    return (
      <>
        {nav}
        <div style={{ backgroundColor: '#F5B7B1', paddingTop: 50, paddingBottom: 50 }}>
          <Container maxWidth="md">
            <div style={{ display: 'flex', marginTop: 20 }}>
              <TextField style={{ width: '100%' }} id="standard-basic" />
              <SearchIcon />
            </div>
            <div style={{ marginTop: 20, textAlign: 'center', marginBottom: 20 }} >
              <h3 style={{ marginBottom: 20, marginRight: '100%', color: '#C0392B' }}>Category</h3>
              <Grid container spacing={3}>
                {data.map(data => (
                  <Grid item xs={12} md={12} lg={3}>
                    <Link style={{ textDecoration: 'none' }} to={`/category/${data.id}/events`}>
                      <Button style={{ marginRight: 50, width: '100% ', outline: 'none', backgroundSize: 'cover', color: 'white', fontWeight: 'bold', backgroundImage: 'url(' + data.bg + ')' }} variant="contained">{data.name}</Button>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </div>
            <h3 style={{ marginTop: 60, marginBottom: 20, marginRight: '100%', color: '#C0392B' }}>Tooday</h3>
            <div style={{ marginTop: 50 }}>
              <Grid container spacing={5}>
                {event.map((result, index) => {
                  return (
                    <Grid item xs={6} lg={4}>
                      <Card style={{ boxShadow: '1.5px 1.5px 10px #808080' }}>
                        <CardActionArea>
                          <Link to={`/event/${result.id}`}>
                            <CardMedia style={{ minHeight: 200, maxHeight: 200 }}
                              component="img"
                              className="Card"
                              alt={result.title}
                              image={result.image}
                              title={result.title}
                            />
                          </Link>
                          <CardContent>
                            <div style={{ display: 'flex' }}>
                              <Typography style={{ fontWeight: 'bold', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: "nowrap" }} gutterBottom variant="h5" component="h5">{result.title}</Typography>
                              <Like />
                            </div>
                            <Typography style={{ color: "#C0392B", fontWeight: 'bold', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: "nowrap" }} gutterBottom variant="p" component="p">{result.start_time}</Typography>
                            <Typography style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: "nowrap" }} variant="body2" color="textSecondary" component="p">{result.deskription}</Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  )
                })}
              </Grid>
            </div>
            <h3 style={{ marginTop: 50, marginBottom: 20, marginRight: '100%', color: '#C0392B', width: '100%' }}>Upcoming Events</h3>
            <div style={{ marginTop: 50 }}>
              <Grid container spacing={5}>
                {upcoming.map((resss) => {
                  return (
                    <Grid item xs={6} lg={4}>
                      <Card style={{ boxShadow: '1.5px 1.5px 10px #808080' }} >
                        <CardActionArea>
                          <Link to={`/event/${resss.id}`}>
                            <CardMedia style={{ minHeight: 200, maxHeight: 200 }}
                              className='Card'
                              component="img"
                              alt={resss.title}
                              image={resss.image}
                              title={resss.title}
                            />
                          </Link>
                          <CardContent>
                            <div style={{ display: 'flex' }}>
                              <Typography style={{ fontWeight: 'bold', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: "nowrap" }} gutterBottom variant="h5" component="h2">{resss.title}</Typography>
                              <Like />
                            </div>
                            <Typography style={{ color: "#C0392B", fontWeight: 'bold' }} gutterBottom variant="p" component="p">{resss.start_time}</Typography>
                            <Typography style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: "nowrap" }} variant="body2" color="textSecondary" component="p">{resss.deskription}</Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  )
                })}
              </Grid>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    events: state.events,
    upcoming: state.upcoming
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => {
      dispatch(getCategories());
    },
    getEvents: () => {
      dispatch(getEvents());
    },
    getEventsToday: () => {
      dispatch(getEventsToday());
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


class Like extends Component {
  constructor(props) {
    super(props);
    this.state = { color: 'black' };
    this.handleClick = this.handleClick.bind(this);
  }
  state = {
    result: []
  }
  async componentDidMount() {
    const result = await axios.get("http://localhost:7000/favorite")
    this.setState({ result })

  }
  // .get("http://localhost:7000/favorite")

  handleClick() {
    if (this.state.color === 'black') {
      this.setState(state => ({
        color: 'red'
      }));
    } else {
      this.setState(state => ({
        color: 'black'
      }));
    }
  }

  render() {
    return (
      <>
        <FavoriteIcon style={{ marginLeft: 'auto', color: this.state.color, border: "solid 1px black", borderRadius: '100%' }} onClick={this.handleClick} />
      </>
    )
  }
}
