export interface APIResponseOrder{
    id: number,
    userId: number,
    userName: string,
    title: string,
    type: string,
    quantity: number,
    comment: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    deleted: boolean
}