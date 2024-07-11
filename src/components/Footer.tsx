import { Avatar, Button, Card, Separator } from "@radix-ui/themes";
import { useContext } from "react";
import { CurrentUserContext } from "../context/currentUserContextProvider";
import { CreateEstablishmentButton } from "./CreateEstablishmentButton";
import Astronaut from '../assets/personas/astronaut.svg'
import { RankingList } from "./RankingList";



export function Footer(){
    const {data, isLoading, error} = useContext(CurrentUserContext)

    if(error) return <div>Erro: {error.message}</div>
    if(isLoading) return <div>Carregando...</div>

    
    return (
        
            <footer 
                className=" w-full flex gap-5 justify-between items-center px-4 h-24 fixed bottom-0 bg-zinc-900/10 backdrop-blur-md border-t border-black/10"
            >

                <div className="w-1/3 flex gap-2 items-center">
                    <RankingList>
                        <Button
                            color="green"
                            variant="solid"
                            size="4"
                            radius="full"
                        >
                            
                            Ranking 🌟
                        </Button>
                    </RankingList>
                        <Separator orientation="vertical" size="2" mr="3" />
                         <div>
                            <p className="text-xs text-zinc-500 border-b border-zinc-500/10 ">Seu score atual</p>
                            <div className="flex flex-col ">
                                <span className="text-xs text-blue-500">Semanal: 3123</span>
                                <span className="text-xs text-green-500">Global: 3124</span>
                            </div>


                         </div>
                    
                </div>

                
                <div className="w-1/3">
                    <Card
                        className=" bg-gray-200 mb-4"
                    >
                        <div className="flex  items-center gap-2">
                            <div className="relative">
                                <Avatar fallback="A" radius="full" size="4" src={data.image_url}/>
                                <Avatar 
                                    style={{backgroundColor: 'lightgray', border: '2px solid white'}}
                                    fallback="A" 
                                    radius="full" 
                                    size="2" 
                                    src={Astronaut} 
                                    className="absolute -bottom-1 z-10"
                                    ml="-4"
                                />
                            </div>

                            <div className="ml-4">
                                <h1 className="w-26 ">Bem vindo de volta, <span className="text-indigo-700 font-semibold">{data.name}</span></h1>
                                <p className="text-xs ml-2 text-green-800 bold">Seu nível atual é <span className="font-extrabold text-green-600">ASTRONAUTA</span></p> 
                            </div>
                        </div>
                        <div className="text-end">
                        </div>
                    </Card>
                    
                </div>
                    
                <div className="w-1/3 flex justify-end">
                        <CreateEstablishmentButton />
                </div>
            </footer>
        
    )
}