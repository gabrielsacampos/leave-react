import { Badge, Box, Card, Dialog, Inset, Strong, Text } from "@radix-ui/themes";
import { Establishment } from "../hooks/useFetchEstablishments";
import { Avatar } from "@mui/material";

export interface EstablishmentDetailsDialogProps {
    children: React.ReactNode
    establishmentData: Establishment
}

export function EstablishmentDetailsDialog({children, establishmentData}: EstablishmentDetailsDialogProps){
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                {children}
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>
                    <div className="flex justify-between">
                        <Strong>{establishmentData.name}</Strong> 
                        <div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1 text-zinc-500 text-sm">
                                    <Avatar
                                        src={establishmentData.sponsor_image}
                                    />
                                    <div className="flex flex-col gap-1">
                                        <span>{establishmentData.sponsor_name}</span>
                                        <Badge color="gray" className="text-xs w-24">Contribuidor</Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Dialog.Title>
                <Box maxWidth="100%">
                    <Card size="2">
                        <Inset clip="padding-box" side="top" pb="current">
                        <img
                            src={establishmentData.image_url} alt={establishmentData.name}
                            style={{
                            display: 'block',
                            objectFit: 'cover',
                            width: '100%',
                            height: 500,
                            backgroundColor: 'var(--gray-5)',
                            }}
                        />
                        </Inset>
                        <Text as="p" size="3">
                            <div className="flex flex-col">
                                {establishmentData.description}
                            </div>
                        </Text>
                    </Card>
                </Box>
            </Dialog.Content>
        </Dialog.Root>
    )
}