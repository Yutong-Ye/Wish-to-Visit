import React, { useEffect, useState } from 'react'
import useToken from '@galvanize-inc/jwtdown-for-react'

function WishList() {
    const [wishes, setWishes] = useState([])
    const { token } = useToken()

    useEffect(() => {
        if (token) {
            fetch('http://localhost:8000/wishes', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => setWishes(data))
                .catch((error) =>
                    console.error('Error fetching wishes:', error)
                )
        }
    }, [token])

    return (
        <div className="wish-list">
            <h2>My Wishes</h2>
            <ul>
                {Array.isArray(wishes) &&
                    wishes.map((wish) => (
                        <li key={wish.wish_id}>
                            <h3>{wish.wish_name}</h3>
                            <p>Description: {wish.description}</p>
                            <p>Start Date: {wish.start_date}</p>
                            <p>End Date: {wish.end_date}</p>
                            {wish.picture_url && (
                                <img
                                    src={wish.picture_url}
                                    alt={wish.wish_name}
                                />
                            )}
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default WishList
