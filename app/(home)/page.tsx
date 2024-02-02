import { ptBR } from "date-fns/locale";
import Header from "../_components/header";
import { format } from "date-fns";
import Search from "./_components/search";
import BookingItem from "../_components/bookingItem";

const Home = () => {
    return (
        <div>
            <Header />
            <div className="max-w-[800px] mx-auto">
                <div className="px-5 pt-5">
                    <h2 className="text-xl font-bold ">Olá, Miguel!</h2>
                    <p className="capitalize text-sm">{format(new Date(),"EEEE',' d 'de' MMMM 'de' yyyy", {
                        locale: ptBR,
                    })}</p>
                </div>
                
                <div className="px-5 mt-6">
                    <Search />
                </div>
                <div className="px-5 mt-6">
                    <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>
                    <BookingItem />
                </div>
            </div>
            
        </div>
    );
}
 
export default Home;