import { DetailPerson } from '@/types/Person'
import { colors } from '@/utils/colors'
import { WhatsApp } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import { Fragment } from 'react'

interface Props {
    detail: DetailPerson
}

export default function DetailBox(props: Props) {
    const openWhatsApp = (phone: string) => {
        const anchor = document.createElement('a')
        anchor.href = `https://wa.me/${phone}`
        anchor.target = '_blank'
        anchor.click()
    }

    return <Box sx={{ background: colors[400], borderRadius: 2, overflow: 'hidden', pl: 1, mb: 2 }}>
        <Box sx={{ background: colors[950], display: 'flex', gap: 2, flexDirection: 'column', alignItems: 'center', height: 'fit-content', px: 1, py: 2 }}>
            <Box sx={{ width: '150px', height: '150px', borderRadius: '100%', border: 2, borderColor: colors[400] }}>
                <Image src='/assets/profile.png' alt='Profile Image' width={150} height={150} />
            </Box>
            <Box sx={{ width: '100%' }}>
                <Typography fontSize={20}>Nama : {props.detail.name}</Typography>
                <Typography fontSize={20}>Tanggal Lahir : {moment(props.detail.dob).format('DD MMMM YYYY')}</Typography>
                {props.detail.dod ? <Typography fontSize={20}>Tanggal Meninggal : {moment(props.detail.dod).format('DD MMMM YYYY')}</Typography> : <Fragment></Fragment>}
                <Typography fontSize={20}>Gender : {props.detail.gender}</Typography>
                <Typography fontSize={20}>Alamat : {props.detail.address}</Typography>
            </Box>
            {props.detail.phone ? <Box>
                <Button
                    variant='contained'
                    color='success'
                    sx={{ textTransform: 'none' }}
                    onClick={() => openWhatsApp(props.detail.phone || '')}
                >
                    <WhatsApp sx={{ mr: 0.5 }} />
                    WhatsApp
                </Button>
            </Box> : <Fragment></Fragment>}
        </Box>
    </Box>
}