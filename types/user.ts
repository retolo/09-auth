export type User = {
    email: string,
    password: string,
    userName?: string,
    photoUrl?: string,
    createdAt: string,
    updatedAt: string

}


export type UpdateUsername = {
    userName: string
}