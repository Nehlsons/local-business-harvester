
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Business } from "@/types";
import { Building, Building2 } from "lucide-react";
import { useState } from "react";
import { extractBusinessData } from "@/services/businessService";
import { toast } from "sonner";

interface BusinessCardProps {
  business: Business;
  onDataExtracted: (business: Business) => void;
}

const BusinessCard = ({ business, onDataExtracted }: BusinessCardProps) => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [isExtracted, setIsExtracted] = useState(false);

  const handleExtractData = async () => {
    setIsExtracting(true);
    try {
      const businessData = await extractBusinessData(business.id);
      if (businessData) {
        toast.success(`Daten für ${business.name} extrahiert`);
        setIsExtracted(true);
        onDataExtracted(businessData);
      } else {
        toast.error(`Konnte keine Daten für ${business.name} extrahieren`);
      }
    } catch (error) {
      toast.error("Fehler beim Extrahieren der Daten");
      console.error("Data extraction error:", error);
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-bold">{business.name}</CardTitle>
          {business.category === "restaurants" ? (
            <Building className="h-5 w-5 text-harvester-blue" />
          ) : (
            <Building2 className="h-5 w-5 text-harvester-blue" />
          )}
        </div>
      </CardHeader>
      <CardContent className="text-sm text-gray-600">
        <p>
          {business.category === "restaurants" ? "Restaurant" : "Hotel"} in{" "}
          {business.address ? business.address.split(",")[1] || "N/A" : "N/A"}
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleExtractData} 
          variant={isExtracted ? "secondary" : "default"}
          disabled={isExtracting || isExtracted} 
          className="w-full"
        >
          {isExtracting 
            ? "Extrahiere Daten..." 
            : isExtracted 
              ? "Daten extrahiert" 
              : "Daten extrahieren"
          }
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BusinessCard;
