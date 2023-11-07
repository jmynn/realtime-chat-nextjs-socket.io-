'use server'
import { FunctionComponent, ReactNode } from 'react'
import styles from './Layout.module.scss'
import Main from '@/components/ui/Main/Main'
import AsideMenu from '@/components/ui/AsideMenu/AsideMenu'
import dynamic from 'next/dynamic'
import LoaderSpinner from '@/components/ui/LoaderSpinner/LoaderSpinner'

type Props = {
  children: ReactNode
}

const Header = dynamic(() => import('@/components/ui/Header/Header'), {
  ssr: true,
  loading: () => <LoaderSpinner />
})

const Layout: FunctionComponent<Props> = async ({ children }): Promise<JSX.Element> => {
  return (
    <div className={styles.layout}>
      <Header />
      <Main>
        <AsideMenu>{children}</AsideMenu>
      </Main>
    </div>
  )
}

export default Layout