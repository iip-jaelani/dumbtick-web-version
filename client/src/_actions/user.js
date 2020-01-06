import { GET_USER, GET_TICKET_NONCONFIRM, GET_TICKET_APPROVED } from "../config/constant";
import axios from "axios";
const Token = localStorage.getItem('AUTH_TOKEN')

export const getProfile = () => {
  return {
    type: GET_USER,
    payload: axios(
      {
        method: "GET",
        url: "http://localhost:7000/user",
        headers: { Authorization: `Bearer ${Token}` }
      }
    )
  }
}

export const getTicketPending = () => {
  return {
    type: GET_TICKET_NONCONFIRM,
    payload: axios(
      {
        method: "GET",
        url: "http://localhost:7000/orders?status=pending",
        headers: { Authorization: `Bearer ${Token}` }
      }
    )
  }
}

export const getTicketApproved = () => {
  return {
    type: GET_TICKET_APPROVED,
    payload: axios(
      {
        method: "GET",
        url: "http://localhost:7000/orders?status=approved",
        headers: { Authorization: `Bearer ${Token}` }
      }
    )
  }
}