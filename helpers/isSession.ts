'use server'
import { config } from "@/configs/auth.config"
import { unauthorized } from "@/errors"
import { NextApiRequest, NextApiResponse } from "next"
import { Session } from "next-auth"
import { getServerSession } from "next-auth/next"

export async function isSession(req?: NextApiRequest, res?: NextApiResponse): Promise<boolean> {
    let session: Session | null = (!!req && !!res) ? await getServerSession(req, res, config) : await getServerSession(config)
    return !!session
}
export async function isAuthUser(req?: NextApiRequest, res?: NextApiResponse): Promise<void> {
    if (!await isSession(req, res)) throw unauthorized
}