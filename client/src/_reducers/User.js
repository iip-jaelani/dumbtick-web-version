import { GET_USER, GET_TICKET_NONCONFIRM, GET_TICKET_APPROVED } from "../config/constant";

const initialState = {
  data: [],
  ticketNonConfirm: [],
  ticketApproved: [],
  isLoading: false,
  isPost: false,
  error: false
}

export const profile = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_TICKET_APPROVED}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_TICKET_APPROVED}_FULFILLED`:
      return {
        ...state,
        ticketApproved: action.payload.data,
        isLoading: false
      };
    case `${GET_TICKET_APPROVED}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    //-----------------------------------------------------------
    case `${GET_TICKET_NONCONFIRM}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_TICKET_NONCONFIRM}_FULFILLED`:
      return {
        ...state,
        ticketNonConfirm: action.payload.data,
        isLoading: false
      };
    case `${GET_TICKET_NONCONFIRM}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    //-----------------------------------------------------
    case `${GET_USER}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false
      };
    case `${GET_USER}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    default:
      return state;
  }
}

export default profile;