import Bolt from '@mui/icons-material/Bolt';
import Speech from '../assets/speech.svg'
import { Alert, Rating } from "@mui/material";
import { Button, Dialog, Select, TextArea } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CurrentUserContext } from "../context/currentUserContextProvider";
import { useFetchEstablishments } from "../hooks/useFetchEstablishments";
import { queryClient } from "../lib/react-query"
import * as zod from 'zod'
import { api } from '../lib/axios';


const rantingSchema = zod.object({
    id_establishment: zod.string(),
    id_user: zod.string(),
    stars: zod.number(),
    review: zod.string().min(1)
})

export interface RatingDialogProps {
    children: React.ReactNode
}

export function RatingDialog({children}: RatingDialogProps){
    const {data: user} = useContext(CurrentUserContext)
    const {register, handleSubmit, watch, reset} = useForm()
    const {data, isLoading}  = useFetchEstablishments()
    const [ratingValue, setRatingValue] = useState<number | null>(0);
    const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false)
    const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)   
    const [isErrorInForm, setIsErrorInForm] = useState(false)

    const isFormFilled = rantingSchema.safeParse(watch()).success;

    useEffect(() => {
        if (isFormFilled) {
            setIsErrorInForm(false);
        }
    }, [isFormFilled]);

    if(isLoading) return <div>Carregando estabelecimentos...</div>




    function handleRatingChange(_:unknown, newValue: number | null){
        setRatingValue(newValue)
        register('stars', {value: newValue})   
    }

    function handleSelectChange(value: string){
        register('id_establishment', {value})
    }

    async function postData(){
        try{
            register('id_user', {value: user!.id})
            const formData = watch()
            if(!rantingSchema.safeParse(formData).success){
                setIsErrorInForm(true)
                return
            }

            await api.post('ratings', formData)
            setIsRatingDialogOpen(false)
            reset()
            queryClient.invalidateQueries({queryKey: ['ratings']})
            setIsSuccessDialogOpen(true)
            setRatingValue(0)
        }catch(err){
            console.error(err)
        }
    }

    if(isSuccessDialogOpen){
        return (
            <Dialog.Root
                open={isSuccessDialogOpen}
                onOpenChange={() => setIsSuccessDialogOpen(!isSuccessDialogOpen)}
            >
                <Dialog.Content>
                    <div className="flex flex-col items-center">
                        <Dialog.Title className='text-green-600'>
                            <div className='flex flex-col items-center'>
                                <p className='font-bold'>UHUUUUL!</p> 
                                <p className='text-sm'>Sua mensagem foi propagada com sucesso.</p>
                            </div>
                        </Dialog.Title>
                        <img src={Speech} alt="speech" width="300px"/>
                    </div>
                </Dialog.Content>
            </Dialog.Root>
        )
    }

    return (
        <Dialog.Root
            open={isRatingDialogOpen}
            onOpenChange={() => setIsRatingDialogOpen(!isRatingDialogOpen)}
        >
            <Dialog.Trigger>
                {children}
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title className='text-center'>Vamos lá, nos conte conte foi sua experiência!</Dialog.Title>
                <div className="flex flex-col gap-5 w-full items-center">

                    {   
                        isErrorInForm && <Alert severity="error">Preencha todos os campos</Alert>
                    }
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