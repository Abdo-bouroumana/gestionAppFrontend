export interface APIResponseUser{
    id: number,
    username: string,
    email: string,
    password: string,
    role: string,
    firstLogin: boolean,
    createdAt: string,
    isActive: boolean
}