import { Button } from '@mui/material';

export interface CoverProps {
    onNextStepClick: () => void
}

export function Cover({onNextStepClick}: CoverProps){
    return (
        <>
        <p className="flex justify-center"> Primeiro, vamos precisar do das coordenadas (CEP) do local</p>
            <Button
                onClick={onNextStepClick}
                variant="contained"
                color="success"
                style={{width: '100%', boxShadow: 'none', marginTop: '16px'}}
            >
                Já sei qual é, vamos prosseguir
            </Button>
            <Button
                href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank"
                style={{width: '100%', boxShadow: 'none', marginTop: '16px'}}
            >
                Preciso de ajuda
            </Button>
        </>
    )
}