import { colors } from '@/utils/colors'
import { Box, CircularProgress } from '@mui/material'

export default function Loading() {
    return <Box
        sx={{
            display: 'flex',
            justifyContent: 'center'
        }}
    >
        <CircularProgress
            sx={{
                color: colors[400]
            }}
        />
    </Box>
}