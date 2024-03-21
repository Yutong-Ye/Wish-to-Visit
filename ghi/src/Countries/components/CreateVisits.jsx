import { useState } from 'react'
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

    const handleInputChange = (event) => {
        setNewVisit({ ...newVisit, [event.target.name]: event.target.value })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        if (!newVisit.visit_name || !newVisit.description) return
        const createVisitUrl = `http://localhost:8000/visit`
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
        <>
            <div className="shadow p-4 mt-4 form-background">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>My Visited Places</h1>
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
        </>
    )
}

export default Visit
