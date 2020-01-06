import {
  POST_EVENTS
} from "../config/constant";
import axios from "axios";
const Token = localStorage.getItem('AUTH_TOKEN')

export const addEvent = orderData => {
  return {
    type: POST_EVENTS,
    payload: axios({
      method: "POST",
      url: 'http://localhost:7000/add-event',
      headers: { Authorization: `Bearer ${Token}` },
      data: orderData
    })
  }
}