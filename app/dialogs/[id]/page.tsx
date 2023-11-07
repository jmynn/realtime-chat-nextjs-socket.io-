import Dialog from '@/components/screens/Dialog/Dialog'
import { TDialogId } from '@/types/types'
import { FunctionComponent, ReactNode } from 'react'

type Props<D = TDialogId> = {
    params: {
        id: D
    }
}
export const dynamic = 'auto'

const Page: FunctionComponent<Props> = ({ params: { id } }): ReactNode => {
    return (
        <Dialog dialogId={id} />
    )
}

export default Page