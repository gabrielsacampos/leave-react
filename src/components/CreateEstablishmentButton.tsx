import { Button } from "@mui/material";
import { Shrub } from "lucide-react";
import { CreateEstablishmentDialog } from "./CreateEstablishmentDialog";
import { useState } from "react";

export function CreateEstablishmentButton(){
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    
    const handleClickOpen = () => {
        setIsDialogOpen(true);
      };
    
      const handleClose = () => {
        setIsDialogOpen(false);
      };

    return (
            
        <div>
            <Button
                onClick={handleClickOpen}
                style={{
                    boxShadow: 'none',
                }}
                variant="contained"
                endIcon={<Shrub size={24} />}
            >
                Registrar
            </Button>
                
    
            <CreateEstablishmentDialog open={isDialogOpen} onClose={handleClose}/>
        </div>
            

    )
}