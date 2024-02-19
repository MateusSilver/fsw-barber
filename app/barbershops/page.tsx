import BarbershopItem from "../(home)/_components/barbershopItem";
<<<<<<< HEAD
import Search from "../(home)/_components/search";
=======
>>>>>>> 285e7daf86f99796e95016f7840569cf4197b790
import Header from "../_components/header";
import { db } from "../_lib/prisma";

interface BarbershopsPageProps {
  searchParams: {
<<<<<<< HEAD
    search: string;
=======
    search?: string;
>>>>>>> 285e7daf86f99796e95016f7840569cf4197b790
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
<<<<<<< HEAD
        <Search
          defaultValues={{
            search: searchParams.search,
          }}
        />
        <h1 className="text-gray-400 font-bold text-xs uppercase mt-6">
=======
        <h1 className="text-gray-400 font-bold text-xs uppercase">
>>>>>>> 285e7daf86f99796e95016f7840569cf4197b790
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
