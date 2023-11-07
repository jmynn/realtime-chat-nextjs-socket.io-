import { CSSProperties, FunctionComponent, ReactNode } from 'react'
import styles from './Message.module.scss'
import { Flex } from '@chakra-ui/react'

type Props = {
  children: string
  position: 'flex-end' | 'flex-start'
  bg: 'purple.300' | 'purple.200'
}

const Message: FunctionComponent<Props> = ({ children, position, bg }): ReactNode => {
  return (
    <Flex wordBreak={'break-all'} className={styles.message} alignSelf={position} color={'purple.900'} borderRadius={'21px'} py={'2'} px={'3'} bg={bg}>
      {children}
    </Flex>
  )
}

export default Message