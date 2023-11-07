'use client'
import { FunctionComponent, ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const SessionProviders: FunctionComponent<Props> = ({children}):ReactNode => {
    return (
        <SessionProviders>
            {children}
        </SessionProviders>
    )
}

export default SessionProviders