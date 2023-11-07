'use client'
import { SessionProvider } from 'next-auth/react'
import { FunctionComponent, ReactNode } from 'react'
import ChakraProviders from './ChakraProviders'

type Props = {
    children: ReactNode
}

const Providers: FunctionComponent<Props> = ({ children }): ReactNode => {
    return (
        <ChakraProviders>
            <SessionProvider>
                    {children}
            </SessionProvider>
        </ChakraProviders>
    )
}

export default Providers