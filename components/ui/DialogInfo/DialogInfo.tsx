import { TUser } from '@/types/types'
import { Box, LinkBox, LinkOverlay } from '@chakra-ui/react'
import Image from 'next/image'
import { FunctionComponent, ReactNode } from 'react'
import styles from './DialogInfo.module.scss'

type Props = Omit<TUser, 'email'> & { isNews?: boolean }

const DialogInfo: FunctionComponent<Props> = ({ image, name, id, isNews }): ReactNode => {
  return (
    <LinkBox display={'flex'} flexDir={'row'} alignItems={'center'} columnGap={'2'} p={'2'} bg={isNews ? 'white' : 'purple.100'} borderRadius={'6px'} color={'purple.900'} flex={'0 0 64px'}>
      <LinkOverlay href={`${process.env.NEXT_PUBLIC_URL}/user/${id}`} />
      <Box w={'12'} h={'12'} overflow={'hidden'} borderRadius={'50%'}>
        <Image src={image ?? '/none.png'} alt='account photo' width={48} height={48} quality={100} />
      </Box>
      <Box fontWeight={'bold'} className={styles.name} color={'purple.600'} fontSize={'md'}>{name ?? "Анонимный пользователь"}</Box>
    </LinkBox>
  )
}

export default DialogInfo