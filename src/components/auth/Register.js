import { MDBInput } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { register } from '../../redux/actions/auth';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangeUsername = e => {
        const Username = e.target.value;
        setUsername(Username);
    };

    const onChangeEmail = e => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = e => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = () => {
        dispatch(register(username, email, password))
            .then(() => {
                setSuccess(true);
            })
            .catch(() => {
                setSuccess(false);
            });
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">

                <div>
                    {!success && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    required
                                />
                            </div>

                            <div className="form-group mt-3">
                                <button onClick={handleRegister}
                                    className="btn btn-primary btn-block">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group mt-3">
                            <div className={`alert alert-${success ? 'success' : 'danger'}`} role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Register;
