import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const mock = {
    cep: null,
    logradouro: null,
    complemento: null,
    bairro: null,
    localidade: null,
    uf: null,
    ibge: null,
    gia: null,
    ddd: null,
    siafi: null
}

export interface AddressFromCep {
    cep: string | null
    logradouro: string | null
    complemento: string | null
    bairro: string | null
    localidade: string | null
    uf: string | null
    ibge: string | null
    gia: string | null
    ddd: string | null
    siafi: string | null
}

export interface UseFetchCepType {
    data: AddressFromCep | undefined,
    isLoading: boolean,
    error: Error | null
}

export function useFetchCep(cep?: string | null): UseFetchCepType{
    const { data, isLoading, error } = useQuery({
        queryKey: ['cep'],
        queryFn: async () => {
            console.log('chamou o fetch')
            if(!cep) return mock;
            const response =  await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            return response.data
        }
    })

    if(isLoading) return { data: mock, isLoading: true, error: null }
    return { data, isLoading, error }
}