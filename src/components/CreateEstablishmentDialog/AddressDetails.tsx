import { Alert, Button, Card, TextField } from "@mui/material";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useRef, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import * as zod from 'zod';

interface AddressDetailsProps {
    address: string;
    neighborhood: string;
    city: string;
    state: string;
    onBackClick: () => void;
    onNextStepClick: () => void;
    useForm: UseFormReturn<FieldValues, undefined>
}

export function AddressDetails(props: AddressDetailsProps){
    const {onBackClick, useForm, onNextStepClick} = props
    const {register} = useForm
    
    const [isError, setIsError] = useState(false)
    const numberInputRef = useRef<HTMLInputElement>()
    const complementInputRef = useRef<HTMLInputElement>()

    

    function handleNextStepClick(){
        try{
            zod.string().parse(numberInputRef.current?.value)
            register('number', {value: numberInputRef.current?.value})
            register('complement', {value: complementInputRef.current?.value})
            onNextStepClick()
        }catch(error){
            setIsError(true)
        }
    }

    return (
        <Card
            className="flex flex-col gap-4"
            style={{
                boxShadow: 'none', 
                width: '100%', 
                border: '1px solid #e0e0e0',
                padding: '16px'
            }}
        >
            <TextField 
                disabled
                size="small"
                label="Bairro - Cidade - Estado"
                value={props.neighborhood + ' - ' + props.city + ' - ' + props.state}
                variant="filled"
                style={{width: '100%'}}
            />
            <TextField 
                disabled
                size="small"
                label="Endereço"
                value={props.address}
                variant="filled"
                style={{width: '100%'}}
            />

            <div className="flex gap-1">
                <TextField
                    inputRef={numberInputRef} 
                    id="city"
                    size="small"
                    label="Nº"
                    variant="outlined"
                    style={{width: '100px'}}
                />

                <TextField 
                    inputRef={complementInputRef}
                    id="complement"
                    size="small"
                    label="Complemento"
                    variant="outlined"
                    style={{width: '100%'}}
                />
            </div>

            {isError && <Alert severity="error"> <span className='text-red-500 font-bold'>CEP inválido</span>. Você deve inserir <span className='font-bold text-red-500'>8</span> números e não inserir pontuação</Alert>}

            <div className="flex gap-1">

                <Button
                    onClick={onBackClick}
                    startIcon={<ArrowLeftCircle />}
                    color="primary"
                    style={{width: '100%'}}
                >
                    Voltar
                </Button>
                <Button
                    onClick={handleNextStepClick}
                    variant="contained"
                    endIcon={<ArrowRightCircle />}
                    color="success"
                    style={{width: '100%'}}
                >
                    Continuar
                </Button>
            </div>

        </Card>
    )
}