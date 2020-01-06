import {
  GET_EVENTS,
  GET_EVENTS_TODAY,
  GET_EVENTS_DETAIL, GET_FAVORITE,
  POST_ORDER,
} from "../config/constant";
import axios from "axios";
const Token = localStorage.getItem('AUTH_TOKEN')

export const getEvents = () => {
  return {
    type: GET_EVENTS,
    payload: axios(
      {
        method: "GET",
        url: "http://localhost:7000/events?start_time=2019-12-19"
      }
    )
  }
}

export const getEventsToday = () => {
  return {
    type: GET_EVENTS_TODAY,
    payload: axios(
      {
        method: "GET",
        url: "http://localhost:7000/events?start_time=2019-12-20"
      }
    )
  }
}


export const getEventWhiteId = (user_id) => {
  return {
    type: GET_EVENTS_DETAIL,
    payload: axios(
      {
        method: "GET",
        url: `http://localhost:7000/event/${user_id}`
      }
    )
  }
}

export const getFavorite = () => {
  return {
    type: GET_FAVORITE,
    payload: axios(
      {
        method: "GET",
        url: "http://localhost:7000/favorite",
        headers: { Authorization: `Bearer ${Token}` }
      }
    )
  }
}


export const orderEvent = (order) => {
  return {
    type: POST_ORDER,
    payload: axios({
      method: "POST",
      //localhist:7000 event/:id(event)/order
      url: 'http://localhost:7000/event/order',
      headers: { Authorization: `Bearer ${Token}` },
      data: order
    })
  }
}