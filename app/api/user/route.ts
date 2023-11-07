import { config } from "@/configs/auth.config"
import { isAuthUser } from "@/helpers/isSession"
import { action, prisma } from "@/services/database.service"
import { TDialogId, TMessageApi, TUser } from "@/types/types"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest): Promise<NextResponse<TUser[] | [] | ({ user?: TUser } & TMessageApi)>> {
    const dialogId: TDialogId | null = req.nextUrl.searchParams.get('dialogId') as TDialogId
    if (!dialogId) {
        const users: TUser[] = await action(async () => await prisma.user.findMany())
        return NextResponse.json(users, { status: 200 })
    }
    await isAuthUser()
    const session = await getServerSession(config)
    const user = await action(async () => await prisma.user.findFirst({
        where: {
            interlocutors: {
                some: {
                    dialogId,
                    NOT: {
                        user: {
                            email: session?.user?.email!
                        }
                    }
                }
            }
        }
    }))
    if (!user) return NextResponse.json({ serverMessage: 'Пользователь с таким идентификатором не был найден.' }, { status: 400 })
    return NextResponse.json({ user, serverMessage: 'Пользователь был успешно найден.' }, { status: 200 })
}