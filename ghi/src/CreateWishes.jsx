import React, { useEffect, useState } from 'react'

function Wishes() {
    const [wishes, setWishes] = useState([])
    const [newWish, setNewWish] = useState({
        wish_name: '',
        description: '',
        start_date: '',
        end_date: '',
        picture_url: '',
    })

    const handleInputChange = (event) => {
        setNewWish({ ...newWish, [event.target.name]: event.target.value })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        if (!newWish.wish_name || !newWish.description) return

        setWishes([...wishes, { ...newWish, wish_id: wishes.length + 1 }])
        setNewWish({
            wish_name: '',
            description: '',
            start_date: '',
            end_date: '',
            picture_url: '',
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
                                        name="wish_name"
                                        value={newWish.wish_name}
                                        onChange={handleInputChange}
                                        placeholder="Wish Name"
                                        className="form-control"
                                    />
                                    <label htmlFor="wish_name">Wish Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <textarea
                                        name="description"
                                        value={newWish.description}
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
                                        value={newWish.start_date}
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
                                        value={newWish.end_date}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                    <label htmlFor="end_date">End Date</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        name="picture_url"
                                        value={newWish.picture_url}
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
                                    Create New Wish
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
