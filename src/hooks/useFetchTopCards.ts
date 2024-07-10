import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";

interface EstablishmentTopcard {
    id: string
    average_rating: number
    name: string
    address: string
    image_url: string
    description: string
    id_type: string
    id_sponsor: string
    tag: string
    created_at: string
    updated_at: string
}

export type UseFetchTopcardsType = {
    data: EstablishmentTopcard[] | undefined,
    isLoading: boolean,
    error: Error | null
}

export function useFetchTopcards(): UseFetchTopcardsType {
    const {data, isLoading, error} = useQuery(
        {
            queryKey: ['topcards'],
            queryFn: async () => {
                const response = await api.get('establishments/topcards')
                return response.data.establishments
            }
        }
    )

    return {data, isLoading, error}
}