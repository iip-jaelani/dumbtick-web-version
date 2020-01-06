// ACTION

// disini harus pure return object
import { GET_CATEGORIES_EVENTS } from "../config/constant";
import axios from "axios";

export const getEventCategory = event_id => {
  return {
    type: GET_CATEGORIES_EVENTS,
    payload: axios({
      method: "GET",
      url: http://localhost:5000/api/v1/category/${event_id}/events
    })
  };
};
// REDUCER

import { GET_CATEGORIES_EVENTS } from "../config/constant";
const initialState = {
  eventCategory: [],
  isLoading: false,
  error: false
};

export const eventCategory = (state = initialState, action) => {
  switch (action.type) {
    case ${ GET_CATEGORIES_EVENTS } _PENDING:
      return {
        ...state,
        isLoading: true
      };
    case ${ GET_CATEGORIES_EVENTS } _FULFILLED:
      return {
        ...state,
        eventCategory: action.payload.data,
        isLoading: false
      };
    case ${ GET_CATEGORIES_EVENTS } _REJECTED:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    default:
      return state;
  }
};
// PAGE CATEGORY DETAIL

import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { getEventCategory } from "../_actions/eventCategory";
import { getCategoryDetail } from "../_actions/categories";
import { connect } from "react-redux";
import EventCard from "../components/eventCard";

class CategoryDetail extends Component {
  componentDidMount() {
    this.props.getEventCategory1(this.props.category_id);
    this.props.getCategoryDetail1(this.props.category_id);
  }

  render() {
    const { eventCategory } = this.props.eventCategory;
    const name =
      this.props.categoryDetail.data !== null
        ? this.props.categoryDetail.data.name
        : "Undefined";

    return (
      <>
        <h1 style={{ color: "#E74267" }}>{name}</h1>
        <Grid container spacing={3} style={{ paddingTop: "0px" }}>
          {eventCategory.map((item, i) => (
            <Grid item lg={4} md={4} sm={6} xs={12} key={i}>
              <EventCard
                image={item.image}
                price={item.price}
                title={item.title}
                description={item.description}
                id={item.id}
              />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state, otherProps) => {
  return {
    category_id: otherProps.match.params.id,
    eventCategory: state.eventCategory,
    categoryDetail: state.categoryDetail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEventCategory1: category_id => {
      dispatch(getEventCategory(category_id));
    },

    getCategoryDetail1: category_id => {
      dispatch(getCategoryDetail(category_id));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryDetail)
);
