import { TDialogItem2, TMessageApi, TSocketDialogMessage } from "@/types/types"
import axios from "axios"
import ky from "ky"
import { notFound } from "next/navigation"
import { NextResponse } from "next/server"

export async function getDialogs(): Promise<TDialogItem2[] | []> {
    const { data: { dialogs } } = await axios<{ dialogs: TDialogItem2[] }>('/api/dialog')
    return dialogs
}

export async function createDialog(iid: string): Promise<{ isCreated: boolean, dialogId?: string }> {
    const { data } = await axios.post<{ isCreated: boolean, dialogId?: string }>('/api/dialog', { iid })
    return { ...data }
}

export async function getDialogByUserId(uid: string): Promise<string> {
    const redirectString: string = await (await ky('api/dialog', {
        prefixUrl: `${process.env.NEXT_PUBLIC_URL}/`,
        searchParams: { uid },
        hooks: {
            afterResponse: [
                async (input, options, response) => {
                    const uid = new URL(input.url).searchParams.get('uid')
                    let did: string = ''
                    if (response.status === 404 && !!uid) {
                        const { isCreated, dialogId } = await createDialog(uid)
                        if (!isCreated || !dialogId) {
                            notFound()
                        }
                        did = dialogId
                    }
                    if (response.status === 200 && !!uid) {
                        const { dialogId } = await response.json()
                        did = dialogId
                    }
                    return NextResponse.json(`${process.env.NEXT_PUBLIC_URL}/dialogs/${did}`)
                }
            ]
        },
        throwHttpErrors: false,
        redirect: 'manual',
        retry: 0,
    })).json()
    return redirectString
}

export async function deleteDialog(id: string): Promise<TMessageApi & { isDeleted: boolean }> {
    const { data } = await axios.delete<TMessageApi & { isDeleted: boolean }>(`/api/dialog/${id}`)
    return { ...data }
}

export async function getMessages(id: string): Promise<TSocketDialogMessage[] | undefined> {
    const { data } = await axios<TMessageApi & { messages?: TSocketDialogMessage[] }>(`/api/dialog/${id}`)
    return data.messages
}

