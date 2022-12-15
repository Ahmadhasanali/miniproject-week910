import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { login } from '../../redux/actions/auth';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangeEmail = e => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = e => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = () => {
        setLoading(true);

        dispatch(login(email, password))
            .then(() => {
                navigate('/profile');
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
    };

    if (isLoggedIn) {
        return <Navigate to="/profile" />;
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <div>
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

                    {message && (
                        <div className="form-group mt-3">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}

                    <div className="form-group mt-3">
                        <button onClick={handleLogin}
                            className="btn btn-primary btn-block"
                            disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm" />
                            )}
                            <span>Log In</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
