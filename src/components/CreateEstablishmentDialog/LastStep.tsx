import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useFetchEstablishmentTypes } from "../../hooks/useFetchEstablishmentTypes";
import { useState } from "react";
import { ArrowLeftCircle, ArrowRightCircle, SatelliteDish } from "lucide-react";


export interface LastStepProps {
    onBackClick: () => void
    onNextStepClick: () => void
}

export function LastStep(props: LastStepProps){
    const {onBackClick, onNextStepClick} = props
    const {isLoading, data, error} = useFetchEstablishmentTypes()
    const [selectedType, setSelectedType] = useState<string>('')

    if(isLoading) return <div>Carregando...</div>

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedType(event.target.value as string);
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-zinc-500 text-center max-w-96"><span className="text-blue-600 font-bold">Estamos quase lá!</span> Essas são as últimas informações para <span className="underline font font-semibold text-blue-600">propagar sua descoberta</span>.</p>


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
                            <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                        ))
                    }
                </Select>

                <TextField 
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
                    onClick={onNextStepClick}
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