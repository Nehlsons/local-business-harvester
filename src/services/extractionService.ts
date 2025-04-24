
import { Business } from "@/types";
import { mockHotels, mockRestaurants } from "@/data/mockBusinesses";
import { delay } from "@/utils/apiUtils";
import { scrapeBusinessWebsite, findBusinessWebsites } from "./scraperService";
import { toast } from "sonner";

// Extract detailed data for a business
export const extractBusinessData = async (businessId: string): Promise<Business | null> => {
  await delay(1000);
  
  const allBusinesses = [...mockRestaurants, ...mockHotels];
  let business = allBusinesses.find(b => b.id === businessId);
  
  if (!business) {
    console.error(`Business with ID ${businessId} not found in mock data`);
    // If not in mock data, we'll assume this is a real business that needs scraping
    return null;
  }
  
  console.log(`Extracting data for business: ${business.name}`);
  
  try {
    // If the business has a URL, scrape it for more information
    if (business.url) {
      const scrapedData = await scrapeBusinessWebsite(business.url);
      
      // Merge scraped data with existing data
      business = {
        ...business,
        ...scrapedData
      };
      
      console.log("Enhanced business data with scraped information:", business);
    } else {
      // If no URL exists, try to find the business website
      const websites = await findBusinessWebsites(business.name, business.postalCode || '');
      
      if (websites.length > 0) {
        business.url = websites[0];
        const scrapedData = await scrapeBusinessWebsite(business.url);
        
        // Merge scraped data with existing data
        business = {
          ...business,
          ...scrapedData
        };
      }
    }
    
    // Validate that owner is not a company (GmbH)
    if (business.owner && (business.owner.includes('GmbH') || business.owner.includes('gmbh'))) {
      console.error(`Invalid owner format for business: ${business.name}`);
      // Clear the owner field if it's a company
      business.owner = undefined;
    }
    
    return business;
  } catch (error) {
    console.error(`Error extracting data for ${business.name}:`, error);
    toast.error(`Fehler beim Extrahieren der Daten für ${business.name}`);
    return business;
  }
};

// Function to export data to Excel
export const exportToExcel = async (businesses: Business[]): Promise<boolean> => {
  await delay(1500);
  console.log('Exporting businesses to Excel:', businesses);
  
  // In a real app, this would use a library like ExcelJS or xlsx
  // to generate an actual Excel file and trigger a download
  
  try {
    // Simulate Excel file generation
    const today = new Date().toISOString().split('T')[0];
    const fileName = `business_data_${today}.xlsx`;
    
    console.log(`Generated Excel file: ${fileName} with ${businesses.length} entries`);
    return true;
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    return false;
  }
};
