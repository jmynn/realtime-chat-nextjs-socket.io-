import { TDialogId } from '@/types/types'
import { Box, LinkBox, LinkOverlay } from '@chakra-ui/react'
import Image from 'next/image'
import { FunctionComponent, ReactNode } from 'react'
import styles from './DialogItem.module.scss'

type Props<D = TDialogId> = { id: D } & Partial<Record<'message' | 'image' | 'name', string | null>>

const DialogItem: FunctionComponent<Props> = ({ id, message, image, name }): ReactNode => {
  return (
    <LinkBox display={'flex'} borderRadius={'6px'} bg={'purple.100'} p={'2'} alignItems={'center'} columnGap={'2'} flexDirection={'row'} _hover={{ cursor: 'pointer', bg: 'purple.200', transition: 'background .2s ease-in-out' }} h={'100px'} overflow={'hidden'} transition={'background .2s ease-in-out'}>
      <LinkOverlay href={`${process.env.NEXT_PUBLIC_URL}/dialogs/${id}`} data-id={id} />
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} borderRadius={'50%'} overflow={'hidden'} flex={'0 0 3rem'} aspectRatio={'1/1'} className={styles.imageBox}>
        <Image alt='user photo' src={image ?? '/none.png'} width={48} height={48} />
      </Box>
      <Box display={'flex'} flexDir={'column'} rowGap={'1'} alignItems={'stretch'} flex={'0 0 auto'} className={styles.info}>
        <Box fontWeight={'bold'} fontSize={'md'} color={'purple.600'}>{name ?? 'Без имени'}</Box>
        <Box fontSize={'sm'} color={'purple.400'}>{message ?? 'Нет сообщений...'}</Box>
      </Box>
    </LinkBox>
  )
}

export default DialogItem