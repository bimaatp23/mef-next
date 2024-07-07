import { DetailPerson } from '@/types/Person'
import { Color, colors } from '@/utils/colors'
import { Edit, WhatsApp } from '@mui/icons-material'
import { Box, Button, Checkbox, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import CustomModal from './CustomModal'

interface Props {
    detail: DetailPerson
    updateBio(newBio: DetailPerson): void
}

export default function DetailBox(props: Props) {
    const activeColors: Color = props.detail.status === 'Biological' ? (props.detail.code.startsWith('0') ? colors.green : colors.blue) : (props.detail.code.startsWith('0') ? colors.softGreen : colors.softBlue)
    const [editOpen, setEditOpen] = useState<boolean>(false)
    const [editBio, setEditBio] = useState<DetailPerson>(props.detail)
    const [isDie, setIsDie] = useState<boolean>(!!props.detail.dod)

    useEffect(() => {
        setEditBio(props.detail)
    }, [props.detail])

    const openWhatsApp = (phone: string) => {
        const anchor = document.createElement('a')
        anchor.href = `https://wa.me/${phone.trim()}`
        anchor.target = '_blank'
        anchor.click()
    }

    const onEditChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditBio({
            ...editBio,
            [e.target.id]: e.target.value
        })
    }

    const editModal = () => {
        return <CustomModal
            open={editOpen}
            onClose={() => setEditOpen(false)}
        >
            <Typography align='center' fontSize={20} mb={2}>Edit Biodata</Typography>
            <TextField
                fullWidth
                sx={{
                    mb: 2,
                }}
                size='small'
                label='Nama *'
                id='name'
                value={editBio.name}
                onChange={onEditChange}
            />
            <TextField
                fullWidth
                sx={{
                    mb: 2,
                }}
                size='small'
                label='Tanggal Lahir *'
                id='dob'
                value={editBio.dob}
                onChange={onEditChange}
                type='date'
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id='gender-label' size='small'>Gender *</InputLabel>
                <Select
                    size='small'
                    labelId='gender-label'
                    value={editBio.gender}
                    label='Gender *'
                    onChange={(e) => setEditBio({
                        ...editBio,
                        gender: e.target.value as any
                    })}
                >
                    <MenuItem value='Male'>Pria</MenuItem>
                    <MenuItem value='Female'>Wanita</MenuItem>
                </Select>
            </FormControl>
            <TextField
                fullWidth
                sx={{
                    mb: 2,
                }}
                size='small'
                label='Alamat *'
                id='address'
                value={editBio.address}
                onChange={onEditChange}
            />
            <TextField
                fullWidth
                size='small'
                label='No Telepon'
                id='phone'
                placeholder='Contoh : 62xxxxxxxxxxx'
                value={editBio.phone}
                onChange={onEditChange}
            />
            <FormControlLabel
                control={<Checkbox checked={isDie} onChange={(e) => {
                    setEditBio({
                        ...editBio,
                        dod: e.target.checked ? '2000-01-01' : null
                    })
                    setIsDie(e.target.checked)
                }} />}
                label={<Typography color='grey' fontSize={15}>sudah meninggal?</Typography>}
            />
            {isDie ? <TextField
                fullWidth
                sx={{
                    mb: 1,
                }}
                size='small'
                label='Tanggal Meninggal'
                id='dod'
                value={editBio.dod}
                onChange={onEditChange}
                type='date'
            /> : <Fragment></Fragment>}
            <Typography color='grey' fontSize={15} mb={1}>* wajib diisi</Typography>
            <Button
                variant='contained'
                color='success'
                fullWidth
                onClick={() => {
                    setEditOpen(false)
                    props.updateBio(editBio)
                }}
            >
                Simpan
            </Button>
        </CustomModal>
    }

    return <Box
        sx={{
            background: activeColors[400],
            borderRadius: 2,
            overflow: 'hidden',
            pl: 1,
            mb: 2
        }}
    >
        <Box
            sx={{
                background: activeColors[950],
                display: 'flex',
                gap: 2,
                flexDirection: 'column',
                alignItems: 'center',
                height: 'fit-content',
                px: 1,
                py: 2,
                position: 'relative'
            }}
        >
            <IconButton
                sx={{
                    position: 'absolute',
                    right: 2,
                    top: 2
                }}
                onClick={() => setEditOpen(true)}
            >
                <Edit
                    sx={{
                        color: activeColors[400]
                    }}
                />
            </IconButton>
            {editModal()}
            <Box
                sx={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '100%',
                    border: 2,
                    borderColor: activeColors[400],
                    overflow: 'hidden'
                }}
            >
                <Image src='/assets/profile.png' alt='Profile Image' width={150} height={150} />
            </Box>
            <Box sx={{ width: '100%' }}>
                <Typography fontSize={20}>Nama : {props.detail.name}</Typography>
                <Typography fontSize={20}>Tanggal Lahir : {moment(props.detail.dob).format('DD MMMM YYYY')}</Typography>
                {props.detail.dod ? <Typography fontSize={20}>Tanggal Meninggal : {moment(props.detail.dod).format('DD MMMM YYYY')}</Typography> : <Fragment></Fragment>}
                <Typography fontSize={20}>Gender : {props.detail.gender === 'Male' ? 'Pria' : 'Wanita'}</Typography>
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