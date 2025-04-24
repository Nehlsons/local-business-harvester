import { Business } from "@/types";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Loader2, Mail, Phone, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { exportToExcel } from "@/services/businessService";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultsSectionProps {
  businesses: Business[];
  isLoading: boolean;
  postalCodeBreakdown?: {[key: string]: Business[]};
}

const ResultsSection = ({ businesses, isLoading, postalCodeBreakdown }: ResultsSectionProps) => {
  const [extractedBusinesses, setExtractedBusinesses] = useState<Business[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [filters, setFilters] = useState({
    hasEmail: false,
    hasPhone: false
  });
  const [expandedPostalCodes, setExpandedPostalCodes] = useState<{[key: string]: boolean}>({});
  
  useEffect(() => {
    const extractData = async () => {
      for (const business of businesses) {
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

  const togglePostalCode = (postalCode: string) => {
    setExpandedPostalCodes(prev => ({
      ...prev,
      [postalCode]: !prev[postalCode]
    }));
  };

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

      {postalCodeBreakdown && Object.keys(postalCodeBreakdown).length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Aufschlüsselung nach PLZ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(postalCodeBreakdown).map(([postalCode, plzBusinesses]) => (
              <Card key={postalCode} className="overflow-hidden">
                <CardHeader 
                  className="cursor-pointer bg-slate-50 py-2 hover:bg-slate-100"
                  onClick={() => togglePostalCode(postalCode)}
                >
                  <CardTitle className="flex justify-between items-center text-base">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      PLZ {postalCode}
                    </span>
                    <span className="flex items-center">
                      {plzBusinesses.length} Treffer
                      {expandedPostalCodes[postalCode] ? 
                        <ChevronUp className="h-4 w-4 ml-1" /> : 
                        <ChevronDown className="h-4 w-4 ml-1" />
                      }
                    </span>
                  </CardTitle>
                </CardHeader>
                {expandedPostalCodes[postalCode] && (
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Kategorie</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {plzBusinesses.map(business => (
                          <TableRow key={business.id}>
                            <TableCell className="py-2">{business.name}</TableCell>
                            <TableCell className="py-2">
                              {business.category === 'restaurants' ? 'Restaurant' : 'Hotel'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
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
              <TableHead>Inhaber oder Geschäftsführer</TableHead>
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
