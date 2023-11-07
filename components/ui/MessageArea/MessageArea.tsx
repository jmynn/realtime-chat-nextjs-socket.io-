'use client'
import { FunctionComponent, ReactNode, useRef, useState } from 'react'
import styles from './MessageArea.module.scss'
import { Flex, IconButton, Input } from '@chakra-ui/react'
import { VscSend } from 'react-icons/vsc'
import useToasts from '@/hooks/useToasts'

type Props = {
  children?: ReactNode
  handleSend: (message: string) => Promise<void>
}

const MessageArea: FunctionComponent<Props> = ({ children, handleSend }): ReactNode => {
  const [value, setValue] = useState<string>('')
  const { toastWarning } = useToasts()
  return (
    <Flex flexDir={'row'} columnGap={'2'} flex={'0 0 40px'}>
      <Input variant={'outline'} placeholder='Ваше сообщение здесь...' flex={'1 1 auto'} colorScheme='purple' value={value} onChange={(e) => setValue(e.target.value)} />
      <IconButton colorScheme='purple' aria-label='Send message' icon={<VscSend />} flex={'0 0 auto'} onClick={async e => {
        e.preventDefault()

        if (!value) {
          toastWarning("Для отпавки необходимо написать сообщение.")
          return
        }
        await handleSend(value)

        setValue('')
      }} />
    </Flex>
  )
}

export default MessageArea