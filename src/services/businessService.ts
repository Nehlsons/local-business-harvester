
import { SearchParams, SearchResults, Business } from "@/types";
import { getPostalCodesByLocation, getBusinessesByPostalCode } from "./postalCodeService";

// Main search function that uses the other services
export const searchBusinesses = async (params: SearchParams): Promise<SearchResults> => {
  const { location, businessType } = params;
  
  // Get all relevant postal codes first
  const postalCodes = await getPostalCodesByLocation(location);
  
  // Get businesses for each postal code
  const postalCodeBreakdown: {[key: string]: Business[]} = {};
  let allBusinesses = [];
  
  for (const code of postalCodes) {
    const businesses = await getBusinessesByPostalCode(code, businessType);
    postalCodeBreakdown[code] = businesses;
    allBusinesses = [...allBusinesses, ...businesses];
  }
  
  return {
    businesses: allBusinesses,
    totalCount: allBusinesses.length,
    postalCodeBreakdown
  };
};

export { extractBusinessData, exportToExcel } from './extractionService';
