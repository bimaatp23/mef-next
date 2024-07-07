import { BaseResp } from '@/types/BaseResp'
import { DetailResp } from '@/types/DetailResp'
import { DetailPerson, Person } from '@/types/Person'
import { member } from '@/utils/constant'
import fetchSql from '@/utils/db'
import moment from 'moment'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams
    const code: string = query.get('code') || ''
    try {
        if (code) {
            const generation = code.toString().split('.')
            const parentGeneration = generation.slice(0, generation.length - 1)
            const self = await fetchSql(`SELECT ${member.detail} FROM members WHERE code = '${code}' ORDER BY status ASC`)
            const parent = await fetchSql(`SELECT ${member.general} FROM members WHERE code = '${parentGeneration.join('.')}' ORDER BY status ASC`)
            const child = await fetchSql(`SELECT ${member.general} FROM members WHERE status = 'Biological' AND code LIKE '${code}.%' AND code NOT LIKE '${code}.%.%' ORDER BY code ASC`)
            const result: DetailResp = {
                status: 200,
                message: 'OK',
                data: {
                    selfs: (self.rows as DetailPerson[]).map((value) => {
                        return {
                            ...value,
                            dob: moment(value.dob).format('YYYY-MM-DD'),
                            dod: value.dod ? moment(value.dod).format('YYYY-MM-DD') : null
                        }
                    }),
                    parents: parent.rows as DetailPerson[],
                    childs: child.rows as Person[]
                }
            }
            return NextResponse.json(result)
        } else {
            const members = await fetchSql(`SELECT ${member.general} FROM members ORDER BY name ASC`)
            const result: BaseResp = {
                status: 200,
                message: 'OK',
                data: (members.rows as Person[]).map((value) => {
                    return {
                        ...value,
                        dob: moment(value.dob).format('YYYY-MM-DD')
                    }
                })
            }
            return NextResponse.json(result)
        }
    } catch (err) {
        console.error('Error:', err)
        const error: BaseResp = {
            status: 500,
            message: 'Internal Server Error'
        }
        return NextResponse.json(error, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
    const query = request.nextUrl.searchParams
    const newBio: DetailPerson = await request.json()
    try {
        await fetchSql(`UPDATE members SET name='${newBio.name}', dob='${newBio.dob}', dod=${newBio.dod ? `'${newBio.dod}'` : 'NULL'}, gender='${newBio.gender}', address='${newBio.address}', phone=${newBio.phone ? `'${newBio.phone.trim()}'` : 'NULL'}, status='${newBio.status}' WHERE id='${query.get('id')}'`)
        const result: BaseResp = {
            status: 200,
            message: 'OK'
        }
        return NextResponse.json(result)
    } catch (err) {
        console.error('Error:', err)
        const error: BaseResp = {
            status: 500,
            message: 'Internal Server Error'
        }
        return NextResponse.json(error, { status: 500 })
    }
}