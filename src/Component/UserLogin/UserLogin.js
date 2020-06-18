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
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


export class UserLogin extends Component {
    render() {
        return (
            <div>
                <div>
                    <Headerbar />
                        <Container maxWidth="xs" style={{marginTop:'50px', marginBottom:'110px'}}>
                        <CssBaseline />
                            <div className="paper">
                             <Typography component="h1" variant="h5">
                                <AccountCircleIcon /> Sign In 
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
                                />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{marginBottom:'10px'}}
                            >
                                Sign In
                            </Button>
                        <Grid container>
                            <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                            </Grid>
                            <Grid item>
                            <Link href="#" variant="body2" style={{marginTop:'20px'}}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                            </Grid>
                        </Grid>
                </form>
                </div>
            </Container>
            <div style={{marginTop: '40px'}}>
            <Footer />
        </div>
    </div>
</div>
        )
    }
}

export default UserLogin
