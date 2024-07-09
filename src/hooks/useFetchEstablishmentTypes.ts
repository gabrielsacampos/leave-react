import { useQuery } from "@tanstack/react-query"
import { api } from "../lib/axios"



interface EstablishmentType {
    id: string
    name: string
}

interface UseFetcEstablishmentTypesType {
    data: EstablishmentType[] | undefined,
    isLoading: boolean,
    error: Error | null
}




export function useFetchEstablishmentTypes(): UseFetcEstablishmentTypesType {
    const {data, isLoading, error} = useQuery(
        {
            queryKey: ['establishmentTypes'],
            queryFn: async () => {
                const response = await api.get('establishment_types')
                return response.data.establishmentTypes
            }
        }
    )

    return {data, isLoading, error}
}