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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import HTTPServices from '../../HTTPServices';

var data = new HTTPServices();
export class SignUp extends Component {
    
constructor(props) {
  super(props)
  this.state = {
    fields: {},
    errors: {},
    continue: true,
    emailId: '',
    password: '',
    userName: '',
    phoneNumber: '',
    role: [],
    hasAgreed: false,
    roleChecked: false,
    admin: false,
    user: false
  }
  this.handleChange = this.handleChange.bind(this);
  this.checkout = this.checkout.bind(this);
}

handleSetName = async(e) => {
  await this.setState({
    userName : e.target.value
  })
  console.log(this.state.userName);
  
}

handleSetPassword = async(e) => {
  await this.setState({
    password : e.target.value
  })
  console.log(this.state.password);
  
}

handleSetPhoneNumber = async(e) => {
  await this.setState({
    phoneNumber : e.target.value
  })
  console.log(this.state.phoneNumber);
  
}

handleSetEmailAddress = async(e) => {
  await this.setState({
    emailId : e.target.value
  })
  console.log(this.state.emailId);
  
}

handleSelectRoleAdmin = () => {
  this.setState({
    admin: !this.state.admin
  })
  console.log(this.state.admin);
  
}

handleSelectRoleUser = async() => {
  this.setState({
    user: !this.state.user
  })
  console.log(this.state.userName);
  
}

handleSubmitSignUpForm = () => {
  if (this.state.admin)
  this.setState({
    role: this.state.role.push("admin")
  })
  console.log(this.state.role);
  
  if (this.state.user)
  this.setState({
    role: this.state.role.push("user")
  })

  data.signUpData(this.state.userName, this.state.password, this.state.emailId, this.state.phoneNumber, this.state.role)
console.log(data.signUpData);
}



handleChange(e) {
  let fields = this.state.fields;
  fields[e.target.name] = e.target.value;
  this.setState({
      fields
  });
}

checkout() {
  if (this.validateForm()) {
    console.log("form submitted");
      this.setState({
          continue: !this.state.continue
      })
  }
}


validateForm() {
  let fields = this.state.fields;
  let errors = {};
  let formIsValid = true;

  if (!fields["Name"]) {
      formIsValid = false;
      errors["Name"] = "*Enter your Name.";
  }

  if (typeof fields["Name"] !== "undefined") {
      if (!fields["Name"].match(/^[a-zA-Z]{3,}$/)) {
          formIsValid = false;
          errors["Name"] = "*Please enter alphabet only.";
      }
  }

  if (!fields["PhoneNumber"]) {
    formIsValid = false;
    errors["PhoneNumber"] = "*Please enter your mobile no.";
}

if (typeof fields["PhoneNumber"] !== "undefined") {
    if (!fields["PhoneNumber"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["PhoneNumber"] = "*Please enter valid mobile no.";
    }
}

if (!fields["emailId"]) {
  formIsValid = false;
  errors["emailId"] = "*Please enter your email-ID.";
}

if (typeof fields["emailId"] !== "undefined") {
  if (!fields["emailId"].match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
      formIsValid = false;
      errors["emailId"] = "*Please enter valid email-ID.";
  }
}

if (!fields["password"]) {
  formIsValid = false;
  errors["password"] = "*Please enter your password.";
}

if (typeof fields["password"] !== "undefined") {
  //  if (!fields["password"].match(/((?=.*[0-9])(?=.*[a-z]?)(?=.*[A-Z])(?=.*[@#*$%]).{3,})"/)) {
      if (!fields["password"].match(/^[a-zA-Z0-9]{3,}$/)) {
      formIsValid = false;
      errors["password"] = "*Please enter valid password.";
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
                variant="outlined"
                required
                fullWidth
                label="Name"
                name="Name"
                value={this.state.fields.Name} 
                onChange={this.handleChange}
                autoComplete="Name"
                style={{ outlineColor: 'coral' }}
                onChange={this.handleSetName}
              />
              <div style={{ color:'red',marginBottom:'12px' }}>{this.state.errors.Name}</div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Phone Number"
                name="Phone no."
                value={this.state.fields.PhoneNumber} 
                onChange={this.handleChange}
                autoComplete="Phone Number"
                style={{ outlineColor: 'coral' }}
                onChange={this.handleSetPhoneNumber}
              />
              <div style={{ color:'red',marginBottom:'12px' }}>{this.state.errors.PhoneNumber}</div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={this.state.fields.emailId}
                onChange={this.handleChange}
                label="Email Address"
                name="emailId"
                autoComplete="email"
                style={{ outlineColor: 'coral' }}
                onChange={this.handleSetEmailAddress} 
              />
              <div style={{ color:'red',marginBottom:'12px' }}>{ this.state.errors.emailId }</div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={this.state.fields.password}
                onChange={this.handleChange}
                autoComplete="current-password" 
                style={{ outlineColor: 'coral' }}
                onChange={this.handleSetPassword}
              />
             <div style={{ color:'red',marginBottom:'12px' }}>{ this.state.errors.password }</div>
            </Grid>
          </Grid>
          <div className="typeRadio">Role</div>
                            <RadioGroup aria-label="Type" name="type" row>
                                <FormControlLabel value="home" control={<Radio />} label="admin" onChange={this.handleSelectRoleAdmin}/>
                                <FormControlLabel value="work" control={<Radio />} label="user" onChange={this.handleSelectRoleUser}/>
                            </RadioGroup>
          <Link to="/UserLogin" style={{ textDecoration: 'none' }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{marginTop:'10px',marginBottom:'10px'}}
            onClick={() => this.checkout()}
            onClick={this.handleSubmitSignUpForm}
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
