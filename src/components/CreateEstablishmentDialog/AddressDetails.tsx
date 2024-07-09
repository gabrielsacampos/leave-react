import { LocationOn } from "@mui/icons-material";
import { Card } from "@mui/material";

interface AddressDetailsProps {
    address: string;
    neighborhood: string;
    city: string;
    state: string;
}

export function AddressDetails(props: AddressDetailsProps){
    return (
        <Card
            style={{
                boxShadow: 'none', 
                width: '100%', 
                border: '1px solid #e0e0e0',
                padding: '16px'
            }}
        >
            <p className='text-xs text-zinc-500'>
                <LocationOn 
                    color="primary"
                />
                {props?.logradouro}, {props?.bairro}, {props?.localidade} - {props?.uf}
            </p>

        </Card>
    )
}