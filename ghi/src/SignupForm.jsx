import { useState } from 'react'
import useToken from '@galvanize-inc/jwtdown-for-react'
import { useNavigate } from 'react-router-dom'

const SignupForm = () => {
    const [username, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const { register } = useToken()
    const navigate = useNavigate()

    const handleRegistration = async (e) => {
        e.preventDefault()
        const accountData = {
            username: username,
            password: password,
            email: email,
        }
        try {
            await register(
                accountData,
                `${import.meta.env.VITE_API_HOST}/api/accounts`
            )
            e.target.reset()
            navigate('/login')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="card text-bg-light mb-3">
            <h5 className="card-header">Signup</h5>
            <div className="card-body">
                <form onSubmit={(e) => handleRegistration(e)}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            name="username"
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            name="email"
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <input
                            className="btn btn-primary"
                            type="submit"
                            value="Submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignupForm
