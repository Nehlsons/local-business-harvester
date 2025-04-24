
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchParams, Business, SearchResults } from "@/types";
import { searchBusinesses } from "@/services/businessService";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import ResultsSection from "@/components/ResultsSection";
import LegalNotice from "@/components/LegalNotice";
import ExtractedDataTable from "@/components/ExtractedDataTable";
import HowItWorks from "@/components/HowItWorks";

const Index = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [extractedBusinesses, setExtractedBusinesses] = useState<Business[]>([]);
  const [activeTab, setActiveTab] = useState("search");
  
  const handleSearch = async (params: SearchParams) => {
    setIsSearching(true);
    try {
      const results = await searchBusinesses(params);
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleDataExtracted = (business: Business) => {
    setExtractedBusinesses(prev => {
      // Check if business already exists
      if (prev.some(b => b.id === business.id)) {
        return prev;
      }
      return [...prev, business];
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <main className="container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              Lokale Geschäftsdaten automatisiert sammeln
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Extrahieren Sie Kontaktdaten von Restaurants und Hotels in Ihrer Zielregion
              und exportieren Sie sie nach Excel.
            </p>
          </div>
          
          <Tabs defaultValue="search" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="search">Suche & Extraktion</TabsTrigger>
              <TabsTrigger value="help">Hilfe & Anleitung</TabsTrigger>
            </TabsList>
            
            <TabsContent value="search" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="p-6">
                  <SearchForm onSearch={handleSearch} isSearching={isSearching} />
                </Card>
                
                <div className="md:col-span-2">
                  {searchResults && (
                    <ResultsSection 
                      businesses={searchResults.businesses} 
                      isLoading={isSearching}
                      postalCodeBreakdown={searchResults.postalCodeBreakdown}
                    />
                  )}
                </div>
              </div>
              
              {extractedBusinesses.length > 0 && (
                <ExtractedDataTable businesses={extractedBusinesses} />
              )}
              
              <LegalNotice />
            </TabsContent>
            
            <TabsContent value="help">
              <Card className="p-6">
                <HowItWorks />
                
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-4">Häufig gestellte Fragen</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">Ist das Tool DSGVO-konform?</h3>
                      <p className="text-gray-600">
                        Das Tool sammelt öffentlich verfügbare Daten. Die Nutzung und weitere Verarbeitung
                        dieser Daten muss jedoch DSGVO-konform erfolgen. Weitere Einwilligungen können 
                        für Marketingzwecke erforderlich sein.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold">Wie genau sind die extrahierten Daten?</h3>
                      <p className="text-gray-600">
                        Das Tool extrahiert Daten basierend auf üblichen Strukturen von Webseiten.
                        Die Genauigkeit kann variieren, daher empfehlen wir eine manuelle Überprüfung 
                        der kritischen Daten.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold">Welche Daten werden extrahiert?</h3>
                      <p className="text-gray-600">
                        Das Tool sammelt folgende Informationen: Name des Geschäfts, Kategorie,
                        Inhaber/Geschäftsführer, E-Mail-Adresse, Telefonnummer, Adresse und Website-URL.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold">Wie kann ich die exportierten Daten nutzen?</h3>
                      <p className="text-gray-600">
                        Die exportierten Daten können für Marktanalysen, Lead-Generierung oder 
                        Marketing-Kampagnen verwendet werden, unter Beachtung der rechtlichen Bestimmungen.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-6 border-t">
        <div className="container text-center text-gray-600">
          <p>© 2025 Local Business Harvester. Alle Rechte vorbehalten.</p>
          <p className="text-sm mt-2">
            Hinweis: Dieses Tool dient zu Demonstrations- und Bildungszwecken.
            Die Nutzung der gesammelten Daten muss im Einklang mit geltenden Gesetzen erfolgen.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
