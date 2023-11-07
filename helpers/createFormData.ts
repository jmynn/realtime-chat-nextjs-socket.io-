import { fileToBase64 } from "./convertFile"

export const createFormData = async (form: HTMLFormElement): Promise<FormData> => {
    let base64: string
    if(form?.cover?.files?.length) base64 = await fileToBase64(form?.cover?.files[0] as Blob)
    const formData = new FormData(form)
    formData.forEach(async (val, key) => {
        if (typeof val === 'object' && (val as File)?.size === 0) formData.delete(key)
        if (typeof val === 'object' && (val as File)?.size !== 0) formData.set(key, base64)
    })

    return formData
}



