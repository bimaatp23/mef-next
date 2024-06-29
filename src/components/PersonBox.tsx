import { Person } from '@/types/Person'
import { colors } from '@/utils/colors'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'

interface Props {
    member: Person
}

export default function PersonBox(props: Props) {
    return <Box sx={{ background: colors[400], borderRadius: 2, overflow: 'hidden', pl: 1, cursor: 'pointer', mb: 2 }}>
        <Box sx={{ background: colors[950], display: 'flex', gap: 2, alignItems: 'center', height: '70px', paddingX: 1 }}>
            <Box sx={{ width: '50px', height: '50px', borderRadius: '100%', border: 2, borderColor: colors[400] }}>
                <Image src='/assets/profile.png' alt='Profile Image' width={50} height={50}/>
            </Box>
            <Typography fontSize={20}>{props.member.name}</Typography>
        </Box>
    </Box>
}