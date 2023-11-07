import { action, prisma } from "@/services/database.service";
import { TMessageApi, TUser } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }): Promise<NextResponse<{ user?: TUser } & TMessageApi>> {
    const user: TUser | null = await action(async () => await prisma.user.findUnique({
        where: {
            id
        }
    }))
    if (!user) {
        return NextResponse.json({ serverMessage: 'Пользователь не был найден' }, { status: 404 })
    }
    return NextResponse.json({ serverMessage: "Пользователь успешно найден", user }, { status: 200 })
}