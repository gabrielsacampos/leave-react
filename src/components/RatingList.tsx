import {  Card } from "@radix-ui/themes"
import { useFetchRatingsList } from "../hooks/useFetchRatingsList"
import { dateFormatter } from "../utils/dateFormatter"
import { Badge, Avatar } from "@mui/material"

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
                                                sx={{ width: 30, height: 30 }}
                                                alt="Remy Sharp" 
                                                src={item.image_url} 
                                                className="border-2 border-white"
                                            />
                                        }
                                        >
                                            <Avatar 
                                                alt="Remy Sharp" 
                                                src={item.image_url} 
                                                
                                            />
                                        </Badge>
                                    <div>
                                        <h2 className="font-bold text-zinc-600">{item.name}</h2>
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