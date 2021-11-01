import { REGISTER_USER } from "../../actions/AuthAction";
import { LOGIN_USER } from "../../actions/AuthAction";

const initialState = {
  authLoading: false,
  authResult: false,
  authError: false,

  loginLoading: false,
  loginResult: false,
  loginError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        authLoading: action.payload.loading,
        authResult: action.payload.data,
        authError: action.payload.errorMessage,
      };

    case LOGIN_USER:
      return {
        ...state,
        loginLoading: action.payload.loading,
        loginResult: action.payload.data,
        loginError: action.payload.errorMessage,
      };

    default:
      return state;
      break;
  }
}