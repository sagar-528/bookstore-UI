import React, { Component } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Headerbar from '../Header/Headerbar';
import Footer from '../Footer/Footer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';


export class UserLogin extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleClick = () => {
        this.props.history.push('/ResetPassword')
      }
    
    handleSignUpPage = () => {
        this.props.history.push('/SignUpForm')
      }
    
    handleForgotPasswordPage = () => {
        this.props.history.push('/ForgotPassword')
      }
    
    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
    
        this.setState({
          [name]: value
        });
      }
    
      handleSubmit(e) {
        e.preventDefault();
      }

    render() {
        return (
            <div>
                <div>
                    <Container maxWidth="xs" style={{ marginTop:'50px', marginBottom:'110px' }}>
                        <CssBaseline />
                            <div >
                            <Avatar style={{marginLeft:'170px',marginBottom:'10px', backgroundColor: '#3d5afe'}}>
                                <AccountCircleIcon />
                            </Avatar>
                             <Typography component="h1" variant="h5" style={{marginLeft:'150px'}}>
                                 Sign In 
                            </Typography>
                            <form noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={this.state.email} onChange={this.handleChange}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={this.state.password} onChange={this.handleChange}
                                />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Link to="/" style={{ marginTop:'20px', textDecoration: 'none' }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{marginBottom:'10px'}}
                            >
                                Sign In
                            </Button>
                            </Link>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="/ForgotPassword" style={{ marginTop:'20px', textDecoration: 'none' }}>
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                <Link to="/SignUp" style={{ marginTop:'20px', textDecoration: 'none' }}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                                </Grid>
                            </Grid>
                            </form>
                        </div>
                    </Container>
            <div style={{marginTop: '40px'}}>
        </div>
    </div>
</div>
        )
    }
}

export default UserLogin
