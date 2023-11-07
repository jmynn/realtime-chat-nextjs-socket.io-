import Posts from '@/components/screens/Posts/Posts'
import LoaderSpinner from '@/components/ui/LoaderSpinner/LoaderSpinner'
import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const Profile = dynamic(() => import('@/components/screens/Profile/Profile'), {
    loading: () => <LoaderSpinner />
})

const Page = ():ReactNode => {
    return (
        <Profile>
            <Posts />
        </Profile>
    )
}

export default Page
