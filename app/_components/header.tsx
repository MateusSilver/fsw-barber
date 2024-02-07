"use client";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

const Header = () => {
    const { data } = useSession();

    const handleLoginClick = async () => {
        await signIn();
    }
    return (
        <Card>
            <CardContent className="p-5 flex flex-row justify-between items-center">
                <Image src="/logo.png" 
                    alt="FSW Barber"
                    height={22}
                    width={120} 
                />
                {data?.user ? 
                    <h2>{data?.user?.name}</h2>
                    :
                    <Button onClick={handleLoginClick}>
                        Login
                    </Button>
                }
                {/*<Button variant="outline" size="icon">
                    <MenuIcon size={18} />
                </Button>*/}
            </CardContent>
        </Card>
    );
}
 
export default Header;