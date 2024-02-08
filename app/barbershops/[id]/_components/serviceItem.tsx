"use client";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Service } from "@prisma/client";
import { Currency } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface ServiceItemProps {
    serviceItem: Service;
    isAuthenticated?: boolean;
}

const ServiceItem = ({serviceItem, isAuthenticated}: ServiceItemProps) => {
    const handleBookingClick = () => {
        if(!isAuthenticated){
            signIn("google");
        }

    }
    return (
        <Card className="max-w-[500px] max-h-[150px]">
            <CardContent className="p-3">
                <div className="flex gap-4 items-center">
                    <div className="relative min-h-[110px] max-h-[110px] min-w-[110px] max-w-[110px]">
                        <Image 
                            src={serviceItem.imageURL} 
                            alt={serviceItem.name}
                            style={{
                                objectFit: "contain",
                            }}
                            className="opacity-75 rounded-lg"
                            fill

                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <h2 className="font-bold">{serviceItem.name}</h2>
                        <p className="text-sm text-gray-400">{serviceItem.description}</p>
                    
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-primary text-sm font-bold">
                                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}
                                ).format(Number(serviceItem.price))}
                            </p>
                            <Button onClick={handleBookingClick} variant="secondary" className="hover:bg-primary">Reservar</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
 
export default ServiceItem;