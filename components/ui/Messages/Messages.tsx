'use client'
import { FunctionComponent, ReactNode, useLayoutEffect, useRef } from 'react'
import styles from './Messages.module.scss'
import { Flex } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

const Messages: FunctionComponent<Props> = ({ children }): ReactNode => {
  const messagesRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    messagesRef.current?.scrollBy({ left: 0, top: messagesRef.current.scrollHeight, behavior: 'smooth'})
  })

  return (
    <Flex flex={'1 1 auto'} flexDir={'column'} p={'2'} rowGap={'2'} overflowY={'scroll'} className={styles.messages} ref={messagesRef}>
      {children}
    </Flex>
  )
}

export default Messages