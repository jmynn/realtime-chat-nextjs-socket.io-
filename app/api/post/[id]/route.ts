import { config } from "@/configs/auth.config"
import { isAuthUser } from "@/helpers/isSession"
import { action, prisma } from "@/services/database.service"
import { TLike, TMessageApi, TPost, TResponseToggleLike } from "@/types/types"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(req: NextRequest, { params: { id: postId } }: { params: { id: string } }): Promise<NextResponse<TMessageApi & TResponseToggleLike>> {
    await isAuthUser()
    const session = await getServerSession(config)

    let isLike: boolean
    let currentLikesCount: number

    const like: TLike = await action(async () => await prisma.like.findFirst({
        where: {
            postId,
            user: {
                email: session?.user?.email as string
            }
        }
    }))

    if (!!like) {
        const post: TPost = await action(async () => await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likesCount: {
                    decrement: 1
                },
                likes: {
                    delete: {
                        id: like.id,
                        user: {
                            email: session?.user?.email as string
                        }
                    },
                }
            }
        }))
        currentLikesCount = post.likesCount
        isLike = false
    }
    else {
        const post: TPost = await action(async () => await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likesCount: {
                    increment: 1
                },
                likes: {
                    create: {
                        user: {
                            connect: {
                                email: session?.user?.email as string
                            }
                        },
                    }
                }
            }
        }))
        currentLikesCount = post.likesCount
        isLike = true
    }

    return NextResponse.json({ isLike, currentLikesCount, serverMessage: 'Действие было учтено!' }, { status: 201 })
}