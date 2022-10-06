export const LOADING = "LOADING";
export const STOP_LOADING = "STOP_LOADING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const CLEAR_STATE = "CLEAR_STATE";

export const login = (user) => {
  return async (dispatch) => {
    let request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }
    dispatch(loading());
    let response = await fetch("api/users/login/", request);
    if (!response) {
      dispatch(loginFailed("There was an error with the connection to server. Login failed."));
      return;
    }
    if (response.ok) {
      let data = await response.json();
      if (!data) {
        dispatch(loginFailed("Failed to parse login information. Login failed."));
        return;
      }
      dispatch(loginSuccess(data.token))
      console.log(data) //Muuta
    } else {
      dispatch(loginFailed("Login failed. Server responded with a status " + response.status + " " + response.statusText));
    }
  }
}

export const loading = () => {
  return {
    type: LOADING
  }
}

export const loginFailed = () => {
  return {
    type: LOGIN_FAILED
  }
}

const loginSuccess = (token) => {
  return {
    type: LOGIN_SUCCESS,
    token: token
  }
}