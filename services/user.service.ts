import { TDialogId, TMessageApi, TUser } from "@/types/types"
import axios from "axios"

export async function getUsers(): Promise<TUser[] | []> {
    const { data: users }: { data: TUser[] } = await axios.get('/api/user')
    return users
}
export async function getUserById(id: string): Promise<TUser | undefined> {
    const { serverMessage, user } = await (await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/${id}`)).json()
    return user
}

export async function getUserByDialogId(id: TDialogId): Promise<{ user: TUser } & TMessageApi> {
    const { data } = await axios.get<{ user: TUser } & TMessageApi>('/api/user', { params: { dialogId: id } })
    return { ...data }
}