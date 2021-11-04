import { GET_CONTENTS } from "../../actions/ContentAction";

const initialState = {
    contentsLoading: true,
    contentsResult: [],
    contentsError: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
      case GET_CONTENTS:
        return {
          ...state,
          contentsLoading: action.payload.loading,
          contentsResult: action.payload.data,
          contentsError: action.payload.errorMessage,
        };
  
      default:
        return state;
        break;
    }
  }