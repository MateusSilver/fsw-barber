"use client";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { LogInIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const Header = () => {
    const { data, status } = useSession();

    const handleLogOutClick = async () => {
        await signOut();
    }
    const handleLoginClick = async () => {
        await signIn("google");
    }

    return (
        <Card>
            <CardContent className="p-5 flex flex-row justify-between items-center">
                <Image src="/logo.png" 
                    alt="FSW Barber"
                    height={22}
                    width={120} 
                />
                
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <MenuIcon size={18} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="p-0">
                        <SheetHeader className="border-b border-solid border-secondary p-5">
                            <SheetTitle>
                                Menu
                            </SheetTitle>
                        </SheetHeader>
                        <SheetDescription>
                            {data?.user ?
                                <div className="flex justify-between items-center px-5 py-6">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage className="max-h-16 rounded-full" src={data.user.image ?? ""} />
                                            <AvatarFallback>{data.user.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <h2>{data.user.name}</h2>
                                    </div>
                                    <Button onClick={handleLogOutClick} variant="secondary" size="icon" >
                                        <LogOutIcon />
                                    </Button>
                                </div> 
                                : 
                                <div className="flex flex-col gap-2 px-5 py-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <UserIcon size={32} />
                                        <h2 className="text-bold">Faça seu login!</h2>
                                    </div>
                                    <Button onClick={handleLoginClick} className="w-full justify-start" variant="secondary"><LogInIcon className="mr-2" size={18} />Fazer Login</Button>
                                </div>
                            }
                        </SheetDescription>
                    </SheetContent>
                </Sheet>
            </CardContent>
        </Card>
    );
}
 
export default Header;