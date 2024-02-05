import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import BarbershopInfo from "./_components/barbershopInfo";

interface BarbershopDetailsPageProps {
    params: {
        id?: string;
    }
}

const BarbershopDetailsPage = async ({params} : BarbershopDetailsPageProps) => {
    if(!params) {
        return null;
    }
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
    })
    if(!barbershop){
        return null;
    }
    return (
        <BarbershopInfo barbershopInfo={barbershop}/>
            
    );
}
 
export default BarbershopDetailsPage;