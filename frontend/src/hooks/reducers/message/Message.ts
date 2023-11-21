import { MessageFetchState, MessageFetchAction } from "../../../types/message";

export const messageFetchReducer = (
  state: MessageFetchState,
  action: MessageFetchAction
): MessageFetchState => {
  switch (action.type) {
    case "FETCH_MESSAGE_LIST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_MESSAGE_LIST_SUCCESS":
      return {
        data: action.data,
        loading: false,
        error: null,
      };
    case "FETCH_MESSAGE_LIST_ERROR":
      return {
        ...state,
        loading: false,
        error: "Error fetching data",
      };
    default:
      return state;
  }
};
