import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export async function action(cb?: any) {
    try {
        await prisma.$connect()
        return cb()
    } catch (e) {
        return null
    } finally {
        await prisma.$disconnect()
    }
}
