import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';

function EditInterest() {
    const { token } = useToken();
    const { interestId } = useParams();
    const navigate = useNavigate();
    const [interestData, setInterestData] = useState({
        interests: '',
        hobbies: '',
        perfect_day_description: '',
        children: false,
        pet_picture_url: '',
    });

    useEffect(() => {

        const fetchInterestData = async () => {
            const fetchConfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/interests/${interestId}`, fetchConfig);
            if (response.ok) {
                const data = await response.json();
                setInterestData(data);
            } else {
                console.error('Failed to fetch interest data');
            }
        };

        fetchInterestData();
    }, [interestId, token]);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setInterestData({ ...interestData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const updateInterestUrl = `${import.meta.env.VITE_API_HOST}/interests/${interestId}`;
        const fetchConfig = {
            method: 'PUT',
            body: JSON.stringify(interestData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(updateInterestUrl, fetchConfig);
        if (response.ok) {
            navigate('/interests');
        } else {
            console.error('Failed to update interest');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Edit Interest</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label>Interests</label>
                    <input
                        type="text"
                        name="interests"
                        value={interestData.interests}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Hobbies</label>
                    <input
                        type="text"
                        name="hobbies"
                        value={interestData.hobbies}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Perfect Day Description</label>
                    <input
                        type="text"
                        name="perfect_day_description"
                        value={interestData.perfect_day_description}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group form-check">
                    <input
                        type="checkbox"
                        name="children"
                        checked={interestData.children}
                        onChange={handleInputChange}
                        className="form-check-input"
                        id="childrenCheckbox"
                    />
                    <label className="form-check-label" htmlFor="childrenCheckbox">Children</label>
                </div>
                <div className="form-group">
                    <label>Pet Picture URL</label>
                    <input
                        type="text"
                        name="pet_picture_url"
                        value={interestData.pet_picture_url}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Interest</button>
            </form>
        </div>
    );
}

export default EditInterest;
