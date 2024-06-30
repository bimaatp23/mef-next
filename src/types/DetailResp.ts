import { BaseResp } from './BaseResp'
import { DetailPerson, Person } from './Person'

export interface DetailResp extends BaseResp {
    data: {
        selfs: DetailPerson[]
        parents: Person[]
        childs: Person[]
    }
}