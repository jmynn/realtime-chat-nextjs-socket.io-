import { FormControl, Box, FormLabel, Input, Textarea } from '@chakra-ui/react'
import { FunctionComponent, ReactNode } from 'react'

type Props = {
    children?: ReactNode
}

const ModalForm: FunctionComponent<Props> = ({ children }): ReactNode => {
    return (
        <FormControl>
            <Box>
                <FormLabel fontSize={'md'} fontWeight={'bold'}>Заголовок поста</FormLabel>
                <Input placeholder='Заголовок' size={'md'} name='title' required />
            </Box>
            <Box mt={'3'}>
                <FormLabel fontSize={'md'} fontWeight={'bold'}>Описание поста</FormLabel>
                <Textarea resize={'none'} size={'md'} placeholder='Текст' name='description' />
            </Box>
            <Box mt={'5'}>
                {children}
            </Box>
        </FormControl>
    )
}

export default ModalForm
