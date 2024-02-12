"use client";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop, Booking, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale/pt-BR";
import { Currency, Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";
import { format, setHours, setMinutes } from "date-fns";
import { saveBooking } from "../_actions/saveBooking";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GetDayBookings } from "../_actions/getDayBookings";

interface ServiceItemProps {
    barbershop: Barbershop;
    serviceItem: Service;
    isAuthenticated?: boolean;
}

const ServiceItem = ({serviceItem, barbershop, isAuthenticated}: ServiceItemProps) => {
    const router = useRouter();
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [hour, setHour] = useState<string | undefined>();
    const [submitIsLoading, setSubmitIsLoading] = useState(false);
    const [sheetIsOpen, setSheetIsOpen] = useState(false);
    const [dayBookings, setDayBookings] = useState<Booking[]>([]);

    const { data } = useSession();

    const timeList = useMemo(() => {
        if(!date) {
            return []
        }
        return generateDayTimeList(date).filter(time => {
            const timeHour = Number(time.split(":")[0]);
            const timeMinutes = Number(time.split(":")[1]);

            const booking = dayBookings.find(booking => {
                const bookingHour = booking.date.getHours();
                const bookingMinutes = booking.date.getMinutes();

                return bookingHour === timeHour && bookingMinutes === timeMinutes;
            });
            if (!booking) {
                return true;
            }
            return false;
        })

    }, [date, dayBookings]);

    const handleHourClick = (time: string) => {
        setHour(time);
    }

    useEffect(()=> {
        if(!date){
            return
        }
        const refreshAvailableHous = async () => {
            const _dayBookings = await GetDayBookings(barbershop.id, date);
            setDayBookings(_dayBookings);
        };

        refreshAvailableHous();
    }, [date, barbershop.id])

    const handleDateClick = (date: Date | undefined) => {
        setDate(date);
        setHour(undefined);
    }

    const handleBookingClick = () => {
        if(!isAuthenticated){
            signIn("google");
        }

    }

    const handleBookingSubmit = async () => {
        setSubmitIsLoading(true);
        try {
            if(!hour || !date || !data?.user){
                return
            }
            const dateHour = Number(hour.split(':')[0]);
            const dateMinutes = Number(hour.split(':')[1]);

            const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

            await saveBooking({
                serviceId: serviceItem.id,
                barbershopId: barbershop.id,
                date: newDate,
                userId: (data.user as any).id,
            });
            toast("Reserva marcada com sucesso", {
                description: format(newDate, "'Para' EEEE',' dd 'de' MMMM 'às' HH':'mm", {locale: ptBR}),
                action: {
                  label: "Ver",
                  onClick: () => router.push("/bookings"),
                },
              })

        } catch (error) {
            console.error(error);
        }
        finally {
            setSheetIsOpen(false);
            setDate(undefined);
            setHour(undefined);
            setSubmitIsLoading(false);
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
                            <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
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
                                        <Button onClick={handleBookingSubmit} disabled={!hour || !date || submitIsLoading} className="bg-primary w-full">
                                            {submitIsLoading && (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            )}
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