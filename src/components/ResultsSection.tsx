
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
import { extractBusinessData } from "@/services/extractionService";
import { searchBusinessDirectory } from "@/services/scraperService";

interface ResultsSectionProps {
  businesses: Business[];
  isLoading: boolean;
  postalCodeBreakdown?: {[key: string]: Business[]};
  onSearch?: (params: any) => void;
  searchParams?: any;
}

const ResultsSection = ({ 
  businesses, 
  isLoading, 
  postalCodeBreakdown,
  onSearch,
  searchParams
}: ResultsSectionProps) => {
  const [extractedBusinesses, setExtractedBusinesses] = useState<Business[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [filters, setFilters] = useState({
    hasEmail: false,
    hasPhone: false
  });
  
  useEffect(() => {
    const extractData = async () => {
      setIsExtracting(true);
      for (const business of businesses) {
        await new Promise(resolve => setTimeout(resolve, 500));
        try {
          const extractedBusiness = await extractBusinessData(business.id);
          if (extractedBusiness) {
            handleBusinessDataExtracted(extractedBusiness);
          }
        } catch (error) {
          console.error(`Error extracting data for ${business.name}:`, error);
        }
      }
      setIsExtracting(false);
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
    if (filteredBusinesses.length === 0) {
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

  const handleRetryWithScraper = async () => {
    if (!searchParams || !onSearch) return;
    
    toast.info("Suche mit Web Scraper...");
    
    try {
      // Use the scraper service to find businesses
      const scrapedBusinesses = await searchBusinessDirectory(
        searchParams.location, 
        searchParams.businessType
      );
      
      if (scrapedBusinesses.length > 0) {
        // Call the onSearch prop with updated results
        onSearch({
          ...searchParams,
          useScrapedResults: true,
          scrapedBusinesses
        });
      } else {
        toast.error("Keine Ergebnisse vom Web Scraper gefunden");
      }
    } catch (error) {
      toast.error("Fehler bei der Suche mit dem Web Scraper");
      console.error("Scraper error:", error);
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
    return <NoResults onRetry={handleRetryWithScraper} />;
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
          isExtracting={isExtracting}
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
