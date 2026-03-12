import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
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
const errBanner = {
    background: '#FDEDEE',
    border: '1px solid #F5C6CB',
    borderRadius: 8,
    padding: '10px 14px',
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    color: '#C0392B',
    textAlign: 'center',
    marginBottom: 16,
};

export class RestPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggle: false,
            confirmToggle: false,
            password: '',
            confirmPassword: '',
            error: '',
        }
    }

    componentDidMount() {
        var currentUrl = window.location.href;
        var token = currentUrl.slice(36);
        localStorage.setItem("token", token);
    }

    SetNewPassword = (e) => { this.setState({ password: e.target.value, error: '' }) }
    SetConfirmPassword = (e) => { this.setState({ confirmPassword: e.target.value, error: '' }) }

    SubmitPassoword = async () => {
        if (this.state.password === this.state.confirmPassword) {
            await data.resetPassword(this.state.password);
            this.setState({ confirmToggle: true });
            localStorage.removeItem("token");
        } else {
            this.setState({ error: "Passwords don't match. Please try again." });
        }
    }

    render() {
        if (this.state.confirmToggle) {
            return <Redirect to="/UserLogin" />
        }
        return (
            <div style={authWrap}>
                <div style={authCard}>
                    <div style={{ textAlign: 'center', marginBottom: 16 }}>
                        <span style={{ fontSize: 40 }}>🔒</span>
                    </div>
                    <div style={authTitle}>Reset Password</div>
                    <div style={authSub}>Choose a new secure password</div>

                    {this.state.error && <div style={errBanner}>{this.state.error}</div>}

                    <form noValidate>
                        <TextField variant="outlined" margin="dense" required fullWidth
                            label="New Password" type="password" autoFocus
                            InputProps={{ style: { borderRadius: 10, fontFamily: "'Inter', sans-serif" } }}
                            onChange={this.SetNewPassword}
                            style={{ marginBottom: 16 }}/>
                        <TextField variant="outlined" margin="dense" required fullWidth
                            label="Confirm Password" type="password"
                            InputProps={{ style: { borderRadius: 10, fontFamily: "'Inter', sans-serif" } }}
                            onChange={this.SetConfirmPassword}
                            style={{ marginBottom: 8 }}/>
                        <Button fullWidth variant="contained" style={btnPrimary}
                            onClick={this.SubmitPassoword}>
                            Reset Password
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default RestPassword
