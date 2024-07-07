'use client'

import CustomModal from '@/components/CustomModal'
import DetailBox from '@/components/DetailBox'
import Loading from '@/components/Loading'
import PersonBox from '@/components/PersonBox'
import { DetailPerson, Person } from '@/types/Person'
import { colors } from '@/utils/colors'
import { Add, ArrowBack, Menu } from '@mui/icons-material'
import { Box, Button, Checkbox, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ChangeEvent, Fragment, useEffect, useState } from 'react'

interface Params {
    code: string
}

export default function Detail({ params }: { params: Params }) {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selfs, setSelfs] = useState<DetailPerson[]>([])
    const [childs, setChilds] = useState<Person[]>([])
    const [parents, setParents] = useState<Person[]>([])
    const [coupleOpen, setCoupleOpen] = useState<boolean>(false)
    const [coupleBio, setCoupleBio] = useState<DetailPerson>({
        id: 0,
        code: params.code,
        name: '',
        dob: '2000-01-01',
        dod: null,
        gender: 'Male',
        address: '',
        phone: '',
        status: 'Married-in'
    })
    const [isCoupleDie, setIsCoupleDie] = useState<boolean>(false)

    useEffect(() => {
        getDetail()
    }, [])

    const getDetail = async () => {
        setIsLoading(true)
        await fetch(`/api?code=${params.code}`)
            .then(response => response.json())
            .then(json => {
                setSelfs(json.data.selfs as DetailPerson[])
                setChilds(json.data.childs as Person[])
                setParents(json.data.parents as Person[])
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const updateBio = async (newBio: DetailPerson) => {
        setIsLoading(true)
        await fetch(`/api?id=${newBio.id}`, {
            method: 'PUT',
            body: JSON.stringify(newBio)
        })
            .then(response => response.json())
            .then(json => {
                if (json.status === 200) getDetail()
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const doAddCouple = async (newBio: DetailPerson) => {
        setIsLoading(true)
        await fetch('/api', {
            method: 'POST',
            body: JSON.stringify(newBio)
        })
            .then(response => response.json())
            .then(json => {
                if (json.status === 200) getDetail()
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const onCoupleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCoupleBio({
            ...coupleBio,
            [e.target.id]: e.target.value
        })
    }

    const addCouple = () => {
        return <CustomModal
            open={coupleOpen}
            onClose={() => setCoupleOpen(false)}
        >
            <Typography align='center' fontSize={20} mb={2}>Tambah Pasangan</Typography>
            <TextField
                fullWidth
                sx={{
                    mb: 2,
                }}
                size='small'
                label='Nama *'
                id='name'
                value={coupleBio.name}
                onChange={onCoupleChange}
            />
            <TextField
                fullWidth
                sx={{
                    mb: 2,
                }}
                size='small'
                label='Tanggal Lahir *'
                id='dob'
                value={coupleBio.dob}
                onChange={onCoupleChange}
                type='date'
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id='gender-label' size='small'>Gender *</InputLabel>
                <Select
                    size='small'
                    labelId='gender-label'
                    value={coupleBio.gender}
                    label='Gender *'
                    onChange={(e) => setCoupleBio({
                        ...coupleBio,
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
                value={coupleBio.address}
                onChange={onCoupleChange}
            />
            <TextField
                fullWidth
                size='small'
                label='No Telepon'
                id='phone'
                placeholder='Contoh : 62xxxxxxxxxxx'
                value={coupleBio.phone}
                onChange={onCoupleChange}
            />
            <FormControlLabel
                control={<Checkbox checked={isCoupleDie} onChange={(e) => {
                    setCoupleBio({
                        ...coupleBio,
                        dod: e.target.checked ? '2000-01-01' : null
                    })
                    setIsCoupleDie(e.target.checked)
                }} />}
                label={<Typography color='grey' fontSize={15}>sudah meninggal?</Typography>}
            />
            {isCoupleDie ? <TextField
                fullWidth
                sx={{
                    mb: 1,
                }}
                size='small'
                label='Tanggal Meninggal'
                id='dod'
                value={coupleBio.dod}
                onChange={onCoupleChange}
                type='date'
            /> : <Fragment></Fragment>}
            <Typography color='grey' fontSize={15} mb={1}>* wajib diisi</Typography>
            <Button
                variant='contained'
                color='success'
                fullWidth
                onClick={() => {
                    setCoupleOpen(false)
                    doAddCouple(coupleBio)
                }}
            >
                Simpan
            </Button>
        </CustomModal>
    }

    return <Fragment>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
            }}
        >
            <IconButton onClick={() => router.back()}>
                <ArrowBack
                    sx={{
                        color: colors.green[50]
                    }}
                />
            </IconButton>
            <Typography fontWeight='bold' fontSize={25} align='center'>Moch Edris Families</Typography>
            <IconButton>
                <Menu
                    sx={{
                        color: 'transparent'
                    }}
                />
            </IconButton>
        </Box>
        {isLoading ? <Loading /> :
            <Box pb={0.5}>
                <Box pb={0.5}>
                    {selfs.map((self) => <DetailBox detail={self} updateBio={updateBio} key={self.id} />)}
                    {selfs.length === 1 ? <Fragment>
                        <Box
                            sx={{
                                borderStyle: 'dashed',
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                p: 2,
                                borderColor: (params.code.startsWith('0') ? colors.softGreen : colors.softBlue)[600],
                                color: (params.code.startsWith('0') ? colors.softGreen : colors.softBlue)[600],
                                cursor: 'pointer'
                            }}
                            onClick={() => setCoupleOpen(true)}
                        >
                            <Add />
                            <Typography>Tambah Pasangan</Typography>
                        </Box>
                        {addCouple()}
                    </Fragment> : <Fragment></Fragment>}
                </Box>
                {parents.length ? <Fragment>
                    <Typography fontWeight='bold' mb={1}>Orang Tua</Typography>
                    <Box pb={0.5}>
                        {parents.map((parent) => <PersonBox member={parent} key={parent.id} />)}
                    </Box>
                </Fragment> : <Fragment></Fragment>}
                {childs.length ? <Fragment>
                    <Typography fontWeight='bold' mb={1}>Anak</Typography>
                    <Box pb={0.5}>
                        {childs.map((child) => <PersonBox member={child} key={child.id} />)}
                    </Box>
                </Fragment> : <Fragment></Fragment>}
            </Box>
        }
    </Fragment>
}