'use server'
import UserPage from '@/components/screens/UserPage/UserPage'
import { getUserById } from '@/services/user.service'
import { notFound } from 'next/navigation'
import { FunctionComponent } from 'react'

type Props = {
    params: {
        id: string
    }
}

const Page: FunctionComponent<Props> = async ({ params: { id } }): Promise<JSX.Element> => {
    const user = await getUserById(id)
    if (!user) return notFound()
    return (
        <UserPage user={user} />
    )
}

export default Page