import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import HTTPServices from '../../HTTPServices';

var data = new HTTPServices();

const authWrap = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #F4F1EC 0%, #E8E3DA 100%)',
    padding: 24,
};
const authCard = {
    background: '#FFFFFF',
    borderRadius: 16,
    boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
    padding: '48px 40px',
    maxWidth: 420,
    width: '100%',
};
const authTitle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 28,
    fontWeight: 700,
    color: '#1A1A2E',
    textAlign: 'center',
    marginBottom: 4,
};
const authSub = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    color: '#8E8EA0',
    textAlign: 'center',
    marginBottom: 32,
};
const btnPrimary = {
    background: 'linear-gradient(135deg, #8B2131 0%, #6B1525 100%)',
    color: 'white',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: 15,
    textTransform: 'none',
    borderRadius: 10,
    padding: '12px 0',
    marginTop: 8,
    marginBottom: 16,
};

export class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = { emailId: '' }
    }

    handleEmailAddress = (e) => { this.setState({ emailId: e.target.value }) }
    handleForgotPassword = () => { data.forgotPasswordMail(this.state.emailId) }

    render() {
        return (
            <div style={authWrap}>
                <div style={authCard}>
                    <div style={{ textAlign: 'center', marginBottom: 16 }}>
                        <span style={{ fontSize: 40 }}>🔑</span>
                    </div>
                    <div style={authTitle}>Forgot Password</div>
                    <div style={authSub}>Enter your email and we'll send a reset link</div>
                    <form noValidate>
                        <TextField variant="outlined" margin="dense" required fullWidth
                            label="Email Address" autoComplete="email" autoFocus
                            InputProps={{ style: { borderRadius: 10, fontFamily: "'Inter', sans-serif" } }}
                            onChange={this.handleEmailAddress}
                            style={{ marginBottom: 16 }}/>
                        <Link to="/ResetPassword/*" style={{ textDecoration: 'none' }}>
                            <Button fullWidth variant="contained" style={btnPrimary}
                                onClick={this.handleForgotPassword}>
                                Send Reset Link
                            </Button>
                        </Link>
                        <div style={{ textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: 13 }}>
                            <Link to="/SignUp">Don't have an account? Sign Up</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ForgotPassword
