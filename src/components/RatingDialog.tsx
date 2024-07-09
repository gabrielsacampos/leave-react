import { Button, Dialog, DropdownMenu, TextArea } from "@radix-ui/themes";
import Bolt from '@mui/icons-material/Bolt';
import { Rating } from "@mui/material";
import { useFetchEstablishments } from "../hooks/useFetchEstablishments";
import { useState } from "react";



export interface RatingDialogProps {
    children: React.ReactNode
}

export function RatingDialog({children}: RatingDialogProps){
    const {data, isLoading, error}  = useFetchEstablishments()
    const [ratingValue, setRatingValue] = useState<number | null>(0);

    if(error) return <div>Erro: {error.message}</div>
    if(isLoading) return <div>Carregando estabelecimentos...</div>

    function handleRatingChange(_:unknown, newValue: number | null){
        setRatingValue(newValue)
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                {children}
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>Vamos lá, nos conte conte foi sua experiência!</Dialog.Title>
                <div className="flex flex-col gap-5 w-full items-center">
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                        <Button 
                            variant="soft"
                            style={{width: '100%'}}    
                        >
                            Selecione um estabelecimento que você visitou
                            <DropdownMenu.TriggerIcon />
                        </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content align="center">
                            {
                                data!.map((item) => {
                                    return (
                                        <DropdownMenu.Item key={item.id}>{item.name}</DropdownMenu.Item>
                                    )
                                })
                            }

                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                    <TextArea placeholder="e ai, como que foi ?" 
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