'use client'
import useToasts from '@/hooks/useToasts'
import { deleteDialog, getDialogs } from '@/services/dialog.service'
import { Flex, Heading, Spinner } from '@chakra-ui/react'
import { ReactNode, useRef } from 'react'
import useSWR from 'swr'
import DialogItem from '../DialogItem/DialogItem'

const DialogList = (): ReactNode => {
  const { data: dialogs, isLoading, mutate, isValidating, error } = useSWR('dialogs', getDialogs)
  const dialogsRef = useRef<HTMLDivElement>(null)
  const { toastError, toastSuccess } = useToasts()
  const handleDelete = async (target: EventTarget) => {
    const dialogId = (target as HTMLElement).dataset.id

    if (!dialogId) {
      toastError('Для удаления необходиом выбрать диалог.')
      return
    }
    if (!confirm(`Are you sure you want to delete this dialog?`)) {
      toastError("Удаление диалога отменено.")
      return
    }

    const { isDeleted, serverMessage } = await deleteDialog(dialogId)

    if (!isDeleted) {
      toastError(serverMessage)
      return
    }

    await mutate()

    if (!!error) {
      toastError(error)
      return
    }

    toastSuccess(serverMessage)
  }
  return (
    <Flex flexDir={'column'} rowGap={'2'} ref={dialogsRef} onContextMenu={e => {
      e.preventDefault()
      handleDelete(e.target)
    }}>
      {
        !!dialogs?.length && dialogs.map(dialog => {
          const { messages, dialogId, dialog: { dialogUsers: [{ user: { image, name } }] } } = dialog
          return <DialogItem key={dialogId} id={dialogId} name={name} image={image} message={messages[0]?.message} />
        })
      }
      {(!dialogs?.length && (isLoading || isValidating)) && <Spinner thickness='4px' speed='0.65s' emptyColor='purple.200' color='purple.500' size='xl' mx={'auto'} my={0} />}
      {(!dialogs?.length && (!isLoading || !isValidating)) && <Heading size={'md'} color={'purple.700'} textAlign={'center'} p={'2'}>Нет диалогов.</Heading>}
    </Flex>
  )
}

export default DialogList