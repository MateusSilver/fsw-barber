import BarbershopItem from "../(home)/_components/barbershopItem";
import Header from "../_components/header";
import { db } from "../_lib/prisma";

interface BarbershopsPageProps {
  searchParams: {
    search?: string;
  };
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });
  return (
    <>
      <Header />
      <div className="px-5 py-6 h-[50vh]">
        <h1 className="text-gray-400 font-bold text-xs uppercase">
          Resultados para &quot;{searchParams.search}&quot;
        </h1>
        <div className="flex flex-wrap gap-2 my-6">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
        {barbershops.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <h2 className="text-gray-400 font-bold text-xs uppercase">
              Não encontramos nenhuma barbearia com esse nome
            </h2>
          </div>
        )}
      </div>
    </>
  );
};

export default BarbershopsPage;
