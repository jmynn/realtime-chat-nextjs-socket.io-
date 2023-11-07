'use client'
import useToasts from '@/hooks/useToasts'
import { addPost } from '@/services/post.service'
import { ReactNode, FunctionComponent, FormEvent } from 'react'
import useSWR from 'swr'

type Props = {
    children: ReactNode
    onClose: () => void
}

const ModalPostForm: FunctionComponent<Props> = ({ children, onClose }): ReactNode => {
    const { mutate, error } = useSWR('posts')
    const { toastError, toastSuccess } = useToasts()
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const post = await addPost(e.target as HTMLFormElement)
            if (!post) throw new Error()
            toastSuccess("Пост был успешно добавлен.")
            mutate()
        } catch (e) {
            if (error) toastError('При обновлении данных что-то пошло не так. Обновите страницу.')
            else toastError()
        } finally {
            onClose()
            return
        }
    }
    return (
        <form onSubmit={e => handleSubmit(e)}>
            {children}
        </form>
    )
}

export default ModalPostForm