import { ReactNode } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { PiChatsLight } from 'react-icons/pi'
import Link from 'next/link'
import styles from './Logo.module.scss'

const Logo = (): ReactNode => {
  return (
    <Flex alignItems={'center'} flexDir={'row'} columnGap={1} >
      <Link href={'/'}>
        <Text fontWeight={'bold'} fontSize={'2xl'} color={'purple.700'}>ЧАТИК</Text>
      </Link>
      <PiChatsLight />
    </Flex>
  )
}

export default Logo