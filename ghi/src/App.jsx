import { useState, useEffect } from 'react'
import { createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'
import './App.css'
import HomePage from './HomePage'
import Nav from './Nav'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import Wishes from './CreateWishes'
import WishList from './Wishlist'
import { Countries, CountryDetails, Search } from './components'

export const AppContext = createContext(null)

function App() {
    const baseUrl = import.meta.env.VITE_API_HOST

    return (
        <BrowserRouter>
            <AuthProvider baseUrl={baseUrl}>
                <div className="container">
                    <Nav />
                    <Routes>
                        <Route exact path="/" element={<HomePage />}></Route>
                        <Route
                            exact
                            path="/signup"
                            element={<SignupForm />}
                        ></Route>
                        <Route
                            exact
                            path="/login"
                            element={<LoginForm />}
                        ></Route>
                        <Route exact path="/wishes" element={<Wishes />} />
                        <Route exact path="/wishlist" element={<WishList />} />
                        <Route path="/countries" element={<Countries />} />
                        <Route
                            path="/countries/:country"
                            element={<CountryDetails />}
                        />
                        <Route
                            path="/search/:searchTerm"
                            element={<Search />}
                        />
                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
