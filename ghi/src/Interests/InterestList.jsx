import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';

function InterestList() {
    const { token } = useToken();
    const navigate = useNavigate();
    const [interests, setInterests] = useState([]);

    const getInterests = async () => {
        const fetchConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/interests`, fetchConfig);
        if (response.ok) {
            const interestsData = await response.json();
            setInterests(interestsData || []);
        } else {
            console.error('Failed to fetch interests');
        }
    };

    useEffect(() => {
        getInterests();
    }, []);

    const handleEditInterest = (interestId) => {
        navigate(`/interests/edit/${interestId}`);
    };

    if (interests.length === 0) {
        return (
            <div className="empty-interests-page" style={{ textAlign: 'center', paddingTop: '50px' }}>
                <h2>Sorry, there are no interests yet. Would you like to add them?</h2>
                <button onClick={() => navigate('/interests/create')} className="btn btn-primary">Add Interests</button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>User Interests</h2>
            {interests.map((interest, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <p>Interest: {interest.interests}</p>
                    <p>Hobbies: {interest.hobbies}</p>
                    <p>Perfect Day Description: {interest.perfect_day_description}</p>
                    <p>Children: {interest.children ? 'Yes' : 'No'}</p>
                    {interest.pet_picture_url && (
                        <div>
                            <p>Pet Picture:</p>
                            <img src={interest.pet_picture_url} alt="Pet" style={{ width: '100px', height: 'auto' }} />
                        </div>
                    )}
                    <button onClick={() => handleEditInterest(interest.interest_id)}>Edit</button>
                </div>
            ))}
        </div>
    );
}

export default InterestList;
