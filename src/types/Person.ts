export interface Person {
    id: number
    code: string
    name: string
    dob: string
    status: 'Biological' | 'Married-in'
}

export interface DetailPerson extends Person {
    dod: string | null
    gender: 'Male' | 'Female'
    address: string
    phone: string | null
}