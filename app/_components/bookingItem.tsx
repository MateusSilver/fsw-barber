"use client";
import { Prisma } from "@prisma/client";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { cancelBooking } from "../_actions/cancelBooking";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

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
    const [isDeleting, setIsDeleting] = useState(false);
    const cancelBookingClick = async () => {
        setIsDeleting(true);
        try {
            await cancelBooking(booking.id);
            toast.success("reserva cancelada com sucesso!");
        } catch (error) {
            console.error(error);
        } finally {
            
            setIsDeleting(false);
        }
    }

    return (
        <Sheet>
            <SheetTrigger>
            <Card className="min-w-[400px]">
                <CardContent className="py-0 px-0 flex">
                    <div className="flex flex-[3] flex-col gap-2 pl-5 py-5">
                        <Badge className="w-fit" variant={isExpired ? "secondary":"default"}>{
                            isExpired ? "Finalizado" : "Confirmado"
                        }</Badge>
                        <div className="flex">
                            <h2 className="font-bold justify-start">{booking.service.name}</h2>
                        </div>
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
                        <p className="text-sm">{format(booking.date, "hh:mm")}</p>
                    </div>

                </CardContent>
            </Card>
            </SheetTrigger>
            <SheetContent className="px-0">
                <SheetHeader className="text-left px-5 pb-6 border-b border-solid border-secondary">
                    <SheetTitle>
                        Informações de Reserva
                    </SheetTitle>
                </SheetHeader>
                <div className="px-5">
                    <div className="relative h-[180px] w-full mt-6">
                        <Image
                        src="/map.png"
                        fill
                        alt={booking.barbershop.name}
                        
                        />
                        <div className="w-full absolute bottom-4 left-0 px-5">
                            <Card className="mx-5">
                                <CardContent className="flex gap-2 p-3">
                                    <Avatar>
                                        <AvatarImage
                                        src={booking.barbershop.imageURL}
                                        />
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <h2 className="font-bold">{booking.barbershop.name}</h2>
                                        <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">{booking.barbershop.address}</h3>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <Badge className="w-fit my-3" variant={isExpired ? "secondary":"default"}>{
                        isExpired ? "Finalizado" : "Confirmado"
                    }</Badge>
                    <Card>
                        <CardContent className="p-3 flex flex-col gap-1">
                            <div className="flex justify-between">
                                <h2 className="font-bold">{booking.service.name}</h2>
                                <h3 className="font-bold text-sm">{Intl.NumberFormat(
                                    'pt-BR',
                                    { style: 'currency', currency: 'BRL'}
                                    ).format(Number(booking.service.price))}
                                </h3>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-gray-400 text-sm">Data</h3> 
                                <h3 className="text-sm">{format(booking.date,"d 'de' MMMM", {locale: ptBR})}</h3>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-gray-400 text-sm">Horário</h3> 
                                <h3 className="text-sm">{format(booking.date, "HH:mm")}</h3>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-gray-400 text-sm">Barbearia</h3> 
                                <h3 className="text-sm">{booking.barbershop.name}</h3>
                            </div>
                        </CardContent>
                    </Card>
                    <SheetFooter className="flex-row gap-2 mt-6">
                        <SheetClose>
                            <Button className="w-full" variant={"secondary"}>
                                Voltar
                            </Button>
                        </SheetClose>
                        <Button
                            onClick={cancelBookingClick} 
                            disabled={isExpired || isDeleting} 
                            className="w-full" 
                            variant={"destructive"}
                            >
                                {isDeleting && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Cancelar Reserva
                            </Button>
                    </SheetFooter>
                </div>

            </SheetContent>
        </Sheet>
    )
}
 
export default BookingItem;