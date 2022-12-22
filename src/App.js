import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

import Home from './components/home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { logout } from './redux/actions/auth';
import { clearMessage } from './redux/actions/message';

function App() {
  const { user: currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    if (['/login', '/register'].includes(location.pathname)) {
      dispatch(clearMessage());
    }
  }, [dispatch, location]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark ml-auto">
        <Link to={'/'} className="navbar-brand">
          miniTodo
        </Link>


        {currentUser ? (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href={'/login'} className="nav-link" onClick={handleLogout}>
                Log Out
              </a>
            </li>
          </ul>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={'/login'} className="nav-link">
                Log In
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/register'} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
