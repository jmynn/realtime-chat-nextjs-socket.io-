'use client'
import { createContext, ReactNode, useCallback, useMemo, useState } from "react"
import { TUser } from "../types/types"
import { getUsers } from "@/services/user.service"

type TUsers = TUser[]

type TCards = Record<'data' | 'current', TUsers>
type TValue<T = TCards> = {
    search: string
    fetcher: () => Promise<void>
    searcher: (str: string) => void
    disabled: boolean
    cards: T
}

export const searchContext = createContext<TValue>({} as TValue)

const SearchContext = ({ children }: { children: ReactNode }): ReactNode => {
    const [search, setSearch] = useState<string>('')
    const [cards, setCards] = useState<TCards>({
        data: [] as TUsers,
        current: [] as TUsers
    })

    const [disabled, setDisabled] = useState<boolean>(true)

    const fetcher = useCallback(async (): Promise<void> => {
        const users: TUsers = await getUsers()
        setCards({
            data: users,
            current: users
        })
        setDisabled(users?.length ? false : true)
    }, [])

    const searcher = useCallback((str: string) => {
        setSearch(str)
        setCards((prev) => {
            const filtered = [...prev.data].filter(item => {
                if (!cards) return { ...prev, current: [] }
                if (str === '') return item
                if (item.name?.toLowerCase().includes(str) || item.email?.toLowerCase().includes(str)) return item
            })
            return { ...prev, current: filtered }
        })
    }, [cards])

    const resultValue = useMemo(() => ({
        search,
        cards,
        disabled,

        fetcher,
        searcher,

    }), [search, cards, fetcher, searcher, disabled])

    return (
        <searchContext.Provider value={resultValue}>
            {children}
        </searchContext.Provider>
    )
}

export default SearchContext