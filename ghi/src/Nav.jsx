import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';

function Nav() {
    const navigate = useNavigate();
    const { logout, token } = useToken();
    const isLoggedIn = Boolean(token);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const decodeToken = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    };

    const username = token ? decodeToken(token).account.username : '';

    const handleLogout = async () => {
        const logoutSuccess = await logout();
        if (logoutSuccess) {
            navigate('/');
        } else {
            console.error('Logout failed');
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar"
            style={{
                width: '100vw',
                position: 'relative',
                left: '50%',
                right: '50%',
                marginLeft: '-50vw',
                marginRight: '-50vw'
            }}>
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavLink className="navbar-brand navbar-text-black" to="/">Home</NavLink>
                {isLoggedIn ? (
                    <>
                        <NavLink className="navbar-brand navbar-text-black" to="/countries">Countries</NavLink>
                        <NavLink className="navbar-brand navbar-text-black" to="/wishes">Create Wishes</NavLink>
                        <NavLink className="navbar-brand navbar-text-black" to="/wishlist">Wishes</NavLink>
                        <NavLink className="navbar-brand navbar-text-black" to="/visit">Record a Visit</NavLink>
                        <NavLink className="navbar-brand navbar-text-black" to="/visitlist">Passport Stamps</NavLink>
                        <NavLink className="navbar-brand navbar-text-black" to="/interests">Interests</NavLink>
                        <div className="navbar-item" onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={{ cursor: 'pointer' }}>
                            <span className="navbar-brand navbar-text-black">{username} ▼</span>
                            {isDropdownOpen && (
                                <div className="dropdown-content">
                                    <NavLink className="dropdown-item" to="/settings">Settings</NavLink>
                                    <div className="dropdown-divider"></div>
                                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <NavLink className="navbar-brand navbar-text-black" to="/signup">Sign Up</NavLink>
                        <NavLink className="navbar-brand navbar-text-black" to="/login">Login</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Nav;
