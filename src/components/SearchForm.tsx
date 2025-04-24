
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { BusinessType, SearchParams } from "@/types";
import { Search } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isSearching: boolean;
}

const SearchForm = ({ onSearch, isSearching }: SearchFormProps) => {
  const [location, setLocation] = useState<string>("");
  const [businessType, setBusinessType] = useState<BusinessType>("both");
  const [searchDescription, setSearchDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location.trim()) {
      toast.error("Bitte geben Sie eine Stadt oder PLZ ein");
      return;
    }
    
    // Set search description for user feedback
    const locationTypeName = isNaN(Number(location)) ? "Stadt" : "PLZ-Bereich";
    const businessTypeName = 
      businessType === "restaurants" ? "Restaurants" : 
      businessType === "hotels" ? "Hotels" : "Restaurants und Hotels";
    
    setSearchDescription(`Ermittle ${businessTypeName} in verschiedenen Postleitzahlen für ${locationTypeName}: ${location}`);
    
    onSearch({
      location: location.trim(),
      businessType
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="location">Stadt oder Postleitzahl</Label>
        <Input 
          id="location"
          placeholder="z.B. Berlin oder 10115 oder 47"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          disabled={isSearching}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">
          Geben Sie einen Städtenamen oder eine vollständige PLZ bzw. PLZ-Präfix ein
        </p>
      </div>
      
      <div className="space-y-3">
        <Label>Geschäftstyp</Label>
        <RadioGroup 
          defaultValue="both"
          value={businessType}
          onValueChange={(val) => setBusinessType(val as BusinessType)}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="restaurants" id="restaurants" disabled={isSearching} />
            <Label htmlFor="restaurants" className="font-normal">Restaurants</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hotels" id="hotels" disabled={isSearching} />
            <Label htmlFor="hotels" className="font-normal">Hotels</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="both" id="both" disabled={isSearching} />
            <Label htmlFor="both" className="font-normal">Beides</Label>
          </div>
        </RadioGroup>
      </div>
      
      {searchDescription && isSearching && (
        <Alert>
          <AlertDescription>
            {searchDescription}
          </AlertDescription>
        </Alert>
      )}
      
      <Button 
        type="submit"
        className="w-full"
        disabled={isSearching}
      >
        <Search className="mr-2 h-4 w-4" />
        {isSearching ? "Suche läuft..." : "Suchen"}
      </Button>
    </form>
  );
};

export default SearchForm;
