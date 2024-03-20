import { Link } from 'react-router-dom'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Item } from '../assets/animation'

const CountryCard = ({ country }) => {
    return (
        <motion.div variants={Item}>
            <Card
                sx={{
                    maxWidth: '16.5rem',
                }}
            >
                <Link
                    to={`/countries/${country?.name?.common}`}
                    aria-label={`${country?.name?.common} details`}
                >
                    <CardMedia
                        image={country?.flags?.png}
                        alt={country?.flags?.alt}
                        sx={{ width: '16.5rem', height: '10rem' }}
                    />
                </Link>
                <CardContent
                    sx={{
                        height: 174,
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: 'Nunito Sans',
                            fontWeight: '700',
                            fontSize: '1.25rem',
                            letterSpacing: '-0.065em',
                        }}
                        variant="subtitle1"
                    >
                        {country?.name?.common}
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
                        {country?.population.toLocaleString('en-US')}
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
                        {country?.region}
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
                        {country?.capital}
                    </Typography>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default CountryCard
