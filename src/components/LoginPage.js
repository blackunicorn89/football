import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../actions/LoginActions"

import { Grid, Paper, Avatar, TextField, Button } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginPage = () => {


  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: "",
    password: ""
  })

  const onChange = (event) => {
    setState((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value
      }
    })
  }

  const onSubmit = (event) => {
    event.preventDefault();
    let user = {
      ...state
    }
    console.log(state)
    dispatch(login(user));
  }

  const paperStyle = { padding: 20, height: "70vh", width: 280, margin: "20px auto" }
  const avatarStyle = { backgroundColor: "red" }
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign in</h2>
        </Grid>
        <form action="/api/users/login" method="post">
          <TextField type="email" label="Email" name="email" value={state.email} onChange={onChange} placeholder="Enter email" margin="normal" fullWidth required />
          <TextField label="Password" name="password" value={state.password} onChange={onChange} placeholder="Enter password" margin="normal" type="password" fullWidth required />
          <Button type="submit" color="primary" variant="contained" margin="normal" onClick={onSubmit} fullWidth>Sign in</Button>
        </form>


      </Paper>
    </Grid>
  )
};

export default LoginPage;