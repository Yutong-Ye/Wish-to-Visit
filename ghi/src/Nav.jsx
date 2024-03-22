import { NavLink, useNavigate } from 'react-router-dom'
import useToken from '@galvanize-inc/jwtdown-for-react'

function Nav() {
    const navigate = useNavigate()
    const { logout, token } = useToken()
    const isLoggedIn = Boolean(token)

    const handleLogout = async () => {
        const logoutSuccess = await logout()
        if (logoutSuccess) {
            console.log('Logout successful')
            navigate('/')
        } else {
            console.error('Logout failed')
        }
    }

    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark custom-navbar"
            style={{ backgroundColor: 'transparent' }}
        >
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
                <NavLink className="navbar-brand navbar-text-black" to="/">
                    Home
                </NavLink>
                {isLoggedIn ? (
                    <>
                        <NavLink
                            className="navbar-brand navbar-text-black"
                            to="/countries"
                        >
                            Countries
                        </NavLink>
                        <NavLink
                            className="navbar-brand navbar-text-black"
                            to="/wishes"
                        >
                            Create Wishes
                        </NavLink>
                        <NavLink
                            className="navbar-brand navbar-text-black"
                            to="/wishlist"
                        >
                            Wishes
                        </NavLink>
                        <NavLink
                            className="navbar-brand navbar-text-black"
                            to="/visit"
                        >
                            Record a Visit
                        </NavLink>
                        <NavLink
                            className="navbar-brand navbar-text-black"
                            to="/visitlist"
                        >
                            Passport Stamps
                        </NavLink>
                        <NavLink
                            className="navbar-brand navbar-text-black"
                            to="/interests"
                        >
                            Interests
                        </NavLink>
                        <NavLink
                            className="navbar-brand navbar-text-black"
                            to="/settings"
                        >
                            Settings
                        </NavLink>
                        <button
                            onClick={handleLogout}
                            className="navbar-brand navbar-text-black"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink
                            className="navbar-brand navbar-text-black"
                            to="/signup"
                        >
                            Sign Up
                        </NavLink>
                        <NavLink
                            className="navbar-brand navbar-text-black"
                            to="/login"
                        >
                            Login
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav
