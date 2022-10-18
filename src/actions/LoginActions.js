import { getNews } from "./NewsActions";
export const LOADING = "LOADING";
export const STOP_LOADING = "STOP_LOADING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const CLEAR_STATE = "CLEAR_STATE";

export const login = (user) => {
  return async (dispatch) => {

    let request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }
    dispatch(loading());
    let response = await fetch("/api/users/login", request)
    if (!response) {
      dispatch(loginFailed("Failed to parse login information. Login failed."))
      return;
    }
    if (response.ok) {
      let data = await response.json();


      if (!data) {
        dispatch(loginFailed("Failed to parse login information. Login failed."));
        return
      }
      dispatch(loginSuccess(data));
      dispatch(getNews());
    } else {
      dispatch(loginFailed("Login failed. Server responded with a status " + response.status + " " + response.statusText));
    }
  }
}

// ACTION CREATORS

export const loading = () => {
  return {
    type: LOADING
  }
};

export const stopLoading = () => {
  return {
    type: STOP_LOADING
  }
};

const loginSuccess = (data) => {

  return {
    type: LOGIN_SUCCESS,
    token: data.token,
    admin: data.admin
  }
};


const loginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    error: error
  }
}

export const clearState = () => {
  return {
    type: CLEAR_STATE
  }
};