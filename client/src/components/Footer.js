import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './Footer.css';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
class Footer extends Component {
  render() {
    return (
      <>
        <div style={{ backgroundColor: '#C0392B', paddingTop: 50, paddingBottom: 10 }}>
          <Container maxWidth="md">
            <div style={{ backgroundColor: '#C0392B', justifyItems: 'center' }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4} md={4} lg={4} >
                  <div>
                    <img style={{ width: 40 }} src="https://img.icons8.com/plasticine/2x/ticket.png" alt="dumtick" />
                    <p className="rotate" style={{ fontWeight: 'bold', color: "white", marginTop: '-30px', fontSize: 12 }}>Dumb-Tick</p>
                    <p style={{ color: 'white', marginTop: 30, fontSize: 12 }}>dumb-tick is a web-based platform that provides tickets for various events around sports, music, scence and programming</p>
                  </div>
                </Grid>
                <Grid item xs={6} lg={4}>
                  <div style={{ color: 'white' }}>
                    <p style={{ fontWeight: 'bold', marginBottom: 0 }}>Links</p>
                    <p style={{ fontSize: 12 }}>About Us</p>
                    <p style={{ fontWeight: 'bold', marginBottom: 0 }}>Follow as On</p>
                    <p style={{ fontSize: 12, marginBottom: 0 }}><InstagramIcon style={{ fontSize: 15 }} /> Instagram</p>
                    <p style={{ fontSize: 12 }}><TwitterIcon style={{ fontSize: 15 }} /> Twitter</p>
                  </div>
                </Grid>
                <Grid item xs={6} lg={4}>
                  <div style={{ color: 'white' }}>
                    <p style={{ fontWeight: 'bold', marginBottom: 0 }}>Have A Questions ?</p>
                    <p style={{ fontSize: 12, marginBottom: 0 }}>Dumb-tick</p>
                    <p style={{ fontSize: 12 }}>Email : Support@dumbtick.com</p>
                  </div>
                </Grid>
                <Grid item xs={12} >
                  <div style={{ color: 'white', textAlign: 'center' }}>
                    <p style={{ fontSize: 12 }}>Copyright Dumbways 2019</p>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </>
    );
  }
}
export default Footer;
