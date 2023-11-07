'use client'
import { ReactNode } from 'react'
import useSWR from 'swr'
import { getNews } from '@/services/news.service'
import { Flex, Heading, Spinner } from '@chakra-ui/react'
import Post from '@/components/ui/Post/Post'
import { TOnePost } from '@/types/types'
import DialogInfo from '@/components/ui/DialogInfo/DialogInfo'

const News = (): ReactNode => {
  const { data: news, isLoading, isValidating } = useSWR('news', getNews)
  return (
    <Flex flexDir={'column'} rowGap={'5'} alignItems={'stretch'}>
      {((!!isLoading || !!isValidating) && !news?.length) && <Spinner thickness='4px' speed='0.65s' emptyColor='purple.200' color='purple.500' size='xl' mx={'auto'} my={0} />}
      {(!!news && !!news?.length) && news.map(({ id, likesCount, title, description, image, user, likes }: TOnePost) => {
        return <Flex alignItems={'stretch'} flexDir={'column'} borderRadius={'6px'} key={id} bg={'white'}>
          <DialogInfo id={user.id} image={user.image} name={user.name} isNews />
          <Post id={id} title={title} likesCount={likesCount} description={description} image={image} likes={likes} isNews />
        </Flex>
      })}
      {(!!news && !news?.length && (!isLoading || !isValidating)) && <Heading size={'md'} color={'purple.700'} textAlign={'center'} p={'2'}>Посты еще не созданы.</Heading>}
    </Flex>
  )
}

export default News