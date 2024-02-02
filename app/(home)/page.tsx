import { ptBR } from "date-fns/locale";
import Header from "../_components/header";
import { format } from "date-fns";
import Search from "./_components/search";

const Home = () => {
    return (
        <div>
            <Header />

            <div className="px-5 pt-5">
                <h2 className="text-xl font-bold ">Olá, Miguel!</h2>
                <p className="capitalize text-sm">{format(new Date(),"EEEE',' d 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                })}</p>
            </div>
            
            <div className="px-5 mt-6 max-w-[800px]">
                <Search />
            </div>
            
        </div>
    );
}
 
export default Home;