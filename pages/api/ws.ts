'use server'
import { NextApiRequest, NextApiResponse } from "next"
import { Server, Socket } from "socket.io"
import { isAuthUser } from "@/helpers/isSession"
import { UUID } from "crypto"
import { TDialog, TDialogId, TDialogMessage, TMessage, TSocketDialogMessage, TUser } from "@/types/types"
import { action, prisma } from "@/services/database.service"

export const config = {
    api: {
        bodyParser: false
    }
}

function sendData(socket: Socket, io: Server, channel: string, event: 'error_message' | 'receive_message', data: string | { [key: string]: any }) {
    socket.join(channel)
    io.to(channel).emit(event, data)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await isAuthUser(req, res)
    if ((res.socket as any)?.server?.io) {
        console.log("🚀 ~ file: ws.ts:11 ~ ALREADY:")
        res.end()
        return
    }

    const io = new Server((res.socket as any)?.server, {
        path: "/api/ws",
    })

    io.on('connection', (socket: Socket) => {
        const url = new URL(`http://localhost:3000${socket.request.url}`)
        const roomId = url.searchParams.get("Room-Id")
        const errorId = url.searchParams.get("Error-Id")! as UUID

        if (!roomId) {
            socket.join(errorId)
            io.to(errorId).emit('error_message', 'RoomId not found io')
            return
        }
        socket.join(roomId)

        socket.on('send_message', async (data: { value: string, email: string }) => {
            const url = new URL(`http://localhost:3000${socket.request.url}`)
            const roomId = url.searchParams.get("Room-Id")
            const errorId = url.searchParams.get("Error-Id")! as UUID

            if (!roomId) {
                socket.join(errorId)
                io.to(errorId).emit('error_message', 'RoomId not found io')
                return
            }

            if (!roomId) {
                sendData(socket, io, errorId, 'error_message', "Произошел сбой. Идентификатор диалога не был передан.")
                return
            }

            const dialog: TDialog & { dialogUsers: ({ user: Pick<TUser, "email">, id: string })[] } = await action(async () => await prisma.dialog.findUnique({
                where: {
                    dialogId: roomId
                },
                include: {
                    dialogUsers: {
                        select: {
                            user: {
                                select: {
                                    email: true
                                }
                            },
                            id: true
                        }
                    }
                }
            }))

            if (!dialog) {
                sendData(socket, io, errorId, 'error_message', 'Диалог не был найден.')
                return
            }

            const dialogUsersId = dialog.dialogUsers.filter(user => user.user.email === data.email)[0].id

            const isInterlocutor = dialog.dialogUsers.map(user => user.user.email === data.email)

            if (!isInterlocutor) {
                sendData(socket, io, errorId, 'error_message', 'Отправитель не является ранее зарегистрированным собеседником в диалоге.')
                return
            }

            if (!data.value) {
                sendData(socket, io, errorId, 'error_message', "Произошел сбой. Текст сообщения не был передан.")
                return
            }

            const newMessage: TMessage & { dialogUsers: { user: { email: string } } } = await action(async () => await prisma.message.create({
                data: {
                    message: data.value,
                    user: {
                        connect: {
                            email: data.email
                        }
                    },
                    dialogUsers: {
                        connect: {
                            id: dialogUsersId
                        }
                    }
                }
            }))

            if (!newMessage) {
                sendData(socket, io, errorId, 'error_message', "Произошел сбой.")
                return
            }

            const response: TSocketDialogMessage = {
                message: data.value,
                dialogId: roomId as TDialogId,
                dialogUsers: {
                    user: {
                        email: data.email
                    }
                },
                id: newMessage.id
            }

            sendData(socket, io, roomId!, 'receive_message', response)
        })
    });

    (res.socket as any).server.io = io

    res.end()
}