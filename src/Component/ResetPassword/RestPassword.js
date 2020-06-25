import React, { Component } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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

export class RestPassword extends Component {
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
                             <Typography component="h1" variant="h5" style={{marginLeft:'110px', marginBottom:"10px"}}>
                                 Reset Password
                            </Typography>
                            <form noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="New Password"
                                    autoFocus
                                />
                                 <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Confirm Password"
                                    autoFocus
                                />
                                 <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Link to="/UserLogin" style={{ marginTop:'20px', textDecoration: 'none' }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{marginBottom:'10px'}}
                            >
                                Confirm
                            </Button>
                            </Link>
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

export default RestPassword
