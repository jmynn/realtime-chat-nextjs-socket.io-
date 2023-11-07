import { Spinner } from '@chakra-ui/react'
import { ReactNode } from 'react'
import styles from './LoaderSpinner.module.scss'

const LoaderSpinner = (): ReactNode => {
  return (
    <div className={styles.loader}>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='purple.200'
        color='purple.500'
        size='xl'
      />
    </div>
  )
}

export default LoaderSpinner