import { Avatar, Badge } from '@mui/material';
import { Badge as BadgeRadix, Dialog, Separator } from '@radix-ui/themes';
import { ArrowUp } from 'lucide-react';
import GlobeIcon from '../assets/globe.svg';
import HighVoltage from '../assets/high-voltage.svg';
import Alien from '../assets/personas/alien.svg';
import Astronaut from '../assets/personas/astronaut.svg';
import Curious from '../assets/personas/curious.svg';
import Explorer from '../assets/personas/explorer.svg';
import Scientist from '../assets/personas/scientist.svg';
import { useFetchRankingList } from '../hooks/useFetchRankingList';
import RocketEmoji from '../assets/rocket-emoji.svg';

const changedPositionsMock = [0, -2, 5, 3, 4, -1, 3, 12, 2, 5, 6, 9 -4, 2, -5, 1, -6]

const personasMock = [
    {key: 'alien', src: Alien},
    {key: 'astronaut', src: Astronaut},
    {key: 'curious', src: Curious},
    {key: 'explorer', src: Explorer},
    {key: 'scientist', src: Scientist},
]
export interface RankingListPorps {
    children: React.ReactNode
}

export function RankingList({children}: RankingListPorps){
    const {data, isLoading, error} = useFetchRankingList()

    if(error) return <div>Erro: {error.message}</div>
    if(isLoading) return <div>Carregando...</div>

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        {children}
      </Dialog.Trigger>
      <Dialog.Content
        style={{height: '600px', width: '500px'}}
      >
        <Dialog.Title> 
            <div className='flex flex-col gap-2 items-center justify-center'>
              <div className='flex items-center gap-1'>
                <img src={RocketEmoji} width="40px" /> 
                <span className='text-xl text-zinc-600'>Ranking da semana </span>
              </div>
              <Separator orientation="vertical" size="1" />
            </div>
          </Dialog.Title>
        <ul  className='flex flex-col gap-2 text-lg'>
          {data!.map((item, index) => {

            const daysOnPlatform = Math.floor((new Date().getTime() - new Date(item.created_at).getTime()) / (1000 * 3600 * 24))
            
            let positionChanged = 0
              if(index % 3 === 0){
                positionChanged = changedPositionsMock[index]
              }else{
                positionChanged = 0
              }
            

            

            return (
              <li className='flex flex-col gap-5 justify-center pl-2'>
                <div className='flex items-center'>
                  <BadgeRadix className='mr-2 '>{index + 1}º</BadgeRadix>
                  <div className='w-1/2 flex gap-5 items-center'>
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
                    <div className='flex flex-col'>
                      <span className='font-bol text-zinc-500 truncate' key={item.id}>{item.user_name}</span>
                      <span className='text-xs text-zinc-400'><span className='font-semibold'>{daysOnPlatform}</span> dias explorando</span>
                    </div>
                  </div>
                  <div className='w-1/2'>
                  </div>
                  <div className='w-[200px] flex items-center justify-end'>
                          <div className='w-1/2'>
                            <PositionBadge positionChanged={positionChanged}/>
                          </div>
                          <div className="flex flex-col gap-1 items-end">
                            <span className='flex gap-1 text-blue-600'><img src={HighVoltage} width="20px" />{item.week_score}</span>
                            <span className='flex gap-1 text-green-600 text-sm'><img src={GlobeIcon} width="20px" />{item.global_score}</span>
                          </div>
                  </div>
                </div>
                <Separator orientation="horizontal" size="4" />
              </li>
              
            )
          })}
        </ul>
      </Dialog.Content>
    </Dialog.Root>
  );
}


export function PositionBadge({positionChanged}: {positionChanged: number}){
  if(positionChanged === 0 || !positionChanged){
    return (
      null
    )
  }
  return (
    <BadgeRadix 
      className='flex gap-1 text-xs'
      color={positionChanged > 0 ? 'green' : 'tomato'}
    >
      { positionChanged > 0 ? <><ArrowUp size={15}/> {positionChanged}</> : <><ArrowUp size={15}style={{transform: 'rotate(180deg)'}} />{positionChanged}</> }
    </BadgeRadix>
  )
}