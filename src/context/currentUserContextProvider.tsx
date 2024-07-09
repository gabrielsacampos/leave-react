import { createContext } from "react";
import { UseFetchGetUserType, useFetchGetUser } from "../hooks/useFetchGetUser";

const mockUserId = 'uuid-luiza-santos';

export type CurrentUserContextType = UseFetchGetUserType;

export const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

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