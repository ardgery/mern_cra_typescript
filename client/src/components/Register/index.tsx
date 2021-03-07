import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { apiCall } from '../../utility';
import './style.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser() {
        const res = await apiCall('/api/register', { email, password });
        console.log(res)
    }
    return (
        <div className="form">
            <h1>Register</h1>
            <form className="register-fields">
                <TextField fullWidth value={email} onChange={(e: any) => setEmail(e.target.value)} placeholder="you@awesome.com" label="Your Email" variant="outlined" />
                <TextField fullWidth value={password} onChange={(e: any) => setPassword(e.target.value)} placeholder="p@$$w0rd" label="Password" variant="outlined" />
                <Button color="primary" variant="contained" onClick={registerUser}>Register</Button>
            </form>
        </div>
    )
}
