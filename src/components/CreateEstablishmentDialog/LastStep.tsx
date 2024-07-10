import axios from "axios";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Alert } from "@mui/material";
import { useFetchEstablishmentTypes } from "../../hooks/useFetchEstablishmentTypes";
import { useEffect, useRef, useState } from "react";
import { ArrowLeftCircle, SatelliteDish } from "lucide-react";
import * as zod from 'zod'
import { UseFormReturn, FieldValues } from "react-hook-form";


export interface LastStepProps {
    useForm: UseFormReturn<FieldValues, undefined>
    onBackClick: () => void
    onConfirmClick: () => void
}

export function LastStep(props: LastStepProps){
    const {onBackClick, onConfirmClick, useForm} = props
    const {register} = useForm

    const {isLoading, data} = useFetchEstablishmentTypes()
    
    const [selectedType, setSelectedType] = useState<string>('')
    const [isError, setIsError] = useState(false)

    const descriptionRef = useRef<HTMLInputElement>()
    const nameRef = useRef<HTMLInputElement>()
    
    useEffect(() => {
        if(selectedType && descriptionRef.current?.value && nameRef.current?.value){
            setIsError(false)
        }
    }, [isError, selectedType])
    
    if(isLoading) return <div>Carregando...</div>

    function translateType(type: string){
        let result = ''
        switch(type){
            case 'restaurant':
                result = 'Restaurante'
                break
            case 'bar':
                result = 'Bar'
                break
            case 'cinema':
                result = 'Cinema'
                break
            case 'private park':
                result = 'Parque Privado'
                break
            case 'public park':
                result = 'Parque Público'
                break
            case 'museum':
                result = 'Museu'
                break
            case 'theater':
                result = 'Teatro'
                break
            case 'zoo':
                result = 'Zoológico'
                break
            case 'Snack bar':
                result = 'Lanchonete'
                break
            case 'club':
                result = 'Clube'
                break
         }
            return result
    }

    function handleChange(event: SelectChangeEvent){
        setSelectedType(event.target.value)
    }

    async function postData(){
        try{
            const formData = useForm.watch()
            const response = await axios.post('http://localhost:3000/establishments', formData)
            console.log(response.data)
        }
        catch(error){
            console.log(error)
        }
    }

    async function handleSubmit () {
        try{
            zod.string().min(1).parse(selectedType)
            zod.string().min(1).parse(descriptionRef.current?.value)
            zod.string().min(1).parse(nameRef.current?.value)
            console.log(selectedType, descriptionRef.current?.value, nameRef.current?.value)
            register('name', {value: nameRef.current?.value})
            register('establishment_type_id', {value: selectedType})
            register('description', {value: descriptionRef.current?.value})

            await postData()
            onConfirmClick()
        }catch(error){
            setIsError(true)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-zinc-500 text-center max-w-96 mb-5"><span className="text-blue-600 font-bold">Estamos quase lá!</span> Essas são as últimas informações para <span className="underline font font-semibold text-blue-600">propagar sua descoberta</span>.</p>

            {
                isError && <Alert severity="error">Todos os campos devem ser preenchidos</Alert>
            }

            <FormControl
                variant="outlined"
                style={{
                    width: '100%',
                    marginTop: '16px'

                }}
            >
                <InputLabel id="establishment-type">Tipo</InputLabel>
                <Select
                    value={selectedType}
                    variant="outlined"
                    label="Tipo"
                    onChange={handleChange}
                >
                    {
                        data!.map((type) => (
                            <MenuItem key={type.id} value={type.id}>{translateType(type.name)}</MenuItem>
                        ))
                    }
                </Select>

                <TextField 
                    inputRef={nameRef}
                    placeholder="Por qual nome o local é conhecido?"
                    label="Nome"
                    variant="outlined"
                    style={{
                        width: '100%',
                        marginTop: '16px'
                    }}
                />

                <TextField 
                    inputRef={descriptionRef}
                    placeholder="Por que esse lugar merece uma visita?"
                    label="Descrição"
                    variant="outlined"
                    style={{
                        width: '100%',
                        marginTop: '16px'
                    }}
                />
            </FormControl>

            <div className="flex gap-1 mt-6">
                <Button
                    onClick={onBackClick}
                    startIcon={<ArrowLeftCircle />}
                    color="primary"
                    style={{width: '100%'}}
                >
                    Voltar
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    endIcon={<SatelliteDish />}
                    color="success"
                    style={{width: '100%'}}
                >
                    Propagar
                </Button>
            </div>

            
        </div>
    )
}