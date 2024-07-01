export interface Person {
    code: string
    name: string
    status: 'Biological' | 'Married-in'
}

export interface DetailPerson extends Person {
    dob: string
    dod: string | null
    gender: 'Male' | 'Female'
    address: string
    phone: string | null
}