'use client'
import { useToast } from '@chakra-ui/react';
import React, { CSSProperties, ReactNode, useMemo, useState, useRef, FunctionComponent } from 'react';
import { useDropzone } from 'react-dropzone';
import { GiCloudUpload } from 'react-icons/gi'
import styles from './ModalDropzone.module.scss'
import DragAndDropLoaded from '../DragAndDropLoaded/DragAndDropLoaded';

const colors = {
    reject_border: '#C53030',
    reject_bg: '#FC8181',
    active_bg: '#68D391',
    active_border: '#2F855A',
    background: '#D6BCFA',
    border: '#805AD5',
    color: '#553C9A',
    color_action: '#FAF5FF',
    focus: '#322659'
}
const baseStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    backgroundColor: colors.background,
    color: colors.color,
    outline: 'none',
    transition: 'all .24s ease-in-out',
    textAlign: 'center'
};

const focusedStyle: CSSProperties = {
    borderColor: colors.focus,
    borderStyle: 'solid',
    color: colors.color_action
};

const acceptStyle: CSSProperties = {
    borderColor: colors.active_border,
    backgroundColor: colors.active_bg,
    borderStyle: 'solid',
    color: colors.color_action
};

const rejectStyle: CSSProperties = {
    borderColor: colors.reject_border,
    backgroundColor: colors.reject_bg,
    borderStyle: 'solid',
    color: colors.color_action
};


const StyledDropzone: FunctionComponent = (): ReactNode => {
    const toast = useToast()
    const coverRef = useRef<HTMLInputElement | null>(null)
    const [fileCover, setFileCover] = useState<File | null>(null)
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: { 'image/*': [] },
        maxFiles: 1,
        multiple: false,
        onDrop(acceptedFiles, fileRejections, event) {
            if (fileRejections.length) {
                toast({ status: 'error', description: 'Попробуйте выбрать другой файл.', duration: 3000, position: 'top-right' })
                setFileCover(null)
                return
            }
            const file = acceptedFiles[0]
            setFileCover(file)
            
            const files = new DataTransfer()
            files.items.add(file)

            coverRef.current!.files = files.files
            return
        },
    });

    const style: CSSProperties = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    return (
        <>
            {
                fileCover ?
                    <DragAndDropLoaded file={fileCover} setFile={setFileCover} /> :
                    <div {...getRootProps({ style })} className={styles.dropzone}>
                        <GiCloudUpload />
                        <p>Перетащите картинку или нажмите, чтобы выбрать</p>
                        <input {...getInputProps()}  id='inputFileCover' accept="image/jpeg,image/png,image/jpg,image/webp" type='file' />
                    </div>
            }
            <input name='cover' type='file' style={{width: 0.1, height: 0.1, display: 'none'}} ref={coverRef} />
        </>

    );
}
export default StyledDropzone