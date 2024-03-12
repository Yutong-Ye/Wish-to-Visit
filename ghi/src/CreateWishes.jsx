import React, { useEffect, useState } from 'react'
// import useToken from '@galvanize-inc/jwtdown-for-react'

// const { token } = useToken()

// useEffect(() => {
//     if (token) {
//         fetch('http://localhost:8000/wishes', {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         })
//             .then((response) => response.json())
//             .then((data) => setWishes(data))
//             .catch((error) =>
//                 console.error('Error fetching wishes:', error)
//             )
//     }
// }, [token])

function Wishes() {
    const [wishes, setWishes] = useState([])
    const [newWish, setNewWish] = useState({
        destination: '',
        country: '',
        description: '',
        planned_date: '',
        status: '',
    })

    const handleInputChange = (event) => {
        setNewWish({ ...newWish, [event.target.name]: event.target.value })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        if (!newWish.destination) return

        setWishes([...wishes, { ...newWish, list_id: wishes.length + 1 }])
        setNewWish({
            destination: '',
            country: '',
            description: '',
            planned_date: '',
            status: '',
        })
    }

    return (
        <>
            <div className="shadow p-4 mt-4 form-background">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>My Wishes</h1>
                            <form onSubmit={handleFormSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        name="destination"
                                        value={newWish.destination}
                                        onChange={handleInputChange}
                                        placeholder="Destination"
                                        className="form-control"
                                    />
                                    <label htmlFor="destination"></label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        name="country"
                                        value={newWish.country}
                                        onChange={handleInputChange}
                                        placeholder="Country"
                                        className="form-control"
                                    />
                                    <label htmlFor="country"></label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        name="description"
                                        value={newWish.description}
                                        onChange={handleInputChange}
                                        placeholder="Description"
                                        className="form-control"
                                    />
                                    <label htmlFor="description"></label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        name="planned_date"
                                        value={newWish.planned_date}
                                        onChange={handleInputChange}
                                        placeholder="Planned Date"
                                        className="form-control"
                                    />
                                    <label htmlFor="planned_date"></label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        name="status"
                                        value={newWish.status}
                                        onChange={handleInputChange}
                                        placeholder="Status"
                                        className="form-control"
                                    />
                                    <label htmlFor="status"></label>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Create new wish
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Wishes
