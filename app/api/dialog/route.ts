import { config } from "@/configs/auth.config";
import { isAuthUser } from "@/helpers/isSession";
import { action, prisma } from "@/services/database.service";
import { TDialogCreate, TDialogData, TDialogItem2, TMessageApi, TUser } from "@/types/types";
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse<TDialogData & TMessageApi>> {
    await isAuthUser()
    const session = await getServerSession(config)
    const searchParams = req.nextUrl.searchParams
    const uid = searchParams.get('uid') ?? ''
    const dialogData: TDialogData = {
        dialogs: [],
        dialogId: null
    }

    const user = await action(async () => await prisma.user.findUnique({
        where: {
            email: session?.user?.email!
        },
    }))

    if (uid) { //? id dialog
        const interlocutor: TUser = await action(async () => await prisma.user.findUnique({ where: { id: uid } }))

        if (!interlocutor) return NextResponse.json({ ...dialogData, serverMessage: 'Диалог не был найден. Неверный id собеседника.' }, { status: 404 })

        const dialog = await action(async () => await prisma.dialog.findFirst({
            where: {
                dialogUsers: {
                    every: {
                        OR: [
                            {
                                userId: user?.id!
                            },
                            {
                                userId: uid
                            }
                        ]
                    }
                }
            },
            include: {
                dialogUsers: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                image: true
                            }
                        }
                    }
                }
            }
        }))

        dialogData.dialogId = dialog?.dialogId ?? null
    }
    else { //? all dialogs
        const dialogs: TDialogItem2[] = await action(async () => await prisma.dialogUser.findMany({
            where: {
                user: {
                    email: session?.user?.email as string
                },
            },
            select: {
                messages: {
                    select: {
                        message: true
                    },
                    orderBy: {
                        id: 'desc'
                    },
                    take: 1,
                },
                dialogId: true,
                dialog: {
                    select: {
                        dialogUsers: {
                            where: {
                                user: {
                                    NOT: [{ email: session?.user?.email as string }]
                                }
                            },
                            select: {
                                user: {
                                    select: {
                                        name: true,
                                        image: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }))

        dialogData.dialogs = dialogs
    }

    return NextResponse.json({ ...dialogData, serverMessage: 'Диалог(и) успешно найден(ы).' }, { status: (!!dialogData.dialogId || !!dialogData.dialogs.length) ? 200 : 404 })
}

export async function POST(req: NextRequest): Promise<NextResponse<TDialogCreate & TMessageApi>> {
    await isAuthUser()
    const session = await getServerSession(config)

    const { iid } = await req.json()
    const interlocutor: TUser = await action(async () => await prisma.user.findUnique({ where: { id: iid } }))

    if (!interlocutor) return NextResponse.json({ isCreated: false, serverMessage: 'Диалог не был создан. Неверный id собеседника.' }, { status: 404 })

    const user: TUser = await action(async () => await prisma.user.findUnique({ where: { email: session?.user?.email! } }))
    let isCreated: boolean = false
    const dialogUUID = randomUUID()

    const dialog = await action(async () => await prisma.dialog.create({
        data: {
            dialogId: dialogUUID,
        }
    }))
    //?
    if (!!dialog) {
        isCreated = true
        await action(async () => await prisma.dialogUser.createMany({
            data: [
                {
                    dialogId: dialogUUID,
                    userId: user?.id!
                },
                {
                    dialogId: dialogUUID,
                    userId: iid
                },
            ]
        }))
    }
    return NextResponse.json({ isCreated, dialogId: dialogUUID, serverMessage: 'Диалог успешно создан.' }, { status: 201 })
}