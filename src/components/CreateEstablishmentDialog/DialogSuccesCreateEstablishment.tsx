import CatAstronaut from '../../assets/cat-astronaut.svg';

export function SuccessCreateEstablishmentDialog(){
    return (
        <div className='flex flex-col items-center justify-center'>
            <img className='rounded' src={CatAstronaut} width="200px" />
            <p className='text-zinc-500'>Sua descoberta foi <span className='underline font-semibold text-green-800'>registrada com sucesso</span></p>
        </div>
    )
}