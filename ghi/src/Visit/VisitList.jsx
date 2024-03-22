import { useEffect, useState } from 'react'
import useToken from '@galvanize-inc/jwtdown-for-react'

function VisitList() {
    const { token } = useToken()
    const [visits, setVisits] = useState([])

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

    useEffect(() => {
        getVisits()
    }, [])

    return (
        <>
            <div className="shadow p-4 mt-4 form-background">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>My Visited List</h1>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Visit Name</th>
                                        <th>Description</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Picture</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {visits &&
                                        visits.map((visit) => {
                                            return (
                                                <tr key={visit.visit_id}>
                                                    <td>{visit.visit_name}</td>
                                                    <td>{visit.description}</td>
                                                    <td>{visit.start_date}</td>
                                                    <td>{visit.end_date}</td>
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

export default VisitList
