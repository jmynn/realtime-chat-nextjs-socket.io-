import LoaderSpinner from '@/components/ui/LoaderSpinner/LoaderSpinner'
import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
const SignInForm = dynamic(() => import('@/components/ui/SignInForm/SignInForm'), {
  loading: () => <LoaderSpinner /> ,
  ssr: false
})

const SignIn = (): ReactNode => {
  return (
    <SignInForm />
  )
}

export default SignIn