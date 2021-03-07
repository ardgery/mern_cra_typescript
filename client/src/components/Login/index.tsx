import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { apiCall } from '../../utility';
import './style.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function loginUser() {
        const res = await apiCall('/api/login', { email, password });

        if (res.status === 'ok') {
            // TODO: Bad practice => should use refresh tokens
            localStorage.setItem('token', res.data);
            alert('You are logged in');
            history.push('/chat');
        } else {
            alert(res.error);
        }
    }
    return (
        <div className="form">
            <h1>Login</h1>
            <form className="register-fields">
                <TextField fullWidth value={email} onChange={(e: any) => setEmail(e.target.value)} placeholder="you@awesome.com" label="Your Email" variant="outlined" />
                <TextField fullWidth value={password} onChange={(e: any) => setPassword(e.target.value)} placeholder="p@$$w0rd" label="Password" variant="outlined" />
                <Button color="primary" variant="contained" onClick={loginUser}>Login</Button>
            </form>
        </div>
    )
}
