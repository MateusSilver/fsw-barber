"use client";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale/pt-BR";
import { Currency } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";
import { format } from "date-fns";

interface ServiceItemProps {
    barbershop: Barbershop;
    serviceItem: Service;
    isAuthenticated?: boolean;
}

const ServiceItem = ({serviceItem, barbershop, isAuthenticated}: ServiceItemProps) => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [hour, setHour] = useState<string | undefined>();

    const timeList = useMemo(() => {
        return date ? generateDayTimeList(date) : [];
    }, [date]);

    const handleHourClick = (time: string) => {
        setHour(time);
    }

    const handleDateClick = (date: Date | undefined) => {
        setDate(date);
        setHour(undefined);
    }

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
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button onClick={handleBookingClick} variant="secondary" className="hover:bg-primary">Reservar</Button>
                                </SheetTrigger>

                                <SheetContent className="p-0">
                                    <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                                        <SheetTitle>
                                            Reserva
                                        </SheetTitle>
                                    </SheetHeader>

                                    <Calendar mode="single" selected={date} onSelect={handleDateClick} className="py-6" locale={ptBR}
                                        fromDate={new Date()}
                                        styles={{
                                            head_cell: {
                                                width: "100%",
                                            },
                                            cell: {
                                                width: "100%",
                                            },
                                            button: {
                                                width: "100%",
                                            },
                                            nav_button_previous: {
                                                width: "32px",
                                                height: "32px",
                                            },
                                            nav_button_next: {
                                                width: "32px",
                                                height: "32px",
                                            },
                                            caption: {
                                                textTransform: "capitalize",
                                            }
                                        }}
                                    />
                                    {date && (
                                        <div className="flex overflow-x-auto py-6 px-5 gap-3 border-y border-solid border-secondary">
                                            {timeList.map((time) => (
                                                <Button onClick={() => handleHourClick(time)} variant={
                                                    time === hour ? 'default' : 'outline'
                                                } className="rounded-lg" key={time}>
                                                    {time}
                                                </Button>
                                            ))}
                                        </div>
                                    )}
                                    <div className="py-6 px-5 border-t border-solid border-secondary">
                                        <Card>
                                            <CardContent className="p-3 flex flex-col gap-1">
                                                <div className="flex justify-between">
                                                    <h2 className="font-bold">{serviceItem.name}</h2>
                                                    <h3 className="font-bold text-sm">{Intl.NumberFormat(
                                                        'pt-BR',
                                                        { style: 'currency', currency: 'BRL'}
                                                    ).format(Number(serviceItem.price))}</h3>
                                                </div>
                                                {date && (
                                                    <div className="flex justify-between">
                                                        <h3 className="text-gray-400 text-sm">Data</h3> 
                                                        <h3 className="text-sm">{format(date,"d 'de' MMMM", {locale: ptBR})}</h3>
                                                    </div>
                                                )}
                                                {hour && (
                                                    <div className="flex justify-between">
                                                        <h3 className="text-gray-400 text-sm">Horário</h3> 
                                                        <h3 className="text-sm">{hour}</h3>
                                                    </div>
                                                )}
                                                <div className="flex justify-between">
                                                        <h3 className="text-gray-400 text-sm">Barbearia</h3> 
                                                        <h3 className="text-sm">{barbershop.name}</h3>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <SheetFooter className="px-5">
                                        <Button className="bg-primary w-full">
                                            Confirmar Reserva
                                        </Button>
                                    </SheetFooter>

                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
 
export default ServiceItem;