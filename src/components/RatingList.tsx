import {  Card } from "@radix-ui/themes"
import { useFetchRatingsList } from "../hooks/useFetchRatingsList"
import { dateFormatter } from "../utils/dateFormatter"
import { Badge, Avatar } from "@mui/material"
import Alien from '../assets/personas/alien.svg'
import Astronaut from '../assets/personas/astronaut.svg'
import Curious from '../assets/personas/curious.svg'
import Explorer from '../assets/personas/explorer.svg'
import Scientist from '../assets/personas/scientist.svg'

const personasMock = [
    {key: 'alien', src: Alien},
    {key: 'astronaut', src: Astronaut},
    {key: 'curious', src: Curious},
    {key: 'explorer', src: Explorer},
    {key: 'scientist', src: Scientist},
]


export function RatingList(){
    const {data, isLoading} = useFetchRatingsList()

    if(isLoading) return <div>Loading...</div>

    
    return (
        <div className="flex flex-col gap-1 max-w-4xl">
            {
                data!.map((item) => {
                    return (
                        <Card
                            variant="classic"
                            style={{width: '100%'}}
                        >
                            <div className="flex justify-between">
                                <div className="flex gap-5 items-center">
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        badgeContent={
                                            <Avatar 
                                                style={{backgroundColor: 'lightgray', border: '2px solid white'}}
                                                sx={{ width: 30, height: 30 }}
                                                alt="Remy Sharp" 
                                                src={personasMock.find(persona => persona.key === item.user_category)?.src}
                                                />
                                            }
                                            >
                                            <Avatar 
                                                alt="Remy Sharp" 
                                                src={item.user_image_url} 
                                                
                                            />
                                        </Badge>
                                    <div>
                                        <h2 className="font-bold text-zinc-600">{item.user_name}</h2>
                                        <span className="text-xs tezt-zinc-400">{dateFormatter.format( new Date(item.created_at))}</span>
                                    </div>
                                </div>
                                <div className="p-2 flex flex-col ml-4">
                                    <p className="text-xs text-zinc-500 italic max-w-[500px]">"{item.review}"</p>
                                    <div className="w-full text-xs flex justify-end items-center gap-1 mt-5">
                                        <span className="font-bold text-sm text-zinc-500">{item.stars}</span>
                                        <i className="pi pi-bolt" style={{ fontSize: '1rem', color: 'orange' }}></i>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )
                })
            }
        </div>
    )
}