import Bolt from '@mui/icons-material/Bolt';
import { Rating } from "@mui/material";
import { Button, Dialog, Select, TextArea } from "@radix-ui/themes";
import axios from 'axios';
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { CurrentUserContext } from "../context/currentUserContextProvider";
import { useFetchEstablishments } from "../hooks/useFetchEstablishments";
import { queryClient } from "../lib/react-query";

export interface RatingDialogProps {
    children: React.ReactNode
}

export function RatingDialog({children}: RatingDialogProps){
    const {data: user} = useContext(CurrentUserContext)
    const {register, handleSubmit, watch} = useForm()
    const {data, isLoading, error}  = useFetchEstablishments()
    const [ratingValue, setRatingValue] = useState<number | null>(0);
    const [isOpened, setIsOpened] = useState(false)

    if(error) return <div>Erro: {error.message}</div>
    if(isLoading) return <div>Carregando estabelecimentos...</div>

    function handleRatingChange(_:unknown, newValue: number | null){
        setRatingValue(newValue)
        register('stars', {value: newValue})   
    }

    function handleSelectChange(value: string){
        register('id_establishment', {value})
    }
    console.log(watch())

    async function postData(){
        try{

            register('id_user', {value: user.id})
            const formData = watch()
            await axios.post('http://localhost:3000/ratings', formData)
            setIsOpened(false)
            queryClient.invalidateQueries({queryKey: ['ratings']})
            


        }catch(err){
            console.error(err)
        }
    }


    return (
        <Dialog.Root
            open={isOpened}
            onOpenChange={() => setIsOpened(!isOpened)}
        >
            <Dialog.Trigger>
                {children}
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>Vamos lá, nos conte conte foi sua experiência!</Dialog.Title>
                <div className="flex flex-col gap-5 w-full items-center">
                    <div>
                        <p>Selecione o estabelecimento que você visitou</p>
                        <Select.Root
                            onValueChange={handleSelectChange}
                        >
                            <Select.Trigger
                                style={{width: '100%'}}
                            />
                            
                            <Select.Content>
                                {data?.map((establishment) => (
                                    <Select.Item value={establishment.id} onSelect={() => console.log('selected')}>
                                        {establishment.name}
                                    </Select.Item>
                                ))}
                            </Select.Content>
                            
                        </Select.Root>
                    </div>
                    <TextArea 
                        {...register('review')}
                        placeholder="e ai, como que foi ?" 
                        style={{width: '100%'}}
                    />

                    <Rating
                        name="simple-controlled"
                        value={ratingValue}
                        icon={<Bolt />}
                        emptyIcon={<Bolt />}
                        onChange={(event, newValue) => {
                            handleRatingChange(event, newValue)
                        }}
                    />
                        
                    <Button
                        onClick={handleSubmit(postData)}
                        color="green"
                        size="3"
                    >
                        Avaliar
                    </Button>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    )
}