import { TMessageApi, TOnePost } from "@/types/types"
import axios from "axios"

export async function getNews(): Promise<TOnePost[] | undefined> {
    const { data } = await axios<TMessageApi & { posts?: TOnePost[] }>('/api/news')
    return data.posts
}