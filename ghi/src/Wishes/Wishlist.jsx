import { useEffect, useState } from 'react'
import useToken from '@galvanize-inc/jwtdown-for-react'

function Wishlist() {
    const { token } = useToken()
    const [wishes, setWishes] = useState([])
    const [backgroundImage, setBackgroundImage] = useState('')

    const getWishes = async () => {
        const fetchConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const response = await fetch(
            'http://localhost:8000/wishes',
            fetchConfig
        )
        if (response.ok) {
            const wishes = await response.json()
            setWishes(wishes || [])
        } else {
            console.error('Failed to fetch wishes')
        }
    }

    const handleDeleteWish = async (wishId) => {
        const deleteWishUrl = `http://localhost:8000/wishes/${wishId}`
        const fetchConfig = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const response = await fetch(deleteWishUrl, fetchConfig)
        if (response.ok) {
            console.log('Wish deleted successfully')
            getWishes()
        } else {
            console.error('Failed to delete the wish')
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
        getWishes()
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
                            {wishes.map((wish) => (
                                <div
                                    className="card transparent-card"
                                    key={wish.wish_id}
                                    style={{
                                        margin: '10px',
                                        borderRadius: '15px',
                                    }} // Soft edge style applied
                                >
                                    {wish.picture_url && (
                                        <img
                                            className="card-img-top"
                                            src={wish.picture_url}
                                            alt={`Image of ${wish.wish_name}`}
                                        />
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {wish.wish_name}
                                        </h5>
                                        <p className="card-text">
                                            {wish.description}
                                        </p>
                                        <p className="card-text">
                                            <small className="text-muted">
                                                Start: {wish.start_date}
                                            </small>
                                        </p>
                                        <p className="card-text">
                                            <small className="text-muted">
                                                End: {wish.end_date}
                                            </small>
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                handleDeleteWish(wish.wish_id)
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

export default Wishlist
