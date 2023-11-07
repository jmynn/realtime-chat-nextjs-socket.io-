'use client'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { ReactNode } from 'react'

const HeaderButtonSignOut = (): ReactNode => {
    const session = useSession()
    const searchParams = useSearchParams()
    const router = useRouter()
    const callbackUrl = searchParams?.get('callbackUrl') || '/signin'
    const handleClick = () => {
        signOut({ callbackUrl, redirect: false })
        router.push('/signin')
    }
    return (
        session.data ?
            <span onClick={handleClick}>Выйти</span>
            :
            <Link href={'/signin'}>Войти</Link>
    )
}

export default HeaderButtonSignOut