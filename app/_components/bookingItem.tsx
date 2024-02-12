import { Booking, Prisma } from "@prisma/client";
import { AvatarImage } from "./ui/avatar";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true;
            barbershop: true;
        };
    }>;
}

const BookingItem = ({booking}: BookingItemProps) => {
    const isExpired = isPast(booking.date);
    return (
        <Card>
            <CardContent className="py-0 px-0 flex">
                <div className="flex flex-[3] flex-col gap-2 pl-5 py-5">
                    <Badge className="w-fit" variant={isExpired ? "secondary":"default"}>{
                        isExpired ? "Finalizado" : "Confirmado"
                    }</Badge>
                    <h2 className="font-bold">{booking.service.name}</h2>
                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={booking.barbershop.imageURL} />
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>

                        <h3 className="text-sm">{booking.barbershop.name}</h3>
                    </div>
                </div>

                <div className="flex flex-1 flex-col items-center justify-center px-3 border-l border-solid border-secondary">
                    <p className="text-sm capitalize">{format(booking.date, "MMMM", {locale: ptBR})}</p>
                    <p className="text-2xl">{format(booking.date, "dd")}</p>
                    <p className="text-sm">{format(booking.date, "hh':'mm")}</p>
                </div>

            </CardContent>
        </Card>
    );
}
 
export default BookingItem;