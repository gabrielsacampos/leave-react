import { Dialog, DialogContent, DialogTitle, Step, StepLabel, Stepper } from "@mui/material";
import { useFetchEstablishmentTypes } from "../../hooks/useFetchEstablishmentTypes";
import { useForm } from "react-hook-form";
import Map from "../../assets/map.svg";
import { useEffect, useState } from "react";
import { Cover } from "./Cover";
import { AddressForm } from "./CepSearch";
import { AddressDetails } from "./AddressDetails";

export function CreateEstablishmentDialog(){
    const [step, setStep] = useState(0)
    const {register, handleSubmit, watch} = useForm()
    

    const {data, isLoading} = useFetchEstablishmentTypes() 
    
//      // Use watch to monitor all field values
//     const watchedFields = watch();

//   // Log watchedFields to the console
//     useEffect(() => {
//         console.log('Watched Fields:', watchedFields);
//     }, [watchedFields]);

    if(isLoading){
        return <div>Carregando...</div>
    }

    function handleCoverNextStepClick(stepIndex: number){
        setStep(stepIndex)
    }


    let currentContent: React.ReactNode = null

    switch(step){
        case 0:
            currentContent = <Cover onNextStepClick={() => handleCoverNextStepClick(1)} />
            break
        case 1:
            currentContent = <AddressForm onNextStepClick={() => handleCoverNextStepClick(2)} register={register}/>
            break
        case 2:
            currentContent = <p>step3</p>
            break
        default:
            currentContent = <p>default</p>
            break
    }

    return (
        <Dialog
            open={true}
        >
            <DialogTitle
                className="text-zinc-600 flex flex-col items-center"
            >
                <img src={Map} width="200px"/>
                Vamos adicionar um novo lugar ao nosso radar 
            </DialogTitle>
            <DialogContent>


            <div className={`${step === 0? 'hidden': ''}`}>
                <Stepper 
                    activeStep={step-1} 
                    alternativeLabel
                    style={{padding: '16px', marginBottom: '16px'}} 
                >
                    <Step>
                        <StepLabel>Coleta de dados</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Refinamento</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Registro</StepLabel>
                    </Step>
                </Stepper>
            </div>
                
                {currentContent}

                
                {/* <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                <Select
                    style={{width: '100%'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectValue}
                    label="Tipo"
                    onChange={handleSelectChange}
                    >
                    {
                        data!.map((item) => {
                            return (
                                <MenuItem value={item.id}>{item.name}</MenuItem>
                            )
                        })
                    }
                </Select>

                <AddressForm /> */}
            
            </DialogContent>
            
        </Dialog>
    )
}