
import { Business } from "@/types";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Loader2, Mail, Phone } from "lucide-react";
import { exportToExcel } from "@/services/businessService";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface ResultsSectionProps {
  businesses: Business[];
  isLoading: boolean;
}

const ResultsSection = ({ businesses, isLoading }: ResultsSectionProps) => {
  const [extractedBusinesses, setExtractedBusinesses] = useState<Business[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [filters, setFilters] = useState({
    hasEmail: false,
    hasPhone: false
  });
  
  // Automatische Extraktion beim Laden der Geschäfte
  useEffect(() => {
    const extractData = async () => {
      for (const business of businesses) {
        // Simuliere Extraktion mit einer Verzögerung
        await new Promise(resolve => setTimeout(resolve, 500));
        handleBusinessDataExtracted(business);
      }
    };
    
    if (businesses.length > 0) {
      extractData();
    }
  }, [businesses]);
  
  const handleBusinessDataExtracted = (business: Business) => {
    setExtractedBusinesses(prev => {
      if (prev.some(b => b.id === business.id)) {
        return prev;
      }
      return [...prev, business];
    });
  };
  
  const handleExportToExcel = async () => {
    if (extractedBusinesses.length === 0) {
      toast.warning("Keine Daten zum Exportieren verfügbar");
      return;
    }
    
    setIsExporting(true);
    try {
      const success = await exportToExcel(filteredBusinesses);
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

  const filteredBusinesses = extractedBusinesses.filter(business => {
    if (filters.hasEmail && !business.email) return false;
    if (filters.hasPhone && !business.phone) return false;
    return true;
  });

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
        <h2 className="text-xl font-bold">Ergebnisse ({filteredBusinesses.length})</h2>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleExportToExcel}
          disabled={filteredBusinesses.length === 0 || isExporting}
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

      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <Checkbox 
            id="hasEmail" 
            checked={filters.hasEmail}
            onCheckedChange={(checked) => 
              setFilters(prev => ({ ...prev, hasEmail: checked as boolean }))
            }
          />
          <label htmlFor="hasEmail" className="text-sm flex items-center gap-1">
            <Mail className="h-4 w-4" />
            Hat E-Mail
          </label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox 
            id="hasPhone" 
            checked={filters.hasPhone}
            onCheckedChange={(checked) => 
              setFilters(prev => ({ ...prev, hasPhone: checked as boolean }))
            }
          />
          <label htmlFor="hasPhone" className="text-sm flex items-center gap-1">
            <Phone className="h-4 w-4" />
            Hat Telefonnummer
          </label>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Kategorie</TableHead>
              <TableHead>Inhaber</TableHead>
              <TableHead>E-Mail</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Adresse</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBusinesses.map((business) => (
              <TableRow key={business.id}>
                <TableCell className="font-medium">{business.name}</TableCell>
                <TableCell>
                  {business.category === 'restaurants' ? 'Restaurant' : 'Hotel'}
                </TableCell>
                <TableCell>{business.owner || 'N/A'}</TableCell>
                <TableCell>{business.email || 'N/A'}</TableCell>
                <TableCell>{business.phone || 'N/A'}</TableCell>
                <TableCell>{business.address || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ResultsSection;
