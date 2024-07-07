'use client'

import Loading from '@/components/Loading'
import PersonBox from '@/components/PersonBox'
import { Person } from '@/types/Person'
import { colors } from '@/utils/colors'
import { Menu, Search } from '@mui/icons-material'
import { Box, IconButton, TextField, Typography } from '@mui/material'
import { Fragment, useEffect, useState } from 'react'

export default function Home() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [members, setMembers] = useState<Person[]>([])
    const [displayMembers, setDisplayMembers] = useState<Person[]>([])
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        getMembers()
    }, [])

    useEffect(() => {
        if (isSearch) {
            setDisplayMembers(members.filter(member => member.name.toLowerCase().includes(search.toLowerCase())))
        } else {
            setDisplayMembers(members.filter(member => (['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '1.1'].includes(member.code)) && member.status === 'Biological').sort(compareDates))
        }
    }, [members, search, isSearch])

    const getMembers = async () => {
        setIsLoading(true)
        await fetch('/api')
            .then(response => response.json())
            .then(json => {
                setMembers(json.data as Person[])
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const compareDates = (a: Person, b: Person) => {
        let dateA = new Date(a.dob)
        let dateB = new Date(b.dob)

        if (dateA < dateB) return -1
        if (dateA > dateB) return 1
        return 0
    }

    const toggleSearch = () => {
        if (isSearch) {
            setDisplayMembers(members)
        }
        setIsSearch(!isSearch)
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
            <IconButton>
                <Menu
                    sx={{
                        color: 'transparent'
                    }}
                />
            </IconButton>
            <Typography fontWeight='bold' fontSize={25} align='center'>Moch Edris Families</Typography>
            <IconButton
                onClick={() => toggleSearch()}
            >
                <Search
                    sx={{
                        color: colors.green[50]
                    }}
                />
            </IconButton>
        </Box>
        {isSearch ? <TextField
            fullWidth
            sx={{
                mb: 2,
                border: 2,
                borderColor: colors.green[400],
                borderRadius: 2,
                '& .MuiInputBase-input': {
                    color: colors.green[50]
                }
            }}
            size='small'
            placeholder='Cari ...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        /> : <Fragment></Fragment>}
        {isLoading ? <Loading /> :
            <Box pb={0.5}>
                {displayMembers.map((member) => <PersonBox member={member} key={member.id} />)}
            </Box>
        }
    </Fragment>
}