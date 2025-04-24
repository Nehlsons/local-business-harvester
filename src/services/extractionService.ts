
import { Business } from "@/types";
import { mockHotels, mockRestaurants } from "@/data/mockBusinesses";
import { delay } from "@/utils/apiUtils";

// Function to extract detailed data for a business
export const extractBusinessData = async (businessId: string): Promise<Business | null> => {
  await delay(1000);
  
  const allBusinesses = [...mockRestaurants, ...mockHotels];
  const business = allBusinesses.find(b => b.id === businessId);
  
  if (!business) {
    console.error(`Business with ID ${businessId} not found`);
    return null;
  }
  
  // Validate that owner is not a company (GmbH)
  if (business.owner.includes('GmbH') || business.owner.includes('gmbh')) {
    console.error(`Invalid owner format for business: ${business.name}`);
    return null;
  }
  
  console.log(`Extracting data for business: ${business.name}`);
  return business;
};

// Function to export data to Excel (in a real app)
export const exportToExcel = async (businesses: Business[]): Promise<boolean> => {
  await delay(1500);
  console.log('Exporting businesses to Excel:', businesses);
  return true;
};
