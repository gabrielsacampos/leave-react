import { Button, Card, TextField } from "@mui/material";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useRef } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface AddressDetailsProps {
    address: string;
    neighborhood: string;
    city: string;
    state: string;
    onBackClick: () => void;
    onNextStepClick: () => void;
    register: UseFormRegister<FieldValues>
}

export function AddressDetails(props: AddressDetailsProps){
    const {onBackClick, register, onNextStepClick} = props
    const numberInputRef = useRef<HTMLInputElement>()
    const complementInputRef = useRef<HTMLInputElement>()

    function handleConfirmClick(){
        register('number', {value: numberInputRef.current?.value})
        register('complement', {value: complementInputRef.current?.value})
        onNextStepClick()
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
                    onClick={handleConfirmClick}
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