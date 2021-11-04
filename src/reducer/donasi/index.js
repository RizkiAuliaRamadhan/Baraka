import { GET_DONASI } from "../../actions/DonasiAction";

const initialState = {
    donasiLoading: true,
    donasiResult: [],
    donasiError: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
      case GET_DONASI:
        return {
          ...state,
          donasiLoading: action.payload.loading,
          donasiResult: action.payload.data,
          donasiError: action.payload.errorMessage,
        };
  
      default:
        return state;
        break;
    }
  }