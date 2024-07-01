'use client'

import DetailBox from '@/components/DetailBox'
import Loading from '@/components/Loading'
import PersonBox from '@/components/PersonBox'
import { DetailPerson, Person } from '@/types/Person'
import { colors } from '@/utils/colors'
import { ArrowBack, Menu } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'

interface Params {
    code: string
}

export default function Detail({ params }: { params: Params }) {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selfs, setSelfs] = useState<DetailPerson[]>([])
    const [childs, setChilds] = useState<Person[]>([])
    const [parents, setParents] = useState<Person[]>([])

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
            <Box pb={0.5}>
                {selfs.map((self) => <DetailBox detail={self} key={self.code.concat(self.name)} />)}
            </Box>
            {isLoading ? <Loading /> :
                <Fragment>
                    {parents.length ? <Fragment>
                        <Typography fontWeight='bold' mb={1}>Orang Tua</Typography>
                        <Box pb={0.5}>
                            {parents.map((parent) => <PersonBox member={parent} key={parent.code.concat(parent.name)} />)}
                        </Box>
                    </Fragment> : <Fragment></Fragment>}
                    {childs.length ? <Fragment>
                        <Typography fontWeight='bold' mb={1}>Anak</Typography>
                        <Box pb={0.5}>
                            {childs.map((child) => <PersonBox member={child} key={child.code.concat(child.name)} />)}
                        </Box>
                    </Fragment> : <Fragment></Fragment>}
                </Fragment>
            }
        </Box>
    </Fragment>
}