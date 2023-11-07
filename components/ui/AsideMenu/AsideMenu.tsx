'use client'
import { routes } from '@/routes/routes'
import { Box, Flex, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { FunctionComponent, ReactNode } from 'react'
import styles from './AsideMenu.module.scss'

type TypeAsideMenu = {
  children: ReactNode
}

const AsideMenu: FunctionComponent<TypeAsideMenu> = ({ children }): ReactNode => {
  const pathname = usePathname()
  const session = useSession()
  return (
    <Flex flexDir={'row'} alignItems={'stretch'} columnGap={'3'} h={'100%'}>
      <Box flex={'0 0 300px'} display={'flex'} flexDir={'column'} alignItems={'stretch'} rowGap={'1'} bg={'gray.100'} p={'2'} borderRadius={'6px'} overflow={'hidden'}>
        {
          routes.map(({ route, label, icon, isAuth }, i) => {
            if(isAuth && session.status !== 'authenticated') return
            return <LinkBox key={i} as={'div'}>
              <LinkOverlay as={NextLink} href={route} display={'flex'} alignItems={'center'} columnGap={'1'} p={'2'} borderRadius={'6px'} bg={route === pathname ? 'purple.100' : 'purple.200'} color={"purple.700"} transition={'all .3s ease-in-out'} _hover={route === pathname ? {} : {
                cursor: 'pointer',
                bg: 'purple.300',
                transition: 'all .3s ease-in-out'
              }} className={styles.menuItem}>
                {icon}
                {label}
              </LinkOverlay>
            </LinkBox>
          })
        }
      </Box>
      <Box flex={'1 1 auto'} bg={'gray.100'} p={'2'} borderRadius={'6px'} overflow={'hidden'}>
        {children}
      </Box>
    </Flex>
  )
}

export default AsideMenu