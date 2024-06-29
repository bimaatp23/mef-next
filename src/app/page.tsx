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
      getSearchMembers(search)
    }
  }, [search, isSearch])

  const getMembers = async () => {
    setIsLoading(true)
    await fetch('/api')
      .then(response => response.json())
      .then(json => {
        setMembers(json.data as Person[])
        setDisplayMembers(json.data as Person[])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const getSearchMembers = (keyword: string) => {
    if (keyword) {
      setDisplayMembers(members.filter(member => member.name.toLowerCase().includes(keyword.toLowerCase())))
    } else {
      setDisplayMembers([])
    }
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
        height: '100vh',
        m: 2
      }}
    >
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
              color: colors[50]
            }}
          />
        </IconButton>
        <Typography fontWeight='bold' fontSize={25} align='center'>Moch Edris Families</Typography>
        <IconButton
          onClick={() => toggleSearch()}
        >
          <Search
            sx={{
              color: colors[50]
            }}
          />
        </IconButton>
      </Box>
      {isSearch ? <TextField
        fullWidth
        sx={{
          mb: 2,
          border: 2,
          borderColor: colors[400],
          borderRadius: 2,
          '& .MuiInputBase-input': {
            color: colors[50]
          }
        }}
        size='small'
        placeholder='Cari ...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      /> : <Fragment></Fragment>}
      {isLoading ? <Loading /> : 
        <Box sx={{ pb: 2 }}>
          {displayMembers.map((member) => <PersonBox member={member} key={member.code.concat(member.name)} />)}
        </Box>
      }
    </Box>
  </Fragment>
}