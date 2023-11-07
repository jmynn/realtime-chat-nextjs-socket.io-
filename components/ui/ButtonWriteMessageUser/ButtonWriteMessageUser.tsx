'use client'
import { getDialogByUserId } from '@/services/dialog.service'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FunctionComponent, ReactNode } from 'react'

type TypeButtonWriteMessageUser = {
  id: string
}

const ButtonWriteMessageUser: FunctionComponent<TypeButtonWriteMessageUser> = ({ id }): ReactNode => {
  const { push } = useRouter()
  const handleClick = async (id: string): Promise<void> => {
    const dialogURL = await getDialogByUserId(id)
    push(dialogURL)
  }

  return (
    <Button colorScheme='purple' onClick={() => handleClick(id)}>
      Написать сообщение
    </Button>
  )
}

export default ButtonWriteMessageUser