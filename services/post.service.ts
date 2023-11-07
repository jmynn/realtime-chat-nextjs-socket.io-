import { createFormData } from "../helpers/createFormData"
import { TMessageApi, TPost, TResponseToggleLike, TUser } from "@/types/types"
import axios from "axios"

export async function toggleLike(id: string): Promise<TResponseToggleLike> {
    const { data: { currentLikesCount, isLike } } = await axios.patch<TMessageApi & TResponseToggleLike>(`${process.env.NEXT_PUBLIC_URL}/api/post/${id}`)
    return { isLike, currentLikesCount }
}

export async function addPost(form: HTMLFormElement): Promise<TPost | undefined> {
    const formData = await createFormData(form)
    const { data: posts }: { data: TPost[] } = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/post`, formData)
    return posts[0]
}

export async function getPosts(uid?: string): Promise<(TPost & { likes: { user: Pick<TUser, 'email'> }[] })[] | []> {
    if (!uid) {
        const { data: posts }: { data: (TPost & { likes: { user: Pick<TUser, 'email'> }[] })[] } = await axios(`${process.env.NEXT_PUBLIC_URL}/api/post`, { withCredentials: true })
        return posts
    }
    const { data: posts }: { data: (TPost & { likes: { user: Pick<TUser, 'email'> }[] })[] } = await axios(`${process.env.NEXT_PUBLIC_URL}/api/post`, { withCredentials: true, params: { uid } })
    return posts
}

