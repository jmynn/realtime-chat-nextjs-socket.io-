import { FunctionComponent, ReactNode } from 'react'
import styles from './Main.module.scss'
import { Box } from '@chakra-ui/react'
import AdaptiveChakraContainer from '../AdaptiveChakraContainer/AdaptiveChakraContainer'

type TypeMain = {
  children: ReactNode
}

const Main: FunctionComponent<TypeMain> = ({ children }): ReactNode => {
  return (
    <Box bg={'gray.50'} flex={'1 1 auto'} py={'2'} display={'flex'}>
      <AdaptiveChakraContainer>
        {children}
      </AdaptiveChakraContainer>
    </Box>
  )
}

export default Main