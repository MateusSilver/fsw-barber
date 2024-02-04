import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from '@prisma/client';
import { StarIcon } from "lucide-react";
import Image from "next/image";

interface BarbershopItemProps {
    barbershop: Barbershop
}

const BarbershopItem = ({barbershop}: BarbershopItemProps) => {
    return (
        <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
            <CardContent className="p-1">
                <div className="w-full h-[159px] relative">
                    <div className="absolute top-2 left-2 z-50">
                        <Badge variant="secondary" className="flex items-center gap-2 opacity-90">
                            <StarIcon className="text-primary fill-primary cursor-pointer" size={12}/>
                            <span className="text-xs">5,0</span>
                        </Badge>
                    </div>
                    <Image
                        src={barbershop.imageURL}
                        alt={barbershop.name}
                        style={{
                            objectFit: "cover",
                        }}
                        fill
                        className="rounded-2xl"
                    />
                </div>
                <div className="p-3">
                    <h2 className="font-bold overflow-hidden text-ellipsis text-nowrap mt-2">{barbershop.name}</h2>
                    <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap" >{barbershop.address}</p>
                    <Button className="w-full mt-3 hover:bg-primary" variant="secondary">Reservar</Button>
                </div>
            </CardContent>
        </Card>
    );
}
 
export default BarbershopItem;