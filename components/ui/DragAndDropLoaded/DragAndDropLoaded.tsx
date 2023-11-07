'use client'
import { Dispatch, FunctionComponent, ReactNode, SetStateAction } from 'react'
import styles from './DragAndDropLoaded.module.scss'
import { BsFileEarmarkArrowDown, BsTrash } from 'react-icons/bs'
import { Box, Flex, IconButton } from '@chakra-ui/react'

type Props = {
  setFile: Dispatch<SetStateAction<null | File>>
  file: File
}

const DragAndDropLoaded: FunctionComponent<Props> = ({ setFile, file }): ReactNode => {
  const onDelete = () => setFile(null)
  return (
    <Flex flexDir={'row'} columnGap={'2'} justifyContent={'space-between'} alignItems={'center'}>
      <Box flex={'0 0 auto'} className={styles.icon}><BsFileEarmarkArrowDown /></Box>
      <Box wordBreak={'break-all'}>{file.name}</Box>
      <IconButton aria-label='delete cover' icon={<BsTrash />} colorScheme='gray' onClick={e => {
        e.stopPropagation()
        onDelete()
      }} />
    </Flex>
  )
}

export default DragAndDropLoaded