import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';

function CreateInterests() {
    const { token } = useToken();
    const navigate = useNavigate();
    const [newInterest, setNewInterest] = useState({
        interests: '',
        hobbies: '',
        perfect_day_description: '',
        children: false,
        pet_picture_url: '',
    });
    const [backgroundImage, setBackgroundImage] = useState('');

    useEffect(() => {
        const fetchRandomImage = async () => {
            const apiKey = 'Yt9YBDUeyPvTAqQEm61VBAcrf0I2w8DnPULji6ePjC0C0OToRvsPK9S5';
            const url = 'https://api.pexels.com/v1/search?query=nature&per_page=15';

            try {
                const response = await fetch(url, {
                    headers: {
                        Authorization: apiKey,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const randomIndex = Math.floor(Math.random() * data.photos.length);
                    setBackgroundImage(data.photos[randomIndex].src.landscape);
                }
            } catch (error) {
                console.error('Error fetching image from Pexels:', error);
            }
        };

        fetchRandomImage();
    }, []);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setNewInterest({ ...newInterest, [name]: type === 'checkbox' ? checked : value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const createInterestUrl = `${import.meta.env.VITE_API_HOST}/interests`;
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(newInterest),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(createInterestUrl, fetchConfig);
        if (response.ok) {
            navigate('/interests');
        } else {
            console.error('Failed to create a new interest');
        }
    };

    return (
        <div
            className="create-interests-background"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
            }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="shadow p-4 mt-4 bg-white">
                            <h1 className="text-center">Create Interest</h1>
                            <form onSubmit={handleFormSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        name="interests"
                                        value={newInterest.interests}
                                        onChange={handleInputChange}
                                        placeholder="Interest Name"
                                        className="form-control"
                                    />
                                    <label htmlFor="Interests">Interests</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <textarea
                                        name="hobbies"
                                        value={newInterest.hobbies}
                                        onChange={handleInputChange}
                                        placeholder="Hobbies"
                                        className="form-control"
                                    />
                                    <label htmlFor="hobbies">Hobbies</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <textarea
                                        name="perfect_day_description"
                                        value={newInterest.perfect_day_description}
                                        onChange={handleInputChange}
                                        placeholder="Perfect Day Description"
                                        className="form-control"
                                    />
                                    <label htmlFor="perfect_day_description">Perfect Day Description</label>
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        type="checkbox"
                                        name="children"
                                        id="children"
                                        checked={newInterest.children}
                                        onChange={handleInputChange}
                                        className="form-check-input"
                                    />
                                    <label htmlFor="children" className="form-check-label">Children</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        name="pet_picture_url"
                                        value={newInterest.pet_picture_url}
                                        onChange={handleInputChange}
                                        placeholder="Pet Picture URL"
                                        className="form-control"
                                    />
                                    <label htmlFor="pet_picture_url">Pet Picture URL</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateInterests
