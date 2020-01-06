import React, { Component } from "react";
import "../components/Navbar.css";
import Modal from './Modal';
import Register from './Register';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    borderRadius: 5,
    marginTop: 20,
    boxShadow: '1.5px 1.5px 10px #808080'
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const token = localStorage.getItem('AUTH_TOKEN')

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ backgroundColor: '#CB4335' }}>
      <Container maxWidth="md">
        <nav style={{ width: '100%' }} className="navbar">
          <Link to="/">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <img style={{ width: 50 }} src="https://img.icons8.com/plasticine/2x/ticket.png" alt="dumtick" />
              <p style={{ marginRight: 'auto', fontWeight: 'bold', fontSize: 12, color: 'white', textDecoration: 'none' }}>Dumb-Tick</p>
            </div>
          </Link>
          <div className="flex-row-reverse">
            <Avatar className='avatar' alt="Remy Sharp" src="/static/images/avatar/1.jpg" aria-controls="customized-menu" aria-haspopup="true" onClick={handleClick} />
          </div>
        </nav>
      </Container>
      <Modal />
      <Register />
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link style={{ textDecoration: 'none', fontWeight: 'bold', color: 'gray' }} to="/profile">
          <StyledMenuItem>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </StyledMenuItem>
        </Link>
        <Link style={{ textDecoration: 'none', fontWeight: 'bold', color: 'gray' }} to="/ticket">
          <StyledMenuItem>
            <ListItemIcon>
              <ReceiptIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="My ticket" />
          </StyledMenuItem>
        </Link>
        <Link style={{ textDecoration: 'none', fontWeight: 'bold', color: 'gray' }} to="/payment">
          <StyledMenuItem>
            <ListItemIcon>
              <MonetizationOnOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Payment" />
          </StyledMenuItem>
        </Link>
        <Link style={{ textDecoration: 'none', fontWeight: 'bold', color: 'gray' }} to="/add-event">
          <StyledMenuItem>
            <ListItemIcon>
              <EventNoteOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Add event" />
          </StyledMenuItem>
        </Link>
        <hr />
        <StyledMenuItem>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
