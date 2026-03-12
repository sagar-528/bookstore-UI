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
    padding: '40px 40px',
    maxWidth: 460,
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
    marginBottom: 28,
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
const errStyle = {
    color: '#C0392B',
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    marginTop: 2,
    marginBottom: 8,
};
const row = { display: 'flex', gap: 12 };
const inputProps = { style: { borderRadius: 10, fontFamily: "'Inter', sans-serif" } };

export class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fields: {}, errors: {},
            userName: '', password: '', emailId: '', phoneNumber: '',
            admin: false, user: false,
            serverError: '', loading: false,
        }
    }

    handleSetName = (e) => {
        const val = e.target.value;
        this.setState(prev => ({ userName: val, fields: { ...prev.fields, Name: val } }))
    }
    handleSetPassword = (e) => {
        const val = e.target.value;
        this.setState(prev => ({ password: val, fields: { ...prev.fields, password: val } }))
    }
    handleSetPhoneNumber = (e) => {
        const val = e.target.value;
        this.setState(prev => ({ phoneNumber: val, fields: { ...prev.fields, PhoneNumber: val } }))
    }
    handleSetEmailAddress = (e) => {
        const val = e.target.value;
        this.setState(prev => ({ emailId: val, fields: { ...prev.fields, emailId: val } }))
    }
    handleSelectRoleAdmin = () => { this.setState({ admin: !this.state.admin }) }
    handleSelectRoleUser = () => { this.setState({ user: !this.state.user }) }

    handleSubmitSignUpForm = async (e) => {
        e.preventDefault();
        if (!this.validateForm()) return;
        const role = [];
        if (this.state.admin) role.push("admin");
        if (this.state.user) role.push("user");
        if (role.length === 0) role.push("user");
        this.setState({ loading: true, serverError: '' });
        try {
            await data.signUpData(this.state.userName, this.state.password, this.state.emailId, this.state.phoneNumber, role);
            this.props.history.push('/UserLogin');
        } catch (err) {
            this.setState({ serverError: 'Registration failed. Username may already exist.', loading: false });
        }
    }

    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!fields["Name"] || !fields["Name"].match(/^[a-zA-Z]{3,}$/)) {
            formIsValid = false;
            errors["Name"] = !fields["Name"] ? "*Enter your Name." : "*Alphabets only, min 3 chars.";
        }
        if (!fields["PhoneNumber"] || !fields["PhoneNumber"].match(/^[0-9]{10}$/)) {
            formIsValid = false;
            errors["PhoneNumber"] = !fields["PhoneNumber"] ? "*Enter your mobile no." : "*Valid 10-digit number required.";
        }
        if (!fields["emailId"] || !fields["emailId"].match(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)) {
            formIsValid = false;
            errors["emailId"] = !fields["emailId"] ? "*Enter your email." : "*Valid email required.";
        }
        if (!fields["password"] || !fields["password"].match(/^[a-zA-Z0-9]{3,}$/)) {
            formIsValid = false;
            errors["password"] = !fields["password"] ? "*Enter a password." : "*Min 3 chars required.";
        }
        this.setState({ errors });
        return formIsValid;
    }

    render() {
        return (
            <div style={authWrap}>
                <div style={authCard}>
                    <div style={{ textAlign: 'center', marginBottom: 12 }}>
                        <span style={{ fontSize: 40 }}>📚</span>
                    </div>
                    <div style={authTitle}>Create Account</div>
                    <div style={authSub}>Join the Bookstore community</div>
                    {this.state.serverError && <div style={{ background: '#FDEDEE', border: '1px solid #F5C6CB', borderRadius: 8, padding: '10px 14px', fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#C0392B', textAlign: 'center', marginBottom: 16 }}>{this.state.serverError}</div>}
                    <form noValidate onSubmit={this.handleSubmitSignUpForm}>
                        <div style={row}>
                            <div style={{ flex: 1 }}>
                                <TextField variant="outlined" required fullWidth label="Name" size="small"
                                    value={this.state.userName} InputProps={inputProps}
                                    onChange={this.handleSetName} />
                                <div style={errStyle}>{this.state.errors.Name}</div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <TextField variant="outlined" required fullWidth label="Phone Number" size="small"
                                    value={this.state.phoneNumber} InputProps={inputProps}
                                    onChange={this.handleSetPhoneNumber} />
                                <div style={errStyle}>{this.state.errors.PhoneNumber}</div>
                            </div>
                        </div>
                        <TextField variant="outlined" required fullWidth label="Email Address" size="small"
                            value={this.state.emailId} InputProps={inputProps}
                            onChange={this.handleSetEmailAddress} style={{ marginBottom: 4 }}/>
                        <div style={errStyle}>{this.state.errors.emailId}</div>

                        <TextField variant="outlined" required fullWidth label="Password" type="password" size="small"
                            value={this.state.password} InputProps={inputProps}
                            onChange={this.handleSetPassword} style={{ marginBottom: 4 }}/>
                        <div style={errStyle}>{this.state.errors.password}</div>

                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#555770', marginBottom: 12 }}>
                            <span style={{ fontWeight: 600, marginRight: 12 }}>Role:</span>
                            <label style={{ marginRight: 16, cursor: 'pointer' }}>
                                <input type="checkbox" id="adminRole" onChange={this.handleSelectRoleAdmin} style={{ marginRight: 4 }}/> Admin
                            </label>
                            <label style={{ cursor: 'pointer' }}>
                                <input type="checkbox" id="userRole" onChange={this.handleSelectRoleUser} style={{ marginRight: 4 }}/> User
                            </label>
                        </div>

                        <Button fullWidth variant="contained" style={btnPrimary}
                            type="submit" disabled={this.state.loading}>
                            {this.state.loading ? 'Creating account...' : 'Sign Up'}
                        </Button>
                        <div style={{ textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: 13 }}>
                            <Link to="/UserLogin">Already have an account? Sign in</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignUp
