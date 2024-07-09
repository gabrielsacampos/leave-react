import { useQuery } from "@tanstack/react-query"
import { api } from "../lib/axios"

interface User {
    id: string
    name: string
    email: string
    image_url: string
    created_at: string
    updated_at: string
}

export interface UseFetchGetUserType {
    data: User | undefined,
    isLoading: boolean,
    error: Error | null
}

export function useFetchGetUser(id: string):UseFetchGetUserType  {
    const {data, isLoading, error} = useQuery(
        {
            queryKey: ['user'],
            queryFn: async () => {
                const response = await api.get('users/'+id)
                return response.data
            }
        }
    )

    if (isLoading) {
        return {data: undefined, isLoading, error: null}
    }

    return {data, isLoading, error}
}