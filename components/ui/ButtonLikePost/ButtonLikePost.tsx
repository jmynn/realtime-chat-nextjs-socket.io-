'use client'
import { toggleLike } from '@/services/post.service'
import { TPost } from '@/types/types'
import { Box, Flex } from '@chakra-ui/react'
import { FunctionComponent, ReactNode, memo, useState } from 'react'
import { FcLike } from 'react-icons/fc'; //like
import { PiHeartStraightLight } from 'react-icons/pi'; //line
import styles from './ButtonLikePost.module.scss'

type Props = { isLike: boolean } & Pick<TPost, 'likesCount' | 'id'>

const ButtonLikePost: FunctionComponent<Props> = memo(({ id, likesCount, isLike }): ReactNode => {
    console.table({id, isLike, likesCount})
    const [isHandleLike, setIsHandleLike] = useState<boolean>(isLike)
    const [likes, setLikes] = useState<number>(likesCount)
    const handleLike = async (id: string) => {
        const { isLike, currentLikesCount } = await toggleLike(id)
        setIsHandleLike(isLike)
        setLikes(currentLikesCount)
    }
    return (
        <Flex flexDir={'row'} alignItems={'center'} columnGap={'1'} color={isHandleLike ? 'red.400' : 'purple.800'} fontWeight={'bold'} fontSize={'sm'} className={styles.likes} px={'2'} py={'1'} bg={'transparent'} borderRadius={'6px'} overflow={'hidden'} transition={'all .3s ease-in-out'} _hover={{
            cursor: 'pointer',
            bg: `color-mix(in srgb, black 5%, gray 5%)`,
            transition: 'all .3s ease-in-out',
        }} onClick={() => handleLike(id)}>
            <Box>{isHandleLike ? <FcLike /> : <PiHeartStraightLight />}</Box>
            <Box>{likes}</Box>
        </Flex>
    )
})

export default ButtonLikePost