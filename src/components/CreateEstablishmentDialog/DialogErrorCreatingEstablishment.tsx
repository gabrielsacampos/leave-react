import { Alert } from '@mui/material';
import Saboteur from '../../assets/saboteur.png';

export function DialogErrorCreatingEstablishmentDialog(){
    return (
        <div className='flex flex-col items-center justify-center'>
            <img className='rounded' src={Saboteur} width="200px" />
            <Alert severity='error'> <span className='text-red-500 font-semibold'>Sabotaram nossa conexão!</span> Estamos trabalhando para resolver.</Alert>
        </div>
    )
}