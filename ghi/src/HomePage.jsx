import React, { useState } from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';

function HomePage() {
  const { token, login } = useToken();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const isLoggedIn = Boolean(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      window.location.reload();
    } else {
      setLoginError('Login Failed. Please check credentials.');
    }
  };

  return (

    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Wish to Visit</h1>
      <div className="col-lg-6 mx-auto">
        {isLoggedIn ? (
          <p className="lead mb-4">
            Welcome back! Ready for your next adventure?
          </p>
        ) : (
          <>
            <p className="lead mb-4">
              *Motivational Phrase Here!* Sign up or log in to start planning your next trip.
            </p>
            <div className="login-form">
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit">Login</button>
                {loginError && <div className="login-error">{loginError}</div>}
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
