import { createContext } from "react";
import { UseFetchGetUserType, useFetchGetUser } from "../hooks/useFetchGetUser";

const mockUserId = 'uuid-luiza-santos';

export interface CurrentUserContextType {
    data: UseFetchGetUserType['data'],
    isLoading: UseFetchGetUserType['isLoading'],
    error: UseFetchGetUserType['error']
}

export const CurrentUserContext = createContext<CurrentUserContextType>({} as CurrentUserContextType);

export function CurrentUserContextProvider({children}: {children: React.ReactNode}) {
    const {data, isLoading, error} = useFetchGetUser(mockUserId)


    return (
        <CurrentUserContext.Provider value={{
            data: data!,
            isLoading: isLoading,
            error: error
        }}>
            {children}
        </CurrentUserContext.Provider>
    )
}