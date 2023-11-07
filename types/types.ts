//? using
export type TId = string
//? using
export type TUserId = string
//? using
export type TDialogId = `${string}-${string}-${string}-${string}-${string}`
//? using
export type TUser<U = TUserId> = {
    name?: string | null
    id?: U
    image?: string | null
    email?: string | null
}
//? using
export type TPost<U = TUserId, I = TId> = {
    id: I
    title: string
    description?: string
    image?: string
    likesCount: number
    userId: U
}
//? using
export type TLike<U = TUserId, I = TId> = {
    id: I
    userId: U
    postId: string
}

export type TMessage<I = TId, U = TUserId, D = TDialogId> = {
    id: I
    message: string
    userId: U
    dialogId?: D
}
//* fix type
// TDialog -> T
export type TDialog<I = TId, D = TDialogId> = {
    id: I
    dialogId: D
}

//? using
export type TMessageApi = {
    serverMessage: string
}
//? using
export type TDialogCreate<D = TDialogId> = {
    isCreated: boolean
    dialogId?: D
}
//? using
export type TDialogData<T = any, D = TDialogId> = {
    dialogs: T[] | []
    dialogId: null | D
}
//? using
export type TRoutes = {
    route: string
    label: string
    icon: JSX.Element
    isAuth?: true
}
//& not using
// export type TPostData = {
//     title: string
//     description?: string
//     cover?: File
// }
//& not using
// export type TDialogItem<U = TUser> = {
//     dialogId: TDialogId,
//     dialogUsers: {
//         dialogId: TDialogId,
//         id: TId,
//         user: NonNullable<Omit<U, 'id'>>,
//         message?: {
//             message: string
//         }[]
//         userId: TUserId
//     }[]
// }

export type TDialogItem2<U = TUser, D = TDialogId> = {
    dialogId: D,
    messages: [] | { message: string }[],
    dialog: {
        dialogUsers: {
            user: NonNullable<Omit<U, 'id' | 'email'>>
        }[]
    }
}

export type TResponseToggleLike = {
    isLike: boolean
    currentLikesCount: number
}

export type TDialogMessage = (Omit<TMessage, 'userId'> & Partial<Pick<TMessage, 'userId'>> & { dialogUsers: { user: { [P in keyof Pick<TUser, 'email'>]: TUser[P] } } })
export type TSocketDialogMessage<T = TDialogMessage> = Omit<T, "userId">

export type TOnePost<P = TPost, U extends TUser = TUser> = (P & { user: U } & { likes: { user: Pick<U, 'email'> }[] })
export type TDialogsWithPosts<N = TOnePost> = { dialogUsers: { user: { posts: N[] } }[] }
