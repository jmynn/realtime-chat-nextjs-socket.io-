'use client'
import { FunctionComponent, ReactNode, useState, useEffect, useCallback } from 'react'
import { TDialogId, TSocketDialogMessage } from '@/types/types'
import { Flex, Heading } from '@chakra-ui/react'
import Messages from '@/components/ui/Messages/Messages'
import Message from '@/components/ui/Message/Message'
import MessageArea from '@/components/ui/MessageArea/MessageArea'
import DialogInfo from '@/components/ui/DialogInfo/DialogInfo'
import useSWR from 'swr'
import { getMessages } from '@/services/dialog.service'
import { useSession } from 'next-auth/react'
import useToasts from '@/hooks/useToasts'
import { getUserByDialogId } from '@/services/user.service'
import LoaderSpinner from '@/components/ui/LoaderSpinner/LoaderSpinner'
import { v4 } from 'uuid'
import type { UUID } from 'crypto'
import { Socket, io } from 'socket.io-client'
import axios from 'axios'

type Props<D = TDialogId> = { dialogId: D }
let socket: Socket

const Dialog: FunctionComponent<Props> = ({ dialogId: id }): ReactNode => {
  const [messages, setMessages] = useState<TSocketDialogMessage[]>([] as TSocketDialogMessage[])
  const [errorId] = useState<UUID>(v4() as UUID)
  const session = useSession()
  const { toastError } = useToasts()

  const { isLoading, isValidating } = useSWR('messages', async () => await getMessages(id), {
    onSuccess(data, key, config) {
      setMessages(data ?? [] as TSocketDialogMessage[])
    },
  })
  const { data: interlocutor, isLoading: isLoadingInterlocutor, isValidating: isValidatingInterlocutor } = useSWR('interlocutor', async () => await getUserByDialogId(id), {
    onSuccess: (successData) => {
      if (!successData.user) toastError(successData.serverMessage)
    }
  })

  const socketInitializer = useCallback(async () => {
    await axios("/api/ws")

    socket = io({
      path: "/api/ws",
      query: {
        'Room-Id': id,
        "Error-Id": errorId
      },
      reconnection: false,
      withCredentials: true,
    })
    socket.connect()

    socket.on("connect", () => console.log('connected'))
    socket.on("error_message", (msg) => toastError(msg))
    socket.on("receive_message", async (response: TSocketDialogMessage) => {
      !!response && setMessages(prev => [...prev, response])
    })
  }, [])

  const sendMessageHandler = useCallback(async (message: string) => {
    if (!socket) return
    socket.emit("send_message", { value: message, email: session.data?.user?.email as string })
  }, [session])

  useEffect(() => {
    socketInitializer();
    return () => {
      socket?.disconnect()
    }
  }, [])

  return (
    <Flex flexDir={'column'} alignItems={'stretch'} minH={'full'} rowGap={'4'} maxH={'calc(100vh - 60px - 40px - 64px)'}>
      {(isLoadingInterlocutor || isValidatingInterlocutor) && <LoaderSpinner />}
      {(!!interlocutor && (!isValidatingInterlocutor || !isLoadingInterlocutor)) && <DialogInfo image={interlocutor?.user?.image} name={interlocutor?.user?.name} id={interlocutor?.user?.id} />}
      <Messages>
        {(!messages?.length && (!isLoading || !isValidating)) && <Heading size={'md'} color={'purple.700'} textAlign={'center'} p={'2'}>Сообщений нет</Heading>}
        {
          (!!messages?.length && (!isLoading || !isValidating)) && messages?.map((message) => {
            if (message.dialogId !== id) return
            const isMyMessage = message.dialogUsers.user.email === session?.data?.user?.email
            return <Message position={isMyMessage ? 'flex-end' : 'flex-start'} bg={isMyMessage ? 'purple.200' : 'purple.300'} key={message.id}>{message.message}</Message>
          })
        }
        {(isLoading || isValidating) && <LoaderSpinner />}
      </Messages>
      <MessageArea handleSend={sendMessageHandler} />
    </Flex>
  )
}

export default Dialog   