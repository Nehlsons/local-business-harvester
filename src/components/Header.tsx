
import { Building2, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-harvester-blue text-white py-4 shadow-md">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building2 className="h-6 w-6" />
          <h1 className="text-xl font-bold">Local Business Harvester</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5" />
          <span className="text-sm font-medium">Geschäftsdaten sammeln</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
