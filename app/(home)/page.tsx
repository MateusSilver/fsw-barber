import { ptBR } from "date-fns/locale";
import Header from "../_components/header";
import { format } from "date-fns";
import Search from "./_components/search";
import BookingItem from "../_components/bookingItem";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershopItem";
import Welcome from "./_components/welcome";

export default async function Home() {
    const barbershops = await db.barbershop.findMany({});
    return (
        <div>
            <Header />
            <div className="max-w-[800px] mx-auto">
                <Welcome />
                
                
                <div className="px-5 mt-6">
                    <Search />
                </div>
                <div className="px-5 mt-6">
                    <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>
                    <BookingItem />
                </div>

                <div className="mt-6 mb-[4.5rem]">
                <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Recomendadas</h2>
                <div className="flex gap-4 overflow-x-auto py-2">
                    {barbershops.map((barbershop) => (
                        <BarbershopItem key={barbershop.id} barbershop={barbershop}/>
                    ))}
                </div>
                </div>
            </div>
            
        </div>
    );
}