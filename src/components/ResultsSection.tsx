
import { Business } from "@/types";
import { exportToExcel } from "@/services/businessService";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import LoadingState from "./results/LoadingState";
import NoResults from "./results/NoResults";
import ExtractionProgress from "./results/ExtractionProgress";
import PostalCodeBreakdown from "./results/PostalCodeBreakdown";
import ResultsFilters from "./results/ResultsFilters";
import ResultsHeader from "./results/ResultsHeader";
import ResultsTable from "./results/ResultsTable";

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

  if (isLoading) {
    return <LoadingState />;
  }

  if (businesses.length === 0) {
    return <NoResults />;
  }

  return (
    <div className="space-y-6">
      <ResultsHeader 
        resultCount={filteredBusinesses.length}
        onExport={handleExportToExcel}
        isExporting={isExporting}
      />
      
      {extractedBusinesses.length > 0 && (
        <ExtractionProgress 
          totalBusinesses={businesses.length}
          extractedCount={extractedBusinesses.length}
          progress={extractionProgress}
        />
      )}

      {postalCodeBreakdown && Object.keys(postalCodeBreakdown).length > 0 && (
        <PostalCodeBreakdown postalCodeBreakdown={postalCodeBreakdown} />
      )}

      <ResultsFilters 
        filters={filters}
        onFiltersChange={setFilters}
      />
      
      <ResultsTable businesses={filteredBusinesses} />
    </div>
  );
};

export default ResultsSection;
