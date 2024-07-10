import { Dialog, DialogContent, DialogTitle, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AddressDetails } from "./AddressDetails";
import { AddressForm } from "./CepSearch";
import { Cover } from "./Cover";
import ControlPanel from "../../assets/control-panel.svg";
import { LastStep } from "./LastStep";
import { SuccessCreateEstablishmentDialog } from "./DialogSuccesCreateEstablishment";
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newEstablishmentSchema = zod.object({
    cep: zod.string(),
    address: zod.string(),
    city: zod.string(),
    neighborhood: zod.string(),
    state: zod.string()
})

interface CreateEstablishmentDialogProps {
    open: boolean
    onClose: () => void
}

export function CreateEstablishmentDialog(props: CreateEstablishmentDialogProps){
    const {open, onClose} = props
    const [step, setStep] = useState(2)
    
    const {register, handleSubmit, watch} = useForm({
        resolver: zodResolver(newEstablishmentSchema)
    })

    const formData = watch()
    
    function handleClose(){
        onClose()
    }

    function handleNextStepClick(){
        setStep(step + 1)
    }

    function handlePreviousStepClick(){
        setStep(step - 1)
    }


    let currentContent: React.ReactNode = null

    switch(step){
        case 0:
            currentContent = <Cover onNextStepClick={handleNextStepClick} />
            break
        case 1:
            currentContent = <AddressForm onNextStepClick={handleNextStepClick} register={register}/>
            break
        case 2:
            currentContent = <AddressDetails address={formData.address} city={formData.city} neighborhood={formData.neighborhood} state={formData.state} onBackClick={handlePreviousStepClick} register={register} onNextStepClick={handleNextStepClick}/>
            break
        case 3:
            currentContent = <LastStep onNextStepClick={handleNextStepClick} onBackClick={handlePreviousStepClick}/>
            break
    }

    
    if(step === 4){
        return (
            <Dialog 
                open={open}
                onClose={handleClose}  
            >
                <DialogContent>
                    <SuccessCreateEstablishmentDialog />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle
                className="text-zinc-600 flex flex-col items-center"
            >
                <img src={ControlPanel} width="150px" />
                Vamos adicionar um novo registro ao nosso radar 
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
            </DialogContent>
        </Dialog>
    )
}