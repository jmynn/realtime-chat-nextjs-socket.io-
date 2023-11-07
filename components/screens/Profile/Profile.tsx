'use client'
import { FunctionComponent, ReactNode, useMemo } from 'react'
import styles from './Profile.module.scss'
import { signOut, useSession } from 'next-auth/react'
import ProfileInfo from '@/components/ui/ProfileInfo/ProfileInfo'
import { Box, Button, useDisclosure, useToast } from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import ModalAddPost from '@/components/ui/ModalAddPost/ModalAddPost'

type Props = {
  children: ReactNode
}

const Profile: FunctionComponent<Props> = ({ children }): ReactNode => {
  const session = useSession()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl') || '/signin'
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box display={'flex'} flexDir={'column'} rowGap={'4'} alignItems={'stretch'}>
      <ProfileInfo  {...{ ...session.data?.user }} />
      <Box display={'flex'} flexDir={'row'} alignItems={'center'} columnGap={'2'} justifyContent={'flex-end'}>
        <Button colorScheme='blackAlpha' onClick={() => {
          signOut({ callbackUrl })
          router.push('/signin')
        }}>Выйти из аккаунта</Button>
        <Button onClick={onOpen} colorScheme='purple'>Создать пост</Button>
      </Box>

      {children}
      <ModalAddPost isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

export default Profile