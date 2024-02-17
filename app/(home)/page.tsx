import Header from "../_components/header";
import Search from "./_components/search";
import BookingItem from "../_components/bookingItem";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershopItem";
import Welcome from "./_components/welcome";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const [barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    session?.user
      ? db.booking.findMany({
          where: {
            userId: (session.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          orderBy: {
            date: "asc",
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ]);

  return (
    <div>
      <Header />
      <div className="max-w-[800px] mx-auto">
        <Welcome />

        <div className=" mt-6">
          <Search />
        </div>

        <div className="mt-6">
          {confirmedBookings?.length > 0 && (
            <>
              <h2 className="text-gray-400 uppercase font-bold text-sm mb-3">
                Agendamentos
              </h2>
              <div className="flex gap-3 px-2 py-2 overflow-x-auto">
                {confirmedBookings.map((booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="mt-6 mb-[4.5rem]">
          <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
            Recomendadas
          </h2>
          <div className="flex gap-4 overflow-x-auto py-2">
            {barbershops?.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
