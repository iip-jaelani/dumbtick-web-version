import { GET_EVENTS, GET_EVENTS_DETAIL, GET_FAVORITE, POST_ORDER, POST_EVENTS } from "../config/constant";

const initialState = {
  event: [],
  eventDetail: [],
  getFavorite: [],
  orderEvent: [],
  isLoading: false,
  error: false
}


export const events = (state = initialState, action) => {
  switch (action.type) {
    case `${POST_EVENTS}_PENDING`:
      return {
        ...state,
        isLoading: true,
      }
    case `${POST_EVENTS}_FULFILLED`:
      return {
        ...state,
        addEvent: action.payload.data,
        isLoading: false,
        isPost: true
      }
    case `${POST_EVENTS}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      }
    //------------------------------------------------------
    case `${POST_ORDER}_PENDING`:
      return {
        ...state,
        isLoading: true,
      }
    case `${POST_ORDER}_FULFILLED`:
      return {
        ...state,
        orderEvent: action.payload.data,
        isLoading: false,
        isPost: true
      }
    case `${POST_ORDER}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      }
    //------------------------------------------------------
    case `${GET_FAVORITE}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${GET_FAVORITE}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    case `${GET_FAVORITE}_FULFILLED`:
      return {
        ...state,
        getFavorite: action.payload.data,
        isLoading: false
      };
    //---------------------------------------------------
    case `${GET_EVENTS_DETAIL}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    case `${GET_EVENTS_DETAIL}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    case `${GET_EVENTS_DETAIL}_FULFILLED`:
      return {
        ...state,
        eventDetail: action.payload.data,
        isLoading: false
      };
    //---------------------------------------------------------------------
    case `${GET_EVENTS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_EVENTS}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    case `${GET_EVENTS}_FULFILLED`:
      return {
        ...state,
        event: action.payload.data,
        isLoading: false
      };
    default:
      return state;
  }
}
export default events;