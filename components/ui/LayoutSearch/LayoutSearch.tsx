'use client'
import { ReactNode, useContext, useEffect, useDeferredValue } from 'react'
import { Box, Flex, Heading, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import SearchUserCard from '../SearchUserCard/SearchUserCard'
import { searchContext } from '@/providers/SearchProvider'
import { BsTrash } from 'react-icons/bs'
import { PiSmileySadLight } from 'react-icons/pi'
import styles from './LayoutSearch.module.scss'
import { useSession } from 'next-auth/react'

const LayoutSearch = (): ReactNode => {
  const { disabled, search, searcher, cards, fetcher } = useContext(searchContext)
  const session = useSession()
  const deffered = useDeferredValue(cards.current)
  useEffect(() => {
    fetcher()
  }, [])
  return (
    <Box w={'full'} display={'flex'} flexDir={'column'} alignItems={'stretch'} pos={'relative'}>
      <InputGroup>
        <Input placeholder='Найти друга по email или имени...' colorScheme={'purple'} variant={'outline'} w={'full'} border={'1px solid'} borderColor={'purple.600'} color={'purple.700'} _placeholder={{ color: 'purple.50' }} _focusVisible={{ outlineColor: 'purple.100' }} value={search} onChange={e => searcher(e.target.value.trim().toLowerCase())} disabled={disabled} />
        <InputRightElement onClick={() => searcher('')} _hover={{
          cursor: 'pointer',
          opacity: 0.8
        }}>
          <BsTrash />
        </InputRightElement>
      </InputGroup>
      {
        !search.length ||
        <Box as={'div'} mt={'2'} borderRadius={'6px'} overflow={'hidden'} maxH={'lg'} pos={'absolute'} top={'12'} outline={'1px solid'} outlineColor={'purple.400'} zIndex={10} w={'inherit'} overflowY={'auto'} className='searchbox' bg={'white'} onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          searcher('')
        }}>
          {
            deffered.length ?
              deffered.filter(user => session.data?.user?.email !== user.email).map((user) => <SearchUserCard {...{ ...user }} key={user.id} />)
              :
              <Flex flexDir={'row'} columnGap={'2'} alignItems={'center'} className={styles.nothing} p={'1'}>
                <Heading size={'md'}>Никого не смогли найти</Heading>
                <PiSmileySadLight />
              </Flex>
          }
        </Box>
      }
    </Box>
  )
}

export default LayoutSearch