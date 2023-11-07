'use client'
import { ReactNode } from 'react'
import styles from './SignInForm.module.scss'
import { Button } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

const SignInForm = (): ReactNode => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get("callbackUrl") || '/dialogs'
  return (
    <div className={styles.signin}>
      <Button rightIcon={<FcGoogle />} colorScheme='purple' onClick={() => signIn('google', { redirect: false, callbackUrl })}>Войти с помощью аккаунта Google</Button>
    </div>
  )
}

export default SignInForm