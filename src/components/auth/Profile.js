import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { user: currentUser } = useSelector(state => state.auth);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.first_name} {currentUser.last_name}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{' '}
                {currentUser.token.substr(currentUser.token.length - 20)}
            </p>
            <p>
                <strong>ID:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
        </div>
    );
};

export default Profile;
