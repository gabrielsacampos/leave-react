import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";


export interface Ranking {
    id: string
    user_name: string
    user_image_url: string
    user_category: string
    email: string
    global_score: number
    week_score: number
    created_at: string
}

export interface UseFetchRankingListType{
    data: Ranking[] | undefined,
    isLoading: boolean,
    error: Error | null
}

export function useFetchRankingList(): UseFetchRankingListType{
  const {data, isLoading, error} = useQuery({
    queryKey: ['ranking'],
    queryFn: async () => {
      const response = await api.get('ranking')
      return response.data.users
    }
  })

    return {data, isLoading, error}
}