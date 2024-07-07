import { Person } from '@/types/Person'
import { Color, colors } from '@/utils/colors'
import { Close } from '@mui/icons-material'
import { Box, Button, IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import CustomModal from './CustomModal'

interface Props {
    member: Person
    deleteMember?(member: Person): void
}

export default function PersonBox(props: Props) {
    const router = useRouter()
    const activeColors: Color = props.member.status === 'Biological' ? (props.member.code.startsWith('0') ? colors.green : colors.blue) : (props.member.code.startsWith('0') ? colors.softGreen : colors.softBlue)
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)

    return <Box sx={{ background: activeColors[400], borderRadius: 2, overflow: 'hidden', pl: 1, cursor: 'pointer', mb: 2 }}>
        <Box sx={{ background: activeColors[950], display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', height: '70px', paddingX: 1, width: '100%' }} onClick={() => router.push(`/${props.member.code}`)}>
                <Box sx={{ width: '50px', height: '50px', borderRadius: '100%', border: 2, borderColor: activeColors[400] }}>
                    <Image src='/assets/profile.png' alt='Profile Image' width={50} height={50} />
                </Box>
                <Typography fontSize={20}>{props.member.name}</Typography>
            </Box>
            {props.deleteMember ? <Fragment
            >
                <IconButton
                    onClick={() => setIsDeleteOpen(true)}
                >
                    <Close
                        sx={{
                            color: '#b71c1c'
                        }}
                    />
                </IconButton>
                <CustomModal
                    open={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                >
                    <Typography align='center' fontSize={20} mb={2}>Yakin hapus data <b>{props.member.name}</b>?</Typography>
                    <Typography align='center' fontSize={17} mb={2}>Data Pasangan dan Anak dari <b>{props.member.name}</b> akan ikut TERHAPUS!</Typography>
                    <Button
                        variant='contained'
                        color='error'
                        fullWidth
                        onClick={() => {
                            setIsDeleteOpen(false)
                            if (props.deleteMember) props.deleteMember(props.member)
                        }}
                    >
                        Hapus
                    </Button>
                </CustomModal>
            </Fragment> : <Fragment></Fragment>}
        </Box>
    </Box>
}