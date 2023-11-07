import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { FunctionComponent, ReactNode } from 'react'
import ModalForm from './ModalForm'
import ModalDropzone from '../Dropzone/ModalDropzone'
import styles from './ModalAddPost.module.scss'
import ModalPostForm from '../ModalPostForm/ModalPostForm'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const ModalAddPost: FunctionComponent<Props> = ({ isOpen, onClose }): ReactNode => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Создать пост</ModalHeader>
        <ModalCloseButton />
        <ModalPostForm onClose={onClose}>
          <ModalBody>
            <ModalForm>
              <ModalDropzone />
            </ModalForm>
          </ModalBody>
          <ModalFooter className={styles.modalFooter}>
            <Button colorScheme='gray' mr={3} onClick={onClose}>Закрыть</Button>
            <Button colorScheme='purple' mr={3} type='submit'>Создать</Button>
          </ModalFooter>
        </ModalPostForm>
      </ModalContent>
    </Modal>
  )
}

export default ModalAddPost

