import type { TUser } from '@/types/types'
import { Box, Flex, Heading, Highlight, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { FunctionComponent, ReactNode } from 'react'

const ProfileInfo: FunctionComponent<TUser> = ({ name, email, image }): ReactNode => {
  const nameString = name ?? "Без имени"
  return (
    <Flex flexDir={'row'} alignItems={'center'} columnGap={'4'} flex={'0 0 auto'} bg={'gray.200'} borderRadius={'6px'} p={'2'}>
      <Box borderRadius={'6px'} overflow={'hidden'} outline={'1px solid'} outlineColor={'purple.300'}>
        <Image width={96} height={96} src={image ?? '/none.png'} alt='photo acc' />
      </Box>
      <Box flex={'1 1 auto'}>
        <Flex flexDir={'column'} rowGap={'3'}>
          <Heading size={'md'} fontWeight={'bold'}>
            <Highlight query={nameString} styles={{ px: '2', py: '1', bg: 'purple.400', rounded: 'full', color: 'purple.50' }}>{nameString}</Highlight>
          </Heading>
          <Text>{email ?? "Email отсутствует"}</Text>
        </Flex>
      </Box>
    </Flex>
  )
}

export default ProfileInfo