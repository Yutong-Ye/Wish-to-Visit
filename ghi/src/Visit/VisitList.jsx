import { useEffect, useState } from 'react'
import useToken from '@galvanize-inc/jwtdown-for-react'

function VisitList() {
    const { token } = useToken()
    const [visits, setVisits] = useState([])
    const [backgroundImage, setBackgroundImage] = useState('')

    const getVisits = async () => {
        const fetchConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const response = await fetch(
            `${import.meta.env.VITE_API_HOST}/visit`,
            fetchConfig
        )
        if (response.ok) {
            const visits = await response.json()
            setVisits(visits || [])
        } else {
            console.error('Failed to fetch past visits')
        }
    }

    const handleDeleteVisit = async (visitId) => {
        const deleteVisitUrl = `${
            import.meta.env.VITE_API_HOST
        }/visit/${visitId}`
        const fetchConfig = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const response = await fetch(deleteVisitUrl, fetchConfig)
        if (response.ok) {
            console.log('Visit deleted successfully')
            getVisits()
        } else {
            console.error('Failed to delete the visit')
        }
    }

    const fetchRandomImage = async () => {
        const apiKey =
            'Yt9YBDUeyPvTAqQEm61VBAcrf0I2w8DnPULji6ePjC0C0OToRvsPK9S5'
        const randomPage = Math.floor(Math.random() * 100) + 1
        const url = `https://api.pexels.com/v1/search?query=nature&per_page=1&page=${randomPage}`

        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: apiKey,
                },
            })

            if (response.ok) {
                const data = await response.json()
                setBackgroundImage(data.photos[0].src.large)
            }
        } catch (error) {
            console.error('Error fetching image from Pexels:', error)
        }
    }

    useEffect(() => {
        getVisits()
        fetchRandomImage()
    }, [])

return (
    <div
        className="wishlist-background"
        style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            padding: '20px',
        }}
    >
        <div className="container pt-6" style={{ padding: '20px' }}>
            <div className="row justify-content-center">
                <div className="col-md-30">
                    <div className="card-columns">
                        {visits &&
                            visits.map((visit) => (
                                <div
                                    className="card transparent-card"
                                    key={visit.visit_id}
                                    style={{
                                        margin: '10px',
                                        borderRadius: '15px',
                                    }}
                                >
                                    {visit.picture_url && (
                                        <img
                                            className="card-img-top"
                                            src={visit.picture_url}
                                            alt={`Image of ${visit.visit_name}`}
                                        />
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {visit.visit_name}
                                        </h5>
                                        <p className="card-text">
                                            {visit.description}
                                        </p>
                                        <p className="card-text">
                                            <small className="text-muted">
                                                Start: {visit.start_date}
                                            </small>
                                        </p>
                                        <p className="card-text">
                                            <small className="text-muted">
                                                End: {visit.end_date}
                                            </small>
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                handleDeleteVisit(
                                                    visit.visit_id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default VisitList
