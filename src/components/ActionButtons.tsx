import { FloatButton } from "antd";
import { Shrub } from "lucide-react";
import { useState } from "react";
import { RatingDialog } from "./RatingDialog";
import { CreateEstablishmentDialog } from "./CreateEstablishmentDialog";

export function ActionButtons(){
    const [isOpened, setIsOpened] = useState(false)
    return (
        <FloatButton.Group 
            type="primary"
            open={isOpened}
            trigger="hover"
            style={{position: 'fixed', bottom: 20, right: 20}}
            icon={<i className="pi pi-plus" style={{ fontSize: '1rem', color: 'white' }} />}
            onClick={() => setIsOpened(!isOpened)}
        >
            
        <FloatButton 
            type="primary" icon={<Shrub size={20}/>}
        />
        
        <CreateEstablishmentDialog />
            
            
        <RatingDialog>
            <FloatButton 
                type="primary" 
                icon={<i className="pi pi-bolt" />} 
            />  
        </RatingDialog>
        </FloatButton.Group>
    )
}