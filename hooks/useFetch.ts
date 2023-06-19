import { useReducer, useCallback } from "react";

interface State {
  isLoading: boolean;
  error: { hasError: boolean; message: string };
}

// This is the state initial data
const initialState: State = {
  isLoading: false,
  error: { hasError: false, message: "" },
};

// This is the function that will be dispatched whenever an action is dispatched.
const fetchReducer = (state: State, action: { type: string; value: any }) => {
  if (action.type === "LOADING") {
    return { ...state, isLoading: action.value };
  }
  if (action.type === "ERROR") {
    return { ...state, error: action.value };
  }
  return initialState;
};

const useFetch = () => {
  // Managing state
  const [fetchState, dispatchFn] = useReducer(fetchReducer, initialState);

  // A function to fetch data
  const fetchRequest = useCallback(
    async (requestConfig: any, getRequestData = (data: any) => {}) => {
      dispatchFn({ type: "LOADING", value: true });
      dispatchFn({ type: "ERROR", value: { hasError: false, message: "" } });
      try {
        // Fetching data using the configuration provided
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
          headers: requestConfig.headers ? requestConfig.headers : {},
        });

        // If the response is not ok, throw an error
        if (!response.ok) {
          throw new Error(`${requestConfig.errorMessage}`);
        }

        // If the response is ok, get the data
        const responseBody = await response.json();

        // Send the data to the function that will use it
        getRequestData(responseBody);
      } catch (err: any) {
        // If an error occured, set the error state
        dispatchFn({
          type: "ERROR",
          value: { hasError: true, message: err.message || "An error ocurred" },
        });
      }
      // After the request has been made, set the loading state to false
      dispatchFn({ type: "LOADING", value: false });
    },
    []
  );

  // Destcturing the state
  const { isLoading, error } = fetchState;

  // Returning the state and the functions
  return { isLoading, error, fetchRequest };
};
export default useFetch;
