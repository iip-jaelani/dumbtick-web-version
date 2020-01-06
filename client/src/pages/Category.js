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
import Footer from '../components/Footer';
import DateRangeIcon from '@material-ui/icons/DateRange';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCategoriesWhereId } from '../_actions/Categories';
class Category extends Component {
  componentDidMount() {
    this.props.getCategoriesWhereId(this.props.category_id);
  }
  render() {
    const { eventCategory } = this.props.eventCategory;
    return (
      <>
        <Navbar />
        <div style={{ backgroundColor: '#F5B7B1', paddingTop: 50, paddingBottom: 50 }}>
          <Container maxWidth="md">
            {/* <h3 style={{ marginBottom: 50, marginRight: '100%', color: '#C0392B' }}>Music</h3> */}
            <div style={{ display: 'flex', marginTop: 20 }}>
              <p style={{ fontWeight: 100, marginRight: 20 }}>Sort by: </p>
              <TextField style={{ width: 250, marginTop: -30, marginRight: 20 }} id="standard-basic" label="Chose music date" />
              <DateRangeIcon />
            </div>
            <div style={{ marginTop: 50 }}>
              <Grid container spacing={5}>
                {eventCategory.map(data => {
                  return (
                    <Grid item xs={6} lg={4}>
                      <Card style={{ boxShadow: '1.5px 1.5px 10px #808080' }}>
                        <CardActionArea>
                          <Link to={`/event/${data.id}`}>
                            <CardMedia style={{ minHeight: 200, maxHeight: 200 }}
                              className='Card'
                              component="img"
                              alt={data.title}
                              image={data.image}
                              title={data.title}
                            />
                          </Link>
                          <CardContent>
                            <div style={{ display: 'flex', textOverflow: "ellipsis" }}>
                              <Typography textOverflow="ellipsis" style={{ fontWeight: 'bold', marginBottom: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: "nowrap" }} gutterBottom variant="h5" component="h5">{data.title}</Typography>
                              {/* <Like /> */}
                            </div>
                            <Typography style={{ color: "#C0392B", fontWeight: 'bold', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: "nowrap" }} gutterBottom variant="p" component="p">{data.start_time}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{data.description}</Typography>
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


const mapStateToProps = (state, otherProps) => {
  return {
    category_id: otherProps.match.params.id,
    eventCategory: state.eventCategory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategoriesWhereId: category_id => {
      dispatch(getCategoriesWhereId(category_id));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Category)
);

