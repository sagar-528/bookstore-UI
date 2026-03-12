import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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

const inputStyle = {
    marginBottom: 16,
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

const linkRow = {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
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

const successBanner = {
    background: '#E8F8F0',
    border: '1px solid #A3D9B1',
    borderRadius: 8,
    padding: '10px 14px',
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    color: '#27AE60',
    textAlign: 'center',
    marginBottom: 16,
};

class UserLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            error: '',
            success: '',
            loading: false,
            showPassword: false,
        }
    }

    handleChangeUsername = (e) => { this.setState({ username: e.target.value, error: '' }) }
    handleChangePassword = (e) => { this.setState({ password: e.target.value, error: '' }) }

    handleChangeLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const username = this.state.username || form.querySelector('input[autocomplete="username"]')?.value || '';
        const password = this.state.password || form.querySelector('input[type="password"]')?.value || form.querySelector('input[autocomplete="current-password"]')?.value || '';
        if (!username || !password) {
            this.setState({ error: 'Please enter both username and password.' });
            return;
        }
        this.setState({ username, password, loading: true, error: '' });
        try {
            const res = await data.signInData(username, password);
            if (res && res.accessToken) {
                this.setState({ success: 'Login successful! Redirecting...', loading: false });
                setTimeout(() => {
                    this.props.history.push('/');
                }, 500);
            } else {
                this.setState({
                    error: (res && res.message) || 'Invalid username or password.',
                    loading: false,
                });
            }
        } catch (err) {
            this.setState({ error: 'Login failed. Please try again.', loading: false });
        }
    }

    render() {
        return (
            <div style={authWrap}>
                <div style={authCard}>
                    <div style={{ textAlign: 'center', marginBottom: 16 }}>
                        <span style={{ fontSize: 40 }}>📚</span>
                    </div>
                    <div style={authTitle}>Welcome Back</div>
                    <div style={authSub}>Sign in to your Bookstore account</div>

                    {this.state.error && <div style={errBanner}>{this.state.error}</div>}
                    {this.state.success && <div style={successBanner}>{this.state.success}</div>}

                    <form noValidate onSubmit={this.handleChangeLogin}>
                        <TextField variant="outlined" margin="dense" required fullWidth
                            label="Username" name="username" autoComplete="username" autoFocus
                            value={this.state.username}
                            style={inputStyle}
                            InputProps={{ style: { borderRadius: 10, fontFamily: "'Inter', sans-serif" } }}
                            onChange={this.handleChangeUsername} />
                        <TextField variant="outlined" margin="dense" required fullWidth
                            label="Password" name="password" type={this.state.showPassword ? 'text' : 'password'} autoComplete="current-password"
                            value={this.state.password}
                            style={inputStyle}
                            InputProps={{
                                style: { borderRadius: 10, fontFamily: "'Inter', sans-serif" },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton size="small" onClick={() => this.setState(prev => ({ showPassword: !prev.showPassword }))}>
                                            {this.state.showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            onChange={this.handleChangePassword} />
                        <Button fullWidth variant="contained" style={btnPrimary}
                            type="submit" disabled={this.state.loading}>
                            {this.state.loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                        <div style={linkRow}>
                            <Link to="/ForgotPassword">Forgot password?</Link>
                            <Link to="/SignUp">Create account</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default UserLogin
