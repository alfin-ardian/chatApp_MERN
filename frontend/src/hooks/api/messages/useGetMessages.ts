import { useEffect, useReducer, useCallback } from "react";
import { messageFetchReducer } from "../../reducers";
import { useFetch } from "..";
import {
  type MessageFetchState,
  type MessageFetchAction,
} from "../../../types/index";

export const useGetMessages = () => {
  const [state, dispatch] = useReducer<
    (state: MessageFetchState, action: MessageFetchAction) => MessageFetchState
  >(messageFetchReducer, {
    data: null,
    error: null,
    loading: true,
  });

  const getAllData = useFetch("/messages");

  const fetchData = async () => {
    try {
      const response = await getAllData();
      const jsonData: any = await response.json();
      return await Promise.resolve(jsonData);
    } catch (err) {
      return await Promise.reject(err);
    }
  };

  const refetch = useCallback(() => {
    dispatch({ type: "FETCH_MESSAGE_LIST", data: null });

    fetchData()
      .then((data) => {
        dispatch({ type: "FETCH_MESSAGE_LIST_SUCCESS", data });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_MESSAGE_LIST_ERROR", data: null });
        console.log(err);
      });
  }, [fetchData]);

  useEffect(() => {
    refetch();
  }, []);

  return {
    loading: state.loading,
    data: state.data,
    error: state.error,
    refetch,
  };
};
