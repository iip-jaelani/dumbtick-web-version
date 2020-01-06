import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DateRangeIcon from '@material-ui/icons/DateRange';


import { getProfile } from '../_actions/user';
import { getFavorite } from '../_actions/Events';
import { connect } from 'react-redux'
class Profile extends Component {
  componentDidMount() {
    this.props.getProfile();
    this.props.getFavorite();
  }
  render() {
    const { data, err } = this.props.profile;
    const { getFavorite } = this.props.events;

    return (
      <>
        <Navbar />
        <div style={{ backgroundColor: '#F5B7B1', paddingTop: 50, paddingBottom: 50, minHeight: '70vh' }}>
          <Container maxWidth="md">
            <Grid container>
              <Grid item lg={4} sm={4} xs={12}>
                <div>
                  <h3 style={{ marginBottom: 20, marginRight: '100%', color: '#C0392B' }}>Profile</h3>
                  <h3>{data.name}</h3>
                  <p>{data.BirthDay}</p>
                  <p>{data.Notlp}</p>
                  <p>{data.email}</p>
                </div>
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <a style={{ backgroundColor: 'red', color: 'white', borderRadius: 5, padding: 2, fontSize: 12 }} href="" >Edit profile</a>
              </Grid>
              <Grid item lg={4} sm={4} xs={12}>
                <img style={{ width: 150, borderRadius: '100%', marginTop: 20 }} src={data.img} />
              </Grid>
            </Grid>
            <div>
              <h3 style={{ marginBottom: 20, marginRight: '100%', color: '#C0392B', marginTop: 20 }}>Favorite</h3>
            </div>
            <div style={{ marginTop: 50 }}>
              <Grid container spacing={3}>

                {getFavorite.map(ress => {
                  return (
                    <Grid item xs={6} lg={4}>
                      <Card >
                        <CardActionArea>
                          <CardMedia style={{ minHeight: 200, maxHeight: 200 }}
                            component="img"
                            alt={ress.event.title}
                            height="140"
                            image={ress.event.image}
                            title={ress.event.title}
                          />
                          <CardContent>
                            <Typography style={{ fontWeight: 'bold', marginBottom: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: "nowrap" }} gutterBottom variant="h5" component="h2">{ress.event.title}</Typography>
                            <Typography style={{ fontWeight: 'bold', marginBottom: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: "nowrap" }} variant="body2" color="textSecondary" component="p">{ress.event.deskription}</Typography>
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
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    events: state.events
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => {
      dispatch(getProfile());
    },
    getFavorite: () => {
      dispatch(getFavorite());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
