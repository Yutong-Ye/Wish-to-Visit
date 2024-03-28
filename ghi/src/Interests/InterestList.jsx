import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';

function InterestList() {
    const { token } = useToken();
    const navigate = useNavigate();
    const [interests, setInterests] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState('')

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
        const fetchRandomImage = async () => {
            const apiKey =
                'Yt9YBDUeyPvTAqQEm61VBAcrf0I2w8DnPULji6ePjC0C0OToRvsPK9S5'
            const url =
                'https://api.pexels.com/v1/search?query=nature&per_page=15'

            try {
                const response = await fetch(url, {
                    headers: {
                        Authorization: apiKey,
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    const randomIndex = Math.floor(
                        Math.random() * data.photos.length
                    )
                    setBackgroundImage(data.photos[randomIndex].src.landscape)
                }
            } catch (error) {
                console.error('Error fetching image from Pexels:', error)
            }
        }
        fetchRandomImage();
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
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '20px',
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '40px',
                    borderRadius: '10px',
                    width: '50%',
                    maxWidth: '600px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
            <h2>User Interests</h2>
            {interests.map((interest, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <p>Interest: {interest.interests}</p>
                    <p>Hobbies: {interest.hobbies}</p>
                    <p>Perfect Day Description: {interest.perfect_day_description}</p>
                    <p>Children: {interest.children ? 'Yes' : 'No'}</p>
                    {interest.pet_picture_url && (
                        <div >
                            <p>Pet Picture:</p>
                            <img src={interest.pet_picture_url} alt="Pet" style={{ display: 'inline-block', width: '200px', height: 'auto'}} />
                        </div>
                    )}
                    <button onClick={() => handleEditInterest(interest.interest_id)}>Edit</button>
                </div>
            ))}
            </div>
        </div>
    );
}

export default InterestList;
