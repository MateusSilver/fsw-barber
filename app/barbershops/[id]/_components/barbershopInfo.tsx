"use client";

import Menu from "@/app/_components/menu";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
  barbershopInfo: Barbershop;
}

const BarbershopInfo = ({ barbershopInfo }: BarbershopInfoProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.replace("/");
  };
  return (
    <div>
      <div className="h-[250px] w-full relative">
        <Button
          onClick={handleBackClick}
          size="icon"
          variant="outline"
          className="z-50 absolute top-4 left-4"
        >
          <ChevronLeftIcon size={18} />
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="z-50 absolute top-4 right-4"
              variant="outline"
              size="icon"
            >
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-8">
            <Menu />
          </SheetContent>
        </Sheet>

        <Image
          src={barbershopInfo.imageURL}
          alt={barbershopInfo.name}
          className="opacity-75"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
        <h1 className="text-xl font-bold">{barbershopInfo.name}</h1>
        <div className="flex items-center gap-2 mt-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershopInfo.address}</p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5,0 avaliações</p>
        </div>
      </div>
    </div>
  );
};

export default BarbershopInfo;
