import { useQuery } from "@tanstack/react-query"
import { api } from "../lib/axios"

export interface Establishment {
    id: string
    sponsor_name?: string
    sponsor_image?: string
    image_url: string
    description: string
    name: string
    address: string
}

export type UseFetchEstablishmentsType = {
    data: Establishment[] | undefined,
    isLoading: boolean,
    error: Error | null
}

export function useFetchEstablishments(): UseFetchEstablishmentsType {
    const {data, isLoading, error} = useQuery(
        {
            queryKey: ['establishments'],
            queryFn: async () => {
                const response = await api.get('establishments')
                return response.data.establishments
            }
        }
    )

    return {data, isLoading, error}
}