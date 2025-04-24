
import { Business, BusinessType } from "@/types";
import { mockHotels, mockRestaurants } from "@/data/mockBusinesses";
import { delay } from "@/utils/apiUtils";

// Get postal codes based on location input
export const getPostalCodesByLocation = async (location: string): Promise<string[]> => {
  await delay(800);
  
  const allBusinesses = [...mockRestaurants, ...mockHotels];
  
  // For city input
  if (isNaN(Number(location))) {
    const cityPostalCodes = allBusinesses
      .filter(business => business.address.toLowerCase().includes(location.toLowerCase()))
      .map(business => business.postalCode)
      .filter((value, index, self) => self.indexOf(value) === index);
    
    return cityPostalCodes;
  } 
  // For postal code prefix input
  else {
    const postalCodeResults = allBusinesses
      .filter(business => business.postalCode && business.postalCode.startsWith(location))
      .map(business => business.postalCode)
      .filter((value, index, self) => self.indexOf(value) === index);
    
    return postalCodeResults;
  }
};

// Get businesses by postal code and business type
export const getBusinessesByPostalCode = async (
  postalCode: string, 
  businessType: BusinessType
): Promise<Business[]> => {
  await delay(500);
  
  let results: Business[] = [];
  
  if (businessType === 'restaurants' || businessType === 'both') {
    const filteredRestaurants = mockRestaurants.filter(
      restaurant => restaurant.postalCode === postalCode
    );
    results = [...results, ...filteredRestaurants];
  }
  
  if (businessType === 'hotels' || businessType === 'both') {
    const filteredHotels = mockHotels.filter(
      hotel => hotel.postalCode === postalCode
    );
    results = [...results, ...filteredHotels];
  }
  
  return results;
};
