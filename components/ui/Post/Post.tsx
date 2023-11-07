'use client'
import { FunctionComponent, ReactNode } from 'react'
import styles from './Post.module.scss'
import { TPost, TUser } from '@/types/types'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'
import ButtonLikePost from '../ButtonLikePost/ButtonLikePost'
import { useSession } from 'next-auth/react'

const blur = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8eePvdwAJJwO3vXp/OQAAAABJRU5ErkJggg=='
type Props = Omit<TPost, 'userId'> & { isNews?: boolean } & { likes: { user: Pick<TUser, 'email'> }[] }

const Post: FunctionComponent<Props> = ({ id, likesCount, title, description, image, isNews, likes }): ReactNode => {
  const session = useSession()
  const isLike = !!(likes?.filter(post => post.user.email === session.data?.user?.email).length)
  return (
    <Flex flexDir={'column'} alignItems={'stretch'} borderRadius={'6px'} bg={'White'} p={'2'} border={'1px solid'} borderColor={isNews ? 'transparent' : 'purple.100'} rowGap={'3'}>
      <Box display={'flex'} flexDir={'column'} rowGap={'2'} className={styles.info}>
        <Heading size={'lg'} letterSpacing={'wide'}>{title}</Heading>
        <Text fontSize={'lg'} lineHeight={'normal'}>{description}</Text>
        {
          !!image && <Image src={image} width={0} height={0} alt='post cover' loading='lazy' placeholder='blur' blurDataURL={blur} />
        }
      </Box>
      <Box w={'full'} h={'1px'} bg={'purple.800'} borderRadius={'21px'}></Box>
      <Box display={'flex'} justifyContent={'flex-end'}>
        <ButtonLikePost likesCount={likesCount} id={id} isLike={isLike} />
      </Box>
    </Flex>
  )
}

export default Post