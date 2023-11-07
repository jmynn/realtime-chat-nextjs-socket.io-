'use client'
import { FunctionComponent, ReactNode } from 'react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

type Props = {
    children: ReactNode
}

const ChakraProviders: FunctionComponent<Props> = ({children}):ReactNode => {
    return (
        <CacheProvider>
            <ChakraProvider resetCSS>
                {children}
            </ChakraProvider>
        </CacheProvider>
    )
}

export default ChakraProviders
