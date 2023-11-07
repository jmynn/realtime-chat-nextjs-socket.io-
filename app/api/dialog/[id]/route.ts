import { isAuthUser } from "@/helpers/isSession";
import { action, prisma } from "@/services/database.service";
import { TDialog, TDialogId, TDialogMessage, TMessage, TMessageApi, TSocketDialogMessage } from "@/types/types";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type TIdSearchParam = { params: { id: TDialogId } }

export async function GET(req: NextRequest, { params: { id: dialogId } }: TIdSearchParam): Promise<NextResponse<TMessageApi & { messages?: TSocketDialogMessage[] }>> {
    await isAuthUser()

    if (!dialogId) return NextResponse.json({ serverMessage: "Произошел сбой. Идентификатор диалога не был передан." }, { status: 404 })

    const messages: (TDialogMessage & { dialogUserId?: string, user?: { email?: string | null } })[] = await action(async () => await prisma.message.findMany({
        where: {
            dialogUsers: {
                dialogId
            }
        },
        include: {
            user: {
                select: {
                    email: true
                }
            },
        }
    }))

    if (!messages) return NextResponse.json({ serverMessage: 'Сообщения в диалоге не были найдены.' }, { status: 200 })

    const newMessages = messages.map((message): TSocketDialogMessage => {
        return {
            id: message.id,
            dialogId,
            message: message.message,
            dialogUsers: {
                user: {
                    email: message.user?.email
                }
            }
        }
    })

    return NextResponse.json({ messages: newMessages, serverMessage: 'Сообщения в дилоге найдены.' }, { status: 200 })
}

export async function DELETE(req: NextRequest, { params: { id: dialogId } }: TIdSearchParam): Promise<NextResponse<TMessageApi & { isDeleted: boolean }>> {
    await isAuthUser()

    if (!dialogId) return NextResponse.json({ isDeleted: false, serverMessage: "Произошел сбой. Идентификатор диалога не был передан." }, { status: 404 })

    const dialog: TDialog = await action(async () => await prisma.dialog.findUnique({
        where: {
            dialogId
        }
    }))

    if (!dialog) return NextResponse.json({ isDeleted: false, serverMessage: 'Диалог не был найден.' }, { status: 404 })

    const messages: TMessage[] = await action(async () => await prisma.message.findMany({
        where: {
            dialogUsers: {
                dialogId
            }
        },
    }))

    if (!!messages.length) {
        await action(async () => await prisma.message.deleteMany({
            where: {
                dialogUserId: dialogId
            }
        }))
    }

    await action(async () => await prisma.dialogUser.deleteMany({
        where: {
            dialogId,
        }
    }))
    await action(async () => await prisma.dialog.delete({
        where: {
            dialogId
        }
    }))

    revalidatePath('/dialogs')

    return NextResponse.json({ isDeleted: true, serverMessage: 'Диалог успешно удален.' }, { status: 200 })
}

