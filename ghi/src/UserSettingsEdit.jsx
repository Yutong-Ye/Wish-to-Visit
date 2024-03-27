import React, { useState, useEffect } from 'react'
import useToken from '@galvanize-inc/jwtdown-for-react'
import { useNavigate } from 'react-router-dom'

const UserSettingsEdit = () => {
    const { token, logout } = useToken()
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [backgroundImage, setBackgroundImage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]))
            const { account } = decodedToken

            if (account) {
                setUserData({
                    username: account.username || '',
                    email: account.email || '',
                    password: '',
                })
            }
        }
    }, [token])

    useEffect(() => {
        const fetchRandomImage = async () => {
            const apiKey =
                'Yt9YBDUeyPvTAqQEm61VBAcrf0I2w8DnPULji6ePjC0C0OToRvsPK9S5'
            const url =
                'https://api.pexels.com/v1/search?query=nature&per_page=15'

            try {
                const response = await fetch(url, {
                    headers: {
                        Authorization: apiKey,
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    const randomIndex = Math.floor(
                        Math.random() * data.photos.length
                    )
                    setBackgroundImage(data.photos[randomIndex].src.landscape)
                }
            } catch (error) {
                console.error('Error fetching image from Pexels:', error)
            }
        }

        fetchRandomImage()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            username: userData.username,
            email: userData.email,
            password: userData.password,
        }

        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]))
            const { account } = decodedToken

            const response = await fetch(
                `http://localhost:8000/api/user/${account.user_id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                }
            )

            if (!response.ok) {
                throw new Error(
                    `Failed to update user settings. Status: ${response.status}`
                )
            }

            console.log('User settings updated successfully')
            const logoutSuccess = await logout()
            if (logoutSuccess) {
                console.log('Logout successful')
                navigate('/')
            } else {
                console.error('Logout failed')
            }
        } catch (error) {
            console.error('Error updating user settings:', error)
        }
    }

    return (
        <div
            className="random-image"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
            }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="shadow p-4 mt-4 bg-white">
                            <h1 className="text-center">User Settings</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        value={userData.username}
                                        onChange={(e) =>
                                            setUserData({
                                                ...userData,
                                                username: e.target.value,
                                            })
                                        }
                                        placeholder="Username"
                                        className="form-control"
                                    />
                                    <label htmlFor="username">Username</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        value={userData.email}
                                        onChange={(e) =>
                                            setUserData({
                                                ...userData,
                                                email: e.target.value,
                                            })
                                        }
                                        placeholder="Email"
                                        className="form-control"
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        value={userData.password}
                                        onChange={(e) =>
                                            setUserData({
                                                ...userData,
                                                password: e.target.value,
                                            })
                                        }
                                        placeholder="Password"
                                        className="form-control"
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Update Settings
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSettingsEdit
