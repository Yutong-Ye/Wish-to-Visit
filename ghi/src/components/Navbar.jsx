import { Stack, Paper, Typography, Box } from '@mui/material'

const Navbar = () => {
    return (
        <Box>
            <Paper
                elevation={2}
                sx={{
                    paddingInline: { lg: '5rem', md: '2.5rem', xs: '1rem' },
                    paddingBlock: '1.5rem',
                    borderRadius: 0,
                }}
            >
                <Stack justifyContent="space-between" direction="row">
                    <Typography
                        sx={{
                            fontWeight: '800',
                            fontSize: { md: '1.5rem', xs: '0.875rem' },
                        }}
                    >
                        Where in the world?
                    </Typography>
                    <Stack
                        direction="row"
                        gap={1}
                        alignItems="center"
                        sx={{
                            fontWeight: '500',
                            fontSize: { md: '1rem', xs: '0.75rem' },
                        }}
                    >
                        <span>
                            <button
                                style={{
                                    padding: 0,
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                }}
                            ></button>
                            <button
                                style={{
                                    padding: 0,
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                }}
                            ></button>
                        </span>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    )
}

export default Navbar
