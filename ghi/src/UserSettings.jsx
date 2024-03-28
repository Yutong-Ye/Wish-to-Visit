import React, { useState, useEffect } from 'react'
import useToken from '@galvanize-inc/jwtdown-for-react'
import { useNavigate } from 'react-router-dom'

const UserSettings = () => {
    const { token } = useToken()
    const [userData, setUserData] = useState({ username: '', email: '' })
    const [backgroundImage, setBackgroundImage] = useState('')
    const navigate = useNavigate()

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

    const handleEditClick = () => {
        navigate('/settings/edit')
    }

    useEffect(() => {
        const decodeToken = (token) => {
            const base64Url = token.split('.')[1]
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(function (c) {
                        return (
                            '%' +
                            ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                        )
                    })
                    .join('')
            )

            return JSON.parse(jsonPayload)
        }

        const fetchUserData = () => {
            if (token) {
                try {
                    const decodedToken = decodeToken(token)
                    const { account } = decodedToken
                    if (account) {
                        setUserData({
                            username: account.username,
                            email: account.email,
                        })
                    }
                } catch (error) {
                    console.error('Failed to decode token', error)
                }
            }
        }

        fetchUserData()
    }, [token])

return (
    <div
        style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '20px',
        }}
    >
        <div
            style={{
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '40px',
                borderRadius: '10px',
                width: '50%',
                maxWidth: '600px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h2>User Settings</h2>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <button onClick={handleEditClick}>Edit</button>
        </div>
    </div>
)
}

export default UserSettings
