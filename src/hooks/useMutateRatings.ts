import {api} from '../lib/axios'
import { useMutation } from '@tanstack/react-query'


export function useMutationRatings(){
    const {isLoading, error, mutate} = useMutation(
        async (formData: any) => {
            await api.post('ratings', formData)
        }
    )
}