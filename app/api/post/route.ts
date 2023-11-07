import { config } from "@/configs/auth.config"
import { isAuthUser } from "@/helpers/isSession"
import { action, prisma } from "@/services/database.service"
import { TPost, TUser } from "@/types/types"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest): Promise<NextResponse<TPost[]>> {
    await isAuthUser()
    const session = await getServerSession(config)
    const uid = req.nextUrl.searchParams.get('uid')
    const where = !uid ? {
        user: {
            email: session?.user?.email!,
        }
    } : {
        user: {
            id: uid?.toString()
        }
    }
    const posts: (TPost & { likes: { user: Pick<TUser, 'email'> }[] })[] = await action(async () => await prisma.post.findMany({
        where,
        orderBy: {
            id: 'desc'
        },
        include: {
            likes: {
                select: {
                    user: {
                        select: {
                            email: true
                        }
                    }
                }
            }
        }
    }))
    return NextResponse.json(posts, { status: 200 })
}

export async function POST(req: NextRequest): Promise<NextResponse<TPost[]>> {
    await isAuthUser()
    const session = await getServerSession(config)
    const formData = await req.formData()
    const { title, description, cover } = Object.fromEntries(formData)
    const post: TPost = await action(async () => await prisma.post.create({
        data: {
            user: {
                connect: {
                    email: session?.user?.email!
                }
            },
            title: title?.toString() || 'Без названия',
            description: description?.toString(),
            image: cover?.toString() ?? null
        },
    }))
    return NextResponse.json([post], { status: 201 })
}

