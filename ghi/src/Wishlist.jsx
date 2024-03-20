import { useEffect, useState } from 'react'
import useToken from '@galvanize-inc/jwtdown-for-react'

function WishList() {
    const { token } = useToken()
    const [wishes, setWishes] = useState([])

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
            console.log(wishes) // Log the response data
            setWishes(wishes || []) // Set to an empty array if data.wishes is undefined
        } else {
            console.error('Failed to fetch wishes')
        }
    }

    useEffect(() => {
        getWishes()
    }, [])

    return (
        <>
            <div className="shadow p-4 mt-4 form-background">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>My Wish List</h1>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Wish Name</th>
                                        <th>Description</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Picture</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wishes &&
                                        wishes.map((wish) => {
                                            return (
                                                <tr key={wish.id}>
                                                    <td>{wish.wish_name}</td>
                                                    <td>{wish.description}</td>
                                                    <td>{wish.start_date}</td>
                                                    <td>{wish.end_date}</td>
                                                    <td>
                                                        {wish.picture_url && (
                                                            <img
                                                                src={
                                                                    wish.picture_url
                                                                }
                                                                alt={`Image of ${wish.wish_name}`}
                                                                style={{
                                                                    maxWidth:
                                                                        '100px',
                                                                    maxHeight:
                                                                        '100px',
                                                                }}
                                                            />
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WishList
