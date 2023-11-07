'use server'
import { FunctionComponent, ReactNode, memo } from 'react'
import styles from './UserPage.module.scss'
import { Box } from '@chakra-ui/react'
import ProfileInfo from '@/components/ui/ProfileInfo/ProfileInfo'
import { TUser } from '@/types/types'
import Posts from '../Posts/Posts'
import { getServerSession } from 'next-auth'
import { config } from '@/configs/auth.config'
import ButtonWriteMessageUser from '@/components/ui/ButtonWriteMessageUser/ButtonWriteMessageUser'

type Props<U = TUser> = {
  user: U
}

const UserPage: FunctionComponent<Props> = async ({ user }): Promise<JSX.Element> => {
  const session = await getServerSession(config)
  return (
    <Box display={'flex'} flexDir={'column'} rowGap={'4'} alignItems={'stretch'}>
      <ProfileInfo {...{...user}} />
      {
        (!!session && (session?.user?.email !== user.email)) && <ButtonWriteMessageUser id={user.id!} />
      }
      <Posts uid={user.id} />
    </Box>
  )
}

export default UserPage