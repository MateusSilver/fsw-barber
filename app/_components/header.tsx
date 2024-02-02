import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
    return (
        <Card>
            <CardContent className="p-5 flex flex-row justify-between items-center">
                <Image src="/logo.png" 
                    alt="FSW Barber"
                    height={22}
                    width={120} 
                />
                <Button variant="outline" size="icon">
                    <MenuIcon size={18} />
                </Button>
            </CardContent>
        </Card>
    );
}
 
export default Header;