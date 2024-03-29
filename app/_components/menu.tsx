"use client";
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Menu = () => {
  const { data } = useSession();

  const handleLogOutClick = () => {
    signOut();
  };
  const handleLoginClick = () => {
    signIn("google");
  };
  return (
    <>
      <SheetHeader className="border-b border-solid border-secondary p-5">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      {data?.user ? (
        <div className="flex justify-between items-center px-5 py-6">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                className="max-h-16 rounded-full"
                src={data.user.image ?? ""}
              />
              <AvatarFallback>{data.user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2>{data.user.name}</h2>
          </div>
          <Button onClick={handleLogOutClick} variant="secondary" size="icon">
            <LogOutIcon />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2 px-5 py-6">
          <div className="flex items-center gap-2 mb-4">
            <UserIcon size={32} />
            <h2 className="text-bold">Faça seu login!</h2>
          </div>
          <Button
            onClick={handleLoginClick}
            className="w-full justify-start"
            variant="secondary"
          >
            <LogInIcon className="mr-2" size={18} />
            Fazer Login
          </Button>
        </div>
      )}
      <div className="flex flex-col gap-3 px-5">
        <Link href="/">
          <Button variant="outline" className="w-full justify-start">
            <HomeIcon className="mr-2" size={18} /> Início
          </Button>
        </Link>
        {data?.user && (
          <Link href="/bookings">
            <Button variant="outline" className="w-full justify-start">
              <CalendarIcon className="mr-2" size={18} /> Agendamentos
            </Button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Menu;
