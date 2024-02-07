"use client";
import { Button } from "@/app/_components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { signIn, signOut, useSession } from "next-auth/react";

const Welcome = () => {
    const { data } = useSession();
    const handleLoginClick = async () => {
        await signIn();
    }
    const handleLogOutClick = async () => {
        await signOut();
    }

    return (
        <>
            {data?.user ?
                (
                    <div className="flex justify-between px-5 pt-5">
                        <div className="">
                            <h2 className="text-xl font-bold ">Olá, {data?.user?.name}!</h2>
                            <p className="capitalize text-sm">{format(new Date(),"EEEE',' d 'de' MMMM 'de' yyyy", { locale: ptBR,})}</p>
                        </div>
                        <Button onClick={handleLogOutClick}>LogOut</Button>
                    </div>
                    
                ) : (
                    <div className="flex justify-between px-5 pt-5">
                        <div className="">
                            <h2 className="text-xl font-bold ">Olá, Miguel!</h2>
                            <p className="capitalize text-sm">{format(new Date(),"EEEE',' d 'de' MMMM 'de' yyyy", {
                                locale: ptBR,
                            })}</p>
                        </div>
                        <Button onClick={handleLoginClick}>LogIn</Button>
                    </div>
                )
                }
        </>
    );
}
 
export default Welcome;