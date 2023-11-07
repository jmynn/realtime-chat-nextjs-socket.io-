export async function fileToBase64(file: Blob): Promise<string> { 
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result?.toString() || '')
        reader.onerror = error => reject(error)
    })
}
