import React, { useState, useEffect } from 'react'
import useToken from '@galvanize-inc/jwtdown-for-react'

function HomePage() {
    const { token, login } = useToken()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const [backgroundImage, setBackgroundImage] = useState('')

    const isLoggedIn = Boolean(token)

    useEffect(() => {
        const fetchRandomImage = async () => {
            const apiKey = 'Yt9YBDUeyPvTAqQEm61VBAcrf0I2w8DnPULji6ePjC0C0OToRvsPK9S5'
            const url = 'https://api.pexels.com/v1/search?query=nature&per_page=15'

            try {
                const response = await fetch(url, {
                    headers: {
                        Authorization: apiKey,
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    const randomIndex = Math.floor(Math.random() * data.photos.length)
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
        const success = await login(email, password)
        if (success) {
            window.location.reload()
        } else {
            setLoginError('Login Failed. Please check credentials.')
        }
    }

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
                paddingTop: '20px', // Added padding top to move the box closer to the top
            }}
        >
            <div
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '40px',
                    borderRadius: '10px',
                    width: '60vw', // Adjusted width to make the box wider
                    height: '50vw', // Set height to match width for a square box
                    maxWidth: '600px', // Adjusted max width for responsiveness
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <div className="px-4 py-5 my-5 text-center">
                    <h1 className="display-5 fw-bold">Wish to Visit</h1>
                    <div className="col-lg-6 mx-auto">
                        <img
                            src="/Wish-to-Visit-logo.jpg"
                            alt="Wish to Visit Logo"
                            style={{
                                width: '250px',
                                height: '200px',
                                borderRadius: '50%',
                                display: 'block',
                                margin: '0 auto'
                            }}
                        />
                        {isLoggedIn ? (
                            <p className="lead mb-4">
                                <strong>Welcome back!</strong> Ready for your next adventure?
                            </p>
                        ) : (
                            <>
                                <p className="lead mb-4">
                                    <strong>Explore the world, one destination at a time.</strong> Sign up or log in to
                                    start planning your next trip.
                                </p>
                                <div className="login-form">
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                            />
                                        </div>
                                        <button type="submit">Login</button>
                                        {loginError && (
                                            <div className="login-error">
                                                {loginError}
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
