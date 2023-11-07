'use client'
import styles from './Header.module.scss'
import AdaptiveChakraContainer from '../AdaptiveChakraContainer/AdaptiveChakraContainer'
import LayoutSearch from '../LayoutSearch/LayoutSearch'
import Logo from '../Logo/Logo'
import { Box } from '@chakra-ui/react'
import HeaderButtonSignOut from '../HeaderButtonSignOut/HeaderButtonSignOut'
import { ReactNode } from 'react'
import SearchContext from '@/providers/SearchProvider'

const Header = (): ReactNode => {
  return (
    <header className={styles.header}>
      <Box w={'full'} bg={'purple.200'} color='purple.700'>
        <AdaptiveChakraContainer>
          <nav className={styles.navigation}>
            <div className={styles.controlbar}>
              <div className={styles.logo}>
                <Logo />
              </div>
              <div className={styles.search}>
                <SearchContext>
                  <LayoutSearch />
                </SearchContext>
              </div>
            </div>
            <div className={styles.routes}>
              <HeaderButtonSignOut />
            </div>
          </nav>
        </AdaptiveChakraContainer>
      </Box>
    </header>
  )
}

export default Header