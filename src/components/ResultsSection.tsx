
import { Business } from "@/types";
import BusinessCard from "./BusinessCard";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Loader2 } from "lucide-react";
import { exportToExcel } from "@/services/businessService";
import { toast } from "sonner";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

interface ResultsSectionProps {
  businesses: Business[];
  isLoading: boolean;
}

const ResultsSection = ({ businesses, isLoading }: ResultsSectionProps) => {
  const [extractedBusinesses, setExtractedBusinesses] = useState<Business[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  
  const handleBusinessDataExtracted = (business: Business) => {
    setExtractedBusinesses(prev => {
      // Check if business already exists
      if (prev.some(b => b.id === business.id)) {
        return prev;
      }
      return [...prev, business];
    });
  };
  
  const handleExportToExcel = async () => {
    if (extractedBusinesses.length === 0) {
      toast.warning("Bitte extrahieren Sie zuerst einige Geschäftsdaten");
      return;
    }
    
    setIsExporting(true);
    try {
      const success = await exportToExcel(extractedBusinesses);
      if (success) {
        toast.success("Daten erfolgreich exportiert!");
      } else {
        toast.error("Fehler beim Exportieren der Daten");
      }
    } catch (error) {
      toast.error("Fehler beim Exportieren der Daten");
      console.error("Export error:", error);
    } finally {
      setIsExporting(false);
    }
  };
  
  const extractionProgress = businesses.length > 0
    ? Math.round((extractedBusinesses.length / businesses.length) * 100)
    : 0;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 space-y-4">
        <Loader2 className="h-10 w-10 text-harvester-blue animate-spin" />
        <p className="text-muted-foreground">Suche nach Geschäften...</p>
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Keine Ergebnisse gefunden. Bitte versuchen Sie eine andere Suche.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Ergebnisse ({businesses.length})</h2>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleExportToExcel}
          disabled={extractedBusinesses.length === 0 || isExporting}
        >
          <FileSpreadsheet className="h-4 w-4" />
          {isExporting ? "Exportiere..." : "Nach Excel exportieren"}
        </Button>
      </div>
      
      {extractedBusinesses.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{extractedBusinesses.length} von {businesses.length} extrahiert</span>
            <span>{extractionProgress}%</span>
          </div>
          <Progress value={extractionProgress} className="h-2" />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {businesses.map(business => (
          <BusinessCard 
            key={business.id} 
            business={business} 
            onDataExtracted={handleBusinessDataExtracted} 
          />
        ))}
      </div>
    </div>
  );
};

export default ResultsSection;
