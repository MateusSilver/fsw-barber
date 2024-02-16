import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="default" size="icon">
        <SearchIcon size={18} />
      </Button>
      <Input placeholder="Busque por uma barbearia..." />
    </div>
  );
};

export default Search;
