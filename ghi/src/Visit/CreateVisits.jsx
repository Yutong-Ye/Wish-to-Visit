import { useState, useEffect } from 'react' // Added useEffect import
import { useNavigate } from 'react-router-dom'
import useToken from '@galvanize-inc/jwtdown-for-react'

function Visit() {
    const { token } = useToken()
    const navigate = useNavigate()

    const [newVisit, setNewVisit] = useState({
        visit_name: '',
        description: '',
        start_date: null,
        end_date: null,
        picture_url: '',
    })

    const [backgroundImage, setBackgroundImage] = useState('')

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

    const handleInputChange = (event) => {
        setNewVisit({ ...newVisit, [event.target.name]: event.target.value })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        if (!newVisit.visit_name || !newVisit.description) return
        const createVisitUrl = `${import.meta.env.VITE_API_HOST}/visit`
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(newVisit),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }

        const response = await fetch(createVisitUrl, fetchConfig)
        if (response.ok) {
            navigate('/visitlist')
        } else {
            console.error('Failed to create your visit')
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
                            <h1 className="text-center">My Visited Places</h1>{' '}
                            <form onSubmit={handleFormSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        name="visit_name"
                                        value={newVisit.visit_name}
                                        onChange={handleInputChange}
                                        placeholder="Visit Name"
                                        className="form-control"
                                    />
                                    <label htmlFor="visit_name">
                                        Visit Name
                                    </label>
                                </div>
                                <div className="form-floating mb-3">
                                    <textarea
                                        name="description"
                                        value={newVisit.description}
                                        onChange={handleInputChange}
                                        placeholder="Description"
                                        className="form-control"
                                    />
                                    <label htmlFor="description">
                                        Description
                                    </label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="date"
                                        name="start_date"
                                        value={newVisit.start_date}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                    <label htmlFor="start_date">
                                        Start Date
                                    </label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="date"
                                        name="end_date"
                                        value={newVisit.end_date}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                    <label htmlFor="end_date">End Date</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        name="picture_url"
                                        value={newVisit.picture_url}
                                        onChange={handleInputChange}
                                        placeholder="Picture URL"
                                        className="form-control"
                                    />
                                    <label htmlFor="picture_url">
                                        Picture URL
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Create New Visit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Visit
