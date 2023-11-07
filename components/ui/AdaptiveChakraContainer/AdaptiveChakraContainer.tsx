import { Container } from '@chakra-ui/react'
import { FunctionComponent, ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const AdaptiveChakraContainer: FunctionComponent<Props> = ({ children }): ReactNode => {
    return (
        <Container maxW={'container.xl'}>
            {children}
        </Container>
    )
}

export default AdaptiveChakraContainer