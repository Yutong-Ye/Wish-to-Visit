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
        const response = await fetch('http://localhost:8000/visit', fetchConfig)
        if (response.ok) {
            const visits = await response.json()
            console.log(visits) // Log the response data
            setVisits(visits || []) // Set to an empty array if data.wishes is undefined
        } else {
            console.error('Failed to fetch wishes')
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
                                                <tr key={visit.id}>
                                                    <td>{visit.visit_name}</td>
                                                    <td>{visit.description}</td>
                                                    <td>{visit.start_date}</td>
                                                    <td>{visit.end_date}</td>
                                                    <td>
                                                        {visit.picture_url && (
                                                            <img
                                                                src={
                                                                    visit.picture_url
                                                                }
                                                                alt={`Image of ${visit.visit_name}`}
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

export default VisitList
