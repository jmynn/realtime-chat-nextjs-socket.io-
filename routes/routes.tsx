import { TRoutes } from '@/types/types'
import { LuMessagesSquare } from 'react-icons/lu'
import { PiNewspaper } from 'react-icons/pi'
import { VscAccount, VscHome } from 'react-icons/vsc'

export const routes:TRoutes[] = [
  {
    label: 'Главная',
    route: '/',
    icon: <VscHome />
  },
  {
    route: '/dialogs',
    label: 'Чаты',
    icon: <LuMessagesSquare />,
    isAuth: true
  },
  {
    route: '/account',
    label: 'Профиль',
    icon: <VscAccount />,
    isAuth: true
  },
  {
    route: '/news',
    label: 'Новости',
    icon: <PiNewspaper />,
    isAuth: true
  },
]
