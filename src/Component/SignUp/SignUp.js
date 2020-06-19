import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

export class SignUp extends Component {
    
constructor(props) {
  super(props)

  this.state = {
    fields: {},
    errors: {},
    continue: true
  }
  this.handleChange = this.handleChange.bind(this);
  this.checkout = this.checkout.bind(this);
}

checkout() {
  if (this.validateForm()) 
      {
          console.log("form submitted");
      
      this.setState({
        continue: !this.state.continue
    })
  }
  }

handleChange(e) {
  let fields = this.state.fields;
  fields[e.target.name] = e.target.value;
  this.setState({
      fields
  });
}


validateForm() {
  let fields = this.state.fields;
  let errors = {};
  let formIsValid = true;

  if (!fields["firstName"]) {
      formIsValid = false;
      errors["firstName"] = "*Please enter your name.";
  }

  if (typeof fields["firstName"] !== "undefined") {
      if (!fields["firstName"].match(/^[a-zA-Z]{3,}$/)) {
          formIsValid = false;
          errors["firstName"] = "*Please enter alphabet only.";
      }
  }

  this.setState({
    errors: errors
});
return formIsValid;

}

  render() {
    return (
      <div>
          <Container component="main" maxWidth="xs" style={{ marginTop:'50px', marginBottom:'110px' }}>
            <CssBaseline />
          <div >
            <Avatar style={{marginLeft:'170px',marginBottom:'10px', backgroundColor: '#3d5afe'}}>
              <AccountCircleIcon />
            </Avatar>
              <Typography component="h1" variant="h5" style={{marginLeft:'150px', marginBottom:'15px'}}>
                Sign up
              </Typography>
            <form noValidate>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  value={this.state.fields.firstName}
                  onChange={this.handleChange}
                  label="First Name"
                  autoFocus
                  style={{ outlineColor: 'coral' }}
                />
                <div style={{color:'red',marginBottom:'12px'}}>{this.state.errors.firstName}</div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Link to="/UserLogin" style={{ marginTop:'20px', textDecoration: 'none' }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{marginTop:'10px',marginBottom:'10px'}}
            onClick={() => this.checkout()}
          >
            Sign Up
          </Button>
          </Link>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/UserLogin" style={{ textDecoration: 'none' }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
            </div>
        )
    }
}

export default SignUp
