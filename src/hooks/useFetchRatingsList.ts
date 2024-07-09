

import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/axios'


interface Ratings {
    id: string
    stars: number
    review: string
    id_establishment: string
    id_user: string
    created_at: string
    updated_at: string
    name: string
    address: string
    description: string
    id_type: string
    id_sponsor: string
    tag: string
    image_url: string
    email: string
    global_score: number
    week_score: number
}

export type UseFetchRatingsListType = {
    data: Ratings[] | undefined,
    isLoading: boolean,
    error: Error | null
}

export function useFetchRatingsList(): UseFetchRatingsListType {
    const {data, isLoading, error} = useQuery(
        {
            queryKey: ['ratings'],
            queryFn: async () => {
                const response = await api.get('ratings')
                return response.data.ratings
            }
        }
    )

    return {data, isLoading, error}
}