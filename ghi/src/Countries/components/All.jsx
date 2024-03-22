import CountryCard from './CountryCard'
import { Stack, Box } from '@mui/material'
import { container } from '../assets/animation'
import { motion } from 'framer-motion'

const All = ({ countries }) => {
    return (
        <motion.div variants={container} initial="hidden" whileInView="show">
            <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent={{ md: 'center', lg: 'start', xs: 'center' }}
                gap="4.6875rem"
                sx={{ pb: '3rem' }}
            >
                {countries?.map((item, idx) => (
                    <Box key={idx}>
                        <CountryCard country={item} />
                    </Box>
                ))}
            </Stack>
        </motion.div>
    )
}

export default All
