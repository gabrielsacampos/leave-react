

import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/axios'


interface Ratings {
    user_name: string,
    user_image_url: string,
    user_category: string,
    review: string,
    date: string,
    stars: number,
    establishment_name: string,
    establishment_image: string,
    created_at: string
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