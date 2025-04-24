import { Business, BusinessType } from "@/types";
import { mockHotels, mockRestaurants } from "@/data/mockBusinesses";
import { delay } from "@/utils/apiUtils";
import { searchBusinessDirectory } from "./scraperService";

// Function to get postal codes by location name or prefix
export const getPostalCodesByLocation = async (location: string): Promise<string[]> => {
  await delay(800);

  // For a real implementation, this would query a postal code API or database
  // For demonstration purposes, we'll return mock postal codes
  
  // Check if input is a postal code prefix
  if (/^\d+$/.test(location)) {
    if (location === "10") {
      return ["10115", "10117", "10119"];
    }
    else if (location === "47") {
      return ["47051", "47119", "47198"];
    }
    // If it's a specific postal code, just return it
    if (location.length === 5) {
      return [location];
    }
    // Otherwise generate some postal codes with the prefix
    return [
      `${location}100`,
      `${location}200`,
      `${location}300`
    ];
  }

  // Handle city names
  const lowercaseLocation = location.toLowerCase();
  if (lowercaseLocation.includes("berlin")) {
    return ["10115", "10117", "10785", "10969"];
  }
  else if (lowercaseLocation.includes("duisburg")) {
    return ["47051", "47119", "47198"];
  }

  // Default case: generate some random postal codes
  return ["10115", "20144", "30159", "40210"];
};

// Function to get businesses by postal code
export const getBusinessesByPostalCode = async (
  postalCode: string,
  businessType: BusinessType
): Promise<Business[]> => {
  await delay(1000);

  // First, try to find businesses in our mock data
  let filteredBusinesses: Business[] = [];
  
  if (businessType === "restaurants" || businessType === "both") {
    filteredBusinesses = [
      ...filteredBusinesses, 
      ...mockRestaurants.filter(business => business.postalCode === postalCode)
    ];
  }

  if (businessType === "hotels" || businessType === "both") {
    filteredBusinesses = [
      ...filteredBusinesses, 
      ...mockHotels.filter(business => business.postalCode === postalCode)
    ];
  }

  // If we have enough mock data, return it
  if (filteredBusinesses.length >= 3) {
    return filteredBusinesses;
  }
  
  // If we don't have enough mock data, supplement with scraped data
  const scrapedBusinesses = await searchBusinessDirectory(postalCode, businessType);
  
  // Add postal code to each scraped business
  scrapedBusinesses.forEach(business => {
    business.postalCode = postalCode;
  });
  
  // Combine mock and scraped data, removing duplicates
  const allBusinesses = [...filteredBusinesses];
  
  for (const scrapedBusiness of scrapedBusinesses) {
    // Check if this business name already exists in our filtered businesses
    if (!allBusinesses.some(b => b.name === scrapedBusiness.name)) {
      allBusinesses.push(scrapedBusiness);
    }
  }
  
  return allBusinesses;
};
