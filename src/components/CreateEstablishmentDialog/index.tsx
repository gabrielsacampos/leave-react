import axios from "axios";
import { Dialog, DialogContent, DialogTitle, Step, StepLabel, Stepper } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AddressDetails } from "./AddressDetails";
import { AddressForm } from "./CepSearch";
import { Cover } from "./Cover";
import ControlPanel from "../../assets/control-panel.svg";
import { LastStep } from "./LastStep";
import { SuccessCreateEstablishmentDialog } from "./DialogSuccesCreateEstablishment";
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { CurrentUserContext } from "../../context/currentUserContextProvider";

const newEstablishmentSchema = zod.object({
    name: zod.string(),
    id_sponsor: zod.string(),
    establishmen_type_id: zod.string(),
    description: zod.string(),
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
    const {data: user} = useContext(CurrentUserContext)
    const {open, onClose} = props
    const [step, setStep] = useState(0)
    
    const form = useForm({
        resolver: zodResolver(newEstablishmentSchema)
    })
    
    form.register('id_sponsor', {value: user.id})

    const formData = form.watch()
    console.log(formData)
    
    function handleClose(){
        setStep(0)
        form.reset()
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
            currentContent = <AddressForm onNextStepClick={handleNextStepClick} useForm={form}/>
            break
        case 2:
            currentContent = <AddressDetails address={formData.address} city={formData.city} neighborhood={formData.neighborhood} state={formData.state} onBackClick={handlePreviousStepClick} useForm={form} onNextStepClick={handleNextStepClick}/>
            break
        case 3:
            currentContent = <LastStep  onBackClick={handlePreviousStepClick} onConfirmClick={handleNextStepClick} useForm={form}/>
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