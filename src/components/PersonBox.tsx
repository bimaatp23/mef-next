import { Person } from '@/types/Person'
import { Color, colors } from '@/utils/colors'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
    member: Person
}

export default function PersonBox(props: Props) {
    const router = useRouter()

    const activeColors: Color = props.member.status === 'Biological' ? colors.green : colors.blue

    return <Box sx={{ background: activeColors[400], borderRadius: 2, overflow: 'hidden', pl: 1, cursor: 'pointer', mb: 2 }} onClick={() => router.push(`/${props.member.code}`)}>
        <Box sx={{ background: activeColors[950], display: 'flex', gap: 2, alignItems: 'center', height: '70px', paddingX: 1 }}>
            <Box sx={{ width: '50px', height: '50px', borderRadius: '100%', border: 2, borderColor: activeColors[400] }}>
                <Image src='/assets/profile.png' alt='Profile Image' width={50} height={50} />
            </Box>
            <Typography fontSize={20}>{props.member.name}</Typography>
        </Box>
    </Box>
}