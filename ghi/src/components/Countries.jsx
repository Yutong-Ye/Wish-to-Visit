import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchFromAPI } from '../assets/fetchFromAPI'
import { Stack, Box } from '@mui/system'
import { CircularProgress } from '@mui/material'
import { FiSearch } from 'react-icons/fi'
import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
} from '@mui/material'
import All from './All'

const Countries = () => {
    const [region, setRegion] = useState('')
    const [countries, setCountries] = useState(null)
    const [countriesPerRegion, setCountriesPerRegion] = useState(null)
    const [countryName, setCountryName] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        fetchFromAPI('all').then((data) => setCountries(data))
    }, [])

    useEffect(() => {
        if (region) {
            fetchFromAPI(`region/${region}`).then((data) =>
                setCountriesPerRegion(data)
            )
        }
    }, [region])

    const handleChange = (e) => {
        setRegion(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault

        if (countryName) {
            navigate(`/search/${countryName}`)

            setCountryName('')
        }
    }

    return (
        <Box sx={{ marginInline: { md: '3rem', lg: '5rem', xs: '1rem' } }}>
            <Stack
                alignItems={{ md: 'center', xs: 'start' }}
                justifyContent="space-between"
                direction={{ md: 'row', xs: 'column' }}
                gap={{ xs: 6 }}
                sx={{ marginBlock: { md: '3rem', xs: '1.5rem' } }}
            >
                <Paper
                    component="form"
                    elevation={2}
                    onSubmit={handleSubmit}
                    sx={{
                        pl: '1.5rem',
                        paddingBlock: { md: '0.875rem', xs: '0.5rem' },
                        width: {
                            xs: '100%',
                            md: '10rem',
                            lg: '30rem',
                            color: 'hsl(0, 0%, 52%)',
                        },
                    }}
                >
                    <IconButton
                        sx={{
                            pr: '1.5rem',
                            fontSize: { xs: '1.2rem', md: 'auto' },
                        }}
                    >
                        <FiSearch />
                    </IconButton>
                    <input
                        placeholder="Search for a country..."
                        value={countryName}
                        onChange={(e) => setCountryName(e.target.value)}
                        className="search-bar"
                    />
                </Paper>
                <Paper elevation={2}>
                    <FormControl
                        sx={{
                            minWidth: '200px',
                            fonSize: '0.5rem',
                        }}
                        className="region"
                    >
                        <InputLabel
                            id="region"
                            sx={{
                                fontFamily: 'Nunito Sans',
                            }}
                        >
                            Filter by region
                        </InputLabel>
                        <Select
                            labelId="region"
                            value={region}
                            label="filter"
                            id="region-select"
                            className="region"
                            onChange={handleChange}
                            sx={{
                                fontFamily: 'Nunito Sans',
                            }}
                        >
                            <MenuItem
                                value="africa"
                                sx={{ fontFamily: 'Nunito Sans' }}
                            >
                                Africa
                            </MenuItem>
                            <MenuItem
                                value="america"
                                sx={{ fontFamily: 'Nunito Sans' }}
                            >
                                America
                            </MenuItem>
                            <MenuItem
                                value="asia"
                                sx={{ fontFamily: 'Nunito Sans' }}
                            >
                                Asia
                            </MenuItem>
                            <MenuItem
                                value="europe"
                                sx={{ fontFamily: 'Nunito Sans' }}
                            >
                                Europe
                            </MenuItem>
                            <MenuItem
                                value="oceania"
                                sx={{ fontFamily: 'Nunito Sans' }}
                            >
                                Oceania
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Paper>
            </Stack>

            {countries || countriesPerRegion ? (
                <All
                    countries={
                        countriesPerRegion ? countriesPerRegion : countries
                    }
                />
            ) : (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            )}
        </Box>
    )
}

export default Countries
