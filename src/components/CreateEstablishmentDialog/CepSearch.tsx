import { Close, LocationOn, Search } from '@mui/icons-material';
import {Loader} from 'antd'
import axios from 'axios';
import { Alert, Button, Card, CircularProgress, IconButton, TextField } from '@mui/material';
import { CircleArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FieldValues, UseFormRegister, set } from 'react-hook-form';
import { AddressFromCep } from '../../hooks/useFetchCep';
import * as zod from 'zod'


export interface AddressFormProps {
    onNextStepClick: () => void
    register: UseFormRegister<FieldValues>
}


export function AddressForm({onNextStepClick, register}: AddressFormProps){
    const [currentCep, setCurrentCep] = useState<string | null >(null)
    const [addressData, setAddressData] = useState<AddressFromCep | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const cepInputRef = useRef<HTMLInputElement>()


    useEffect(() => {
        const fetchCepInfo = async () => {
            try{
                const response = await axios.get(`https://viacep.com.br/ws/${currentCep}/json/`)
                await new Promise(resolve => setTimeout(resolve, 1000))
                setAddressData(response.data)
            }catch(error){
                setIsError(true)
                console.error(error)
            }finally{
                setIsLoading(false)
            }
        }

        if(currentCep){
            fetchCepInfo()
        }

        if(!currentCep){
            setAddressData(null)
        }
        
    }, [currentCep, isLoading, isError])
    

    function handleConfirmClick(){
        onNextStepClick()
        register('cep', {value: addressData?.cep})
        register('address', {value: addressData?.logradouro})
        register('neighborhood', {value: addressData?.bairro})
        register('city', {value: addressData?.localidade})
        register('state', {value: addressData?.uf})
    }

    
    function handleSearchButton(){
        try {
            setIsError(false)
            zod.string().min(8).max(8).parse(cepInputRef.current!.value)
            setIsLoading(true)
            setCurrentCep(cepInputRef.current!.value)
        } catch (error) {
            setIsError(true)
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex flex-col gap-5">
                    <TextField
                        inputRef={cepInputRef}
                        id="cep"
                        label="CEP"
                        variant="outlined"
                        style={{width: '100%'}}
                        InputProps={{
                            endAdornment: (
                                <IconButton 
                                    onClick={handleSearchButton}
                                    disabled={isLoading || !!addressData }
                                >
                                    {
                                        isLoading? <CircularProgress size="1rem"/> :  <Search />
                                    }
                                </IconButton>
                            )
                        }}
                    />
                    {isError && <Alert severity="error"> <span className='text-red-500 font-bold'>CEP inválido</span>. Você deve inserir <span className='font-bold text-red-500'>8</span> números e evitar pontuação</Alert>}
            </div>
            <div className={`flex flex-col gap-2 ${addressData?.logradouro? '': 'hidden'}`}>
                <Card
                    style={{
                        boxShadow: 'none', 
                        width: '100%', 
                        border: '1px solid #e0e0e0',
                        padding: '16px'
                    }}
                >
                    <div className="flex items-center">
                        <p className='text-xs text-zinc-500'>
                            <LocationOn 
                                color="primary"
                            />
                            {addressData?.logradouro}, {addressData?.bairro}, {addressData?.localidade} - {addressData?.uf}
                        </p>
                        <IconButton
                            style={{marginLeft: 'auto'}}
                            onClick={() => setCurrentCep(null)}
                        >
                            <Close color='error'/>
                        </IconButton>
                    </div>

                </Card>

                <div className='flex justify-center gap-1'>
                    <Button
                        onClick={handleConfirmClick}
                        style={{boxShadow: 'none'}}
                        variant="contained"
                        endIcon={<CircleArrowRight size={15} />}
                        color="success"
                    >
                        Confirmar
                    </Button>
                </div>
            </div>
        </div>
    )
}