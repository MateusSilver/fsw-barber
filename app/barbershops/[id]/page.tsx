import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershopInfo";
import ServiceItem from "./_components/serviceItem";

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
        include: {
            Services: true,
        }
    })
    if(!barbershop){
        return null;
    }
    
    return (
        <div>
            <BarbershopInfo barbershopInfo={barbershop}/>
            <div className="my-4 px-3 max-w-[500px] mx-auto flex flex-col gap-4">
            {barbershop.Services.map((service) => (
                <ServiceItem key={service.id} serviceItem={service}/>
            ))}
            </div>
        </div>
    );
}
 
export default BarbershopDetailsPage;