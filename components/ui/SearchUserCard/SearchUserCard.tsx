import { FunctionComponent, ReactNode } from 'react'
import { LinkBox, Flex, Highlight, LinkOverlay, Box } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { TUser } from '@/types/types'

const SearchUserCard: FunctionComponent<TUser> = ({ id, name, email, image }): ReactNode => {
  return (
    <LinkBox p={'1'} borderBottom={'1px solid'} borderBottomColor={'purple.200'} bg={'white'} key={id} _hover={{ bg: 'purple.100', transition: 'background 0.2s ease-in-out' }} transition={'background 0.2s ease-in-out'}>
      <Flex flexDir={'row'} alignItems={'center'} columnGap={'1'}>
        <Box overflow={'hidden'} borderRadius={'6px'}>
          <Image src={image ?? `/none.png`} alt='account photo' width={100} height={200} />
        </Box>
        <Flex flexDir={'column'} rowGap={'1'} alignItems={'stretch'}>
          <Box textTransform={'uppercase'} fontWeight={'bold'} color={'purple.500'}>
            <Highlight query={''}>{name ?? 'Без имени'}</Highlight>
          </Box>
          <Box color={'purple.900'}>
            <Highlight query={''}>{email ?? "Email отсутствует"}</Highlight>
          </Box>
          <LinkOverlay as={NextLink} href={`${process.env.NEXT_PUBLIC_URL}/user/${id}`} color={'purple.300'} />
        </Flex>
      </Flex>
    </LinkBox>
  )
}

export default SearchUserCard