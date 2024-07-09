import {Avatar, Badge, Card} from '@radix-ui/themes'
import { useFetchTopcards } from '../hooks/useFetchTopCards'

export function TopCards(){
    const {data, isLoading} = useFetchTopcards()

    if(isLoading) return <div>Loading...</div>
    
    return (
        <div className="flex justify-center gap-10 p-4 bg-indigo-50 border-b border-black/10">
            {
                data!.map((item, index) => {
                    let badgeTanslated = ''
                    let badgeColor: 'indigo' | 'green' | 'blue' = 'blue'
                    
                    switch(item.tag){
                        case 'popular':
                            badgeTanslated = 'Em Alta 🔥'
                            badgeColor = 'indigo'
                            break
                        case 'advertising':
                            badgeTanslated = 'Recomendado'
                            badgeColor = 'green'
                            break
                    }

                    return (
                        <div className='relative max-w-4xl'>
                            <Card 
                                key={index}
                                style={{width: 250, height: 80}}
                            >
                                <div className='flex'>
                                    <Avatar 
                                        size="5"
                                        className='border-2 border-black/10 p-0.5'
                                        radius='full' 
                                        src={item.image_url} 
                                        fallback="A"
                                    />

                                    <div className='flex flex-col w-full items-center justify-center'>
                                        <span className='text-sm text-zinc-500 font-bold'>{item.name}</span>
                                        <div className="text-end">
                                            <span className='text-xs text-zinc-500'>{item.average_rating}</span>
                                            <i className="pi pi-bolt" style={{ fontSize: '0.8rem', color: 'orange' }}></i>
                                        </div>
                                    </div>            
                                </div>
                            </Card>
                            <Badge
                                color={badgeColor}
                                variant='solid'
                                className='absolute -bottom-2 -left-2 z-10'
                            >
                                {badgeTanslated}
                            </Badge>
                        </div>

                    )
                })
            }
        </div>
    )
}