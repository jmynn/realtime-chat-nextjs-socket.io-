import { config } from "@/configs/auth.config";
import { isAuthUser } from "@/helpers/isSession";
import { action, prisma } from "@/services/database.service";
import { TDialogsWithPosts, TMessageApi, TOnePost } from "@/types/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<TMessageApi & { posts?: TOnePost[] }>> {
    await isAuthUser()
    const session = await getServerSession(config)
    const dialogs: TDialogsWithPosts[] = await action(async () => await prisma.dialog.findMany({
        where: {
            dialogUsers: {
                some: {
                    user: {
                        email: session?.user?.email as string
                    }
                }
            }
        },
        select: {
            dialogUsers: {
                where: {
                    user: {
                        isNot: {
                            email: session?.user?.email as string
                        }
                    }
                },
                select: {
                    user: {
                        select: {
                            posts: {
                                include: {
                                    user: true,
                                    likes: {
                                        include: {
                                            user: {
                                                select: {
                                                    email: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                }
            },
            id: false,
            dialogId: false
        },
    }))

    const posts: TOnePost[] = []
    dialogs.forEach(dialog => dialog.dialogUsers[0].user.posts.forEach(post => posts.push(post)))
    
    return NextResponse.json({ posts, serverMessage: 'Посты успешно найдены.' }, { status: 200 })
}
