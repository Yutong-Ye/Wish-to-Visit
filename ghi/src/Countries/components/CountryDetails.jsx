import { IconButton, Typography, Paper, CircularProgress } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { useState, useEffect } from 'react'
import { fetchFromAPI } from '../assets/fetchFromAPI'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useParams, Link } from 'react-router-dom'
import WishButton from './WishButton'
import VisitButton from './VisitButton'

const CountryDetails = () => {
    const [countryDetail, setCountryDetail] = useState(null)

    const { country } = useParams()
    useEffect(() => {
        fetchFromAPI(`name/${country}`).then((data) =>
            setCountryDetail(data[0])
        )
    }, [country])

    if (!countryDetail?.name)
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )

    const nativeNames = Object.values(countryDetail?.name?.nativeName)

    const [nativeName] = nativeNames

    if (!nativeName)
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )

    const commonName = nativeName.common

    if (!countryDetail?.currencies)
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )

    const currencies = Object.values(countryDetail.currencies)

    if (!countryDetail?.languages)
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )

    const languages = Object.values(countryDetail?.languages)

    const borders = countryDetail?.borders

    return (
        <Box sx={{ marginInline: { md: '3rem', lg: '5rem', xs: '1rem' } }}>
            <Link to="/countries" aria-label="home page">
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
            <Stack
                direction={{ md: 'row', xs: 'column' }}
                alignItems={{ md: 'center', xs: 'start' }}
                justifyContent="start"
                gap={{ md: '7.75rem' }}
            >
                {countryDetail ? (
                    <>
                        <img
                            src={countryDetail?.flags?.svg}
                            className="country-detail"
                        />
                        <Box sx={{ flex: '1' }}>
                            <Typography
                                sx={{
                                    fontFamily: 'Nunito Sans',
                                    fontWeight: '700',
                                    fontSize: '1.25rem',
                                    letterSpacing: '-0.065em',
                                    mt: {
                                        md: 0,
                                        xs: '2.5rem',
                                    },
                                }}
                                variant="subtitle1"
                            >
                                {countryDetail?.name?.common}
                            </Typography>
                            <Stack
                                direction={{ xs: 'column', md: 'row' }}
                                justifyContent={{
                                    md: 'space-between',
                                    xs: 'start',
                                }}
                                sx={{ marginBlock: '2rem' }}
                            >
                                <Box>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontFamily: 'Nunito Sans',
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: '1rem',
                                                letterSpacing: '-0.065em',
                                                fontWeight: '600',
                                            }}
                                        >
                                            Native Name:
                                        </span>{' '}
                                        {commonName}
                                    </Typography>

                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontFamily: 'Nunito Sans',
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: '1rem',
                                                letterSpacing: '-0.065em',
                                                fontWeight: '600',
                                            }}
                                        >
                                            Population:
                                        </span>{' '}
                                        {countryDetail?.population.toLocaleString(
                                            'en-US'
                                        )}
                                    </Typography>

                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontFamily: 'Nunito Sans',
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: '1rem',
                                                letterSpacing: '-0.065em',
                                                fontWeight: '600',
                                            }}
                                        >
                                            Region:
                                        </span>{' '}
                                        {countryDetail?.region}
                                    </Typography>

                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontFamily: 'Nunito Sans',
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: '1rem',
                                                letterSpacing: '-0.065em',
                                                fontWeight: '600',
                                            }}
                                        >
                                            Sub Region:
                                        </span>{' '}
                                        {countryDetail?.subregion}
                                    </Typography>

                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontFamily: 'Nunito Sans',
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: '1rem',
                                                letterSpacing: '-0.065em',
                                                fontWeight: '600',
                                            }}
                                        >
                                            Capital:
                                        </span>{' '}
                                        {countryDetail?.capital[0]
                                            ? countryDetail?.capital[0]
                                            : 'None'}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        marginBlock: { md: 0, xs: '2.5rem' },
                                    }}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontFamily: 'Nunito Sans',
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: '1rem',
                                                letterSpacing: '-0.065em',
                                                fontWeight: '600',
                                            }}
                                        >
                                            Top Level Domain:
                                        </span>{' '}
                                        {countryDetail?.tld
                                            ? countryDetail?.tld[0]
                                            : ''}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontFamily: 'Nunito Sans',
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: '1rem',
                                                letterSpacing: '-0.065em',
                                                fontWeight: '600',
                                            }}
                                        >
                                            Currencies:
                                        </span>{' '}
                                        {currencies.map(
                                            (currency) => `${currency?.name} `
                                        )}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontFamily: 'Nunito Sans',
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: '1rem',
                                                letterSpacing: '-0.065em',
                                                fontWeight: '600',
                                            }}
                                        >
                                            Languages:
                                        </span>{' '}
                                        {languages.toString()}
                                    </Typography>
                                </Box>
                            </Stack>

                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontFamily: 'Nunito Sans',
                                    mb: { xs: '3rem', md: 0 },
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: '1rem',
                                        letterSpacing: '-0.065em',
                                        fontWeight: '700',
                                    }}
                                >
                                    Border Countries:
                                </span>{' '}
                                {borders
                                    ? borders.map((border, id) => (
                                          <Paper
                                              elevation={2}
                                              key={id}
                                              sx={{
                                                  display: 'inline-block',
                                                  mr: '0.7rem',
                                                  px: '1rem',
                                                  fontFamily: 'Nunito Sans',
                                              }}
                                          >
                                              {border}
                                          </Paper>
                                      ))
                                    : 'No border'}
                            </Typography>
                            <WishButton />
                            <VisitButton />
                        </Box>
                    </>
                ) : (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                )}
            </Stack>
        </Box>
    )
}

export default CountryDetails
