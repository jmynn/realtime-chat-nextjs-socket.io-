import GoogleProvider from "next-auth/providers/google"
import { AuthOptions } from "next-auth"
import { action, prisma } from "@/services/database.service"

export const config: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: `${process.env.GOOGLE_CLIENT_ID}`,
            clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        })
    ],
    pages: {
        signIn: '/signin'
    },
    callbacks: {
        async signIn({user}) {
            try {
                await action(async () => await prisma.user.upsert({
                    update: {
                        image: user.image,
                        name: user.name!,
                    },
                    create: {
                        email: user.email!,
                        name: user.name!,
                        image: user.image,
                    },
                    where: {
                        email: user.email!
                    }
                }))
                return true
            } catch (e) {
                return false
            }
        },
    },
}

