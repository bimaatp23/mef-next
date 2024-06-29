import { BaseResp } from '@/types/BaseResp'
import { DetailResp } from '@/types/DetailResp'
import { DetailPerson, Person } from '@/types/Person'
import { member } from '@/utils/constant'
import fetchSql from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams
    const code: string = query.get('code') || ''
    const search: string = query.get('search') || ''
    try {
        if (code) {
            if (code === '0') {
                const self = await fetchSql(`SELECT ${member.detail} FROM members WHERE code = '${code}'`)
                const child = await fetchSql(`SELECT ${member.general} FROM members WHERE status = 'Biological' AND code LIKE '%' AND code NOT LIKE '0' AND code NOT LIKE '%.%' ORDER BY code ASC`)
                const result: DetailResp = {
                    status: 200,
                    message: 'OK',
                    data: {
                        self: self.rows as DetailPerson[],
                        parents: [],
                        childs: child.rows as Person[]
                    }
                }
                return NextResponse.json(result)
            } else {
                const generation = code.toString().split('.')
                const parentGeneration = generation.slice(0, generation.length - 1)
                const self = await fetchSql(`SELECT ${member.detail} FROM members WHERE code = '${code}' ORDER BY status ASC`)
                const parent = await fetchSql(`SELECT ${member.general} FROM members WHERE code = '${generation.length === 1 ? '0' : parentGeneration.join('.')}' ORDER BY status ASC`)
                const child = await fetchSql(`SELECT ${member.general} FROM members WHERE status = 'Biological' AND code LIKE '${code}.%' AND code NOT LIKE '${code}.%.%' ORDER BY code ASC`)
                const result: DetailResp = {
                    status: 200,
                    message: 'OK',
                    data: {
                        self: self.rows as DetailPerson[],
                        parents: parent.rows as DetailPerson[],
                        childs: child.rows as Person[]
                    }
                }
                return NextResponse.json(result)
            }
        } else {
            const members = await fetchSql(`SELECT ${member.general} FROM members WHERE LOWER(name) LIKE LOWER('%${search}%') ORDER BY name ASC`)
            const result: BaseResp = {
                status: 200,
                message: 'OK',
                data: members.rows
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