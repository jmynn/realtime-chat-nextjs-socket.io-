import { useToast } from '@chakra-ui/react'
import { ReactNode, useCallback, useMemo } from 'react'

const useToasts = () => {
    const toast = useToast({
        duration: 3000,
        position: 'top-right'
    })
    const toastError = useCallback((message?: string) => toast({
        status: 'error',
        description: message ?? `Произошла ошибка. Повторите позже.`,
        colorScheme: 'red'
    }), [toast])
    const toastSuccess = useCallback((message?: string) => toast({
        status: 'success',
        description: message ?? "Операция успешно завершена.",
        colorScheme: 'green',
    }), [toast])
    const toastWarning = useCallback((message?: string) => toast({
        status: 'warning',
        description: message ?? "Предупреждение о неполных данных.",
        colorScheme: 'orange',
    }), [toast])

    return useMemo(() => ({ toastError, toastSuccess, toastWarning }), [toastError, toastSuccess, toastWarning])
}

export default useToasts