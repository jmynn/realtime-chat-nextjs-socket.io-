'use client'
import { Flex, Heading, Spinner } from '@chakra-ui/react'
import Post from '@/components/ui/Post/Post'
import { TPost, TUser } from '@/types/types'
import { getPosts } from '@/services/post.service'
import { FunctionComponent, ReactNode } from 'react'
import useSWR from 'swr'

type Props = {
  uid?: string
}

const Posts: FunctionComponent<Props> = ({ uid }): ReactNode => {
  const { data: posts, isLoading, isValidating } = useSWR('posts', async () => await getPosts(uid))
  return (
    <Flex flexDir={'column'} rowGap={'5'} alignItems={'stretch'}>
      {((!!isLoading || !!isValidating) && !posts?.length) && <Spinner thickness='4px' speed='0.65s' emptyColor='purple.200' color='purple.500' size='xl' mx={'auto'} my={0} />}
      {(!!posts && !!posts?.length) && posts.map((post: (TPost & { likes: { user: Pick<TUser, 'email'> }[] })) => <Post {...{ ...post }} key={post.id} />)}
      {(!!posts && !posts?.length && (!isLoading || !isValidating)) && <Heading size={'md'} color={'purple.700'} textAlign={'center'} p={'2'}>Посты еще не созданы.</Heading>}
    </Flex>
  )
}

export default Posts