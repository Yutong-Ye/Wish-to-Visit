import { Box, Paper, Typography, IconButton } from '@mui/material'
import { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import All from './All'
import { fetchFromAPI } from '../assets/fetchFromAPI'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'

import { CircularProgress } from '@mui/material'

const Search = () => {
    const [countries, setCountries] = useState(null)
    const { searchTerm } = useParams()

    useEffect(() => {
        fetchFromAPI(`name/${searchTerm}`).then((data) => setCountries(data))
    }, [searchTerm])

    return (
        <Box sx={{ marginInline: { md: '3rem', lg: '5rem', xs: '1rem' } }}>
            <Typography
                variant="subtitle2"
                sx={{
                    fontFamily: 'Nunito Sans',
                    marginBlock: { md: '3rem', xs: '1.5rem' },
                }}
            >
                <span
                    style={{
                        fontSize: '1rem',
                        letterSpacing: '-0.065em',
                        fontWeight: '600',
                    }}
                >
                    Search results for:
                </span>{' '}
                {searchTerm}
            </Typography>
            <Link to="/" aria-label="home page">
                <Paper
                    sx={{
                        display: 'inline-block',
                        gap: '8px',
                        marginBlock: { md: '3rem', xs: '1.5rem' },
                        paddingInline: '1.5rem',
                    }}
                    elevation={2}
                >
                    <IconButton>
                        <MdOutlineKeyboardBackspace />
                    </IconButton>
                    <Typography
                        sx={{
                            textDecoration: 'none',
                            display: 'inline',
                            fontFamily: 'Nunito Sans',
                        }}
                    >
                        Back
                    </Typography>
                </Paper>
            </Link>
            {countries ? (
                <All countries={countries} />
            ) : (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            )}
        </Box>
    )
}

export default Search
