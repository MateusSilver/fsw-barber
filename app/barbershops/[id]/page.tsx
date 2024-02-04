import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";

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
        <div>
            <div className="h-[250px] w-full relative">
                <Button size="icon" variant="outline" className="z-50 absolute top-4 left-4">
                    <ChevronLeftIcon size={18} />
                </Button>
                <Button size="icon" variant="outline" className="z-50 absolute top-4 right-4">
                    <MenuIcon size={18} />
                </Button>

                <Image
                    src={barbershop.imageURL}
                    alt={barbershop.name}
                    className="opacity-75"
                    fill
                    style={{
                        objectFit: "cover",
                    }}
                />
            </div>
            <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
                <h1 className="text-xl font-bold">{barbershop.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                    <MapPinIcon className="text-primary" size={18}/>
                    <p className="text-sm">{barbershop.address}</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <StarIcon className="fill-primary text-primary" size={18}/>
                    <p className="text-sm">5,0 avaliações</p>
                </div>
            </div>
        </div>
    );
}
 
export default BarbershopDetailsPage;