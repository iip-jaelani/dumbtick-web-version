import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Category from './pages/Category';
import Profile from './pages/Profile';
import Events from './pages/Events';
import Ticket from './pages/Ticket';
import Payment from './pages/Payment';
import AddEvent from './pages/AddEvent';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/payment">
            <Payment />
          </Route>
          <Route path="/add-event">
            <AddEvent />
          </Route>
          <Route path="/ticket">
            <Ticket />
          </Route>
          <Route path="/event/:id">
            <Events />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/category/:id/events">
            <Category />
          </Route>
          <Route path="/">
            <Home />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
