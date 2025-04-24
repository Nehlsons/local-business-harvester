import { Business, BusinessType, SearchParams, SearchResults } from "@/types";
import { v4 as uuidv4 } from 'uuid';

// Mock data for simulating API responses
const mockRestaurants: Business[] = [
  {
    id: uuidv4(),
    name: "Ristorante Bella Italia",
    category: "restaurants",
    owner: "Maria Rossi",
    email: "info@bellaitalia.de",
    phone: "+49 30 12345678",
    address: "Hauptstraße 123, 10115 Berlin",
    url: "https://bellaitalia-restaurant.de",
    postalCode: "10115"
  },
  {
    id: uuidv4(),
    name: "Sushi Palace",
    category: "restaurants",
    owner: "Takashi Yamamoto",
    email: "kontakt@sushipalace.de",
    phone: "+49 30 87654321",
    address: "Friedrichstraße 45, 10117 Berlin",
    url: "https://sushipalace.de",
    postalCode: "10117"
  },
  {
    id: uuidv4(),
    name: "Brauhaus am Markt",
    category: "restaurants",
    owner: "Hans Müller",
    email: "info@brauhaus-markt.de",
    phone: "+49 30 23456789",
    address: "Marktplatz 7, 10178 Berlin",
    url: "https://brauhaus-markt.de",
    postalCode: "10178"
  },
  {
    id: uuidv4(),
    name: "Curry 36",
    category: "restaurants",
    owner: "Michael Schmidt",
    email: "bestellung@curry36.de",
    phone: "+49 30 34567890",
    address: "Mehringdamm 36, 10961 Berlin",
    url: "https://curry36.de",
    postalCode: "10961"
  },
  {
    id: uuidv4(),
    name: "Viet Village",
    category: "restaurants",
    owner: "Nguyen Van",
    email: "hello@vietvillage.de",
    phone: "+49 30 45678901",
    address: "Kantstraße 55, 10625 Berlin",
    url: "https://vietvillage-restaurant.de",
    postalCode: "10625"
  },
  {
    id: uuidv4(),
    name: "Pizza Express",
    category: "restaurants",
    owner: "Luigi Romano",
    email: "info@pizzaexpress.de", 
    phone: "+49 470 1234567",
    address: "Hauptstraße 42, 47051 Duisburg",
    url: "https://pizza-express-duisburg.de",
    postalCode: "47051"
  },
  {
    id: uuidv4(),
    name: "Gasthaus zur Mühle",
    category: "restaurants",
    owner: "Franz Weber",
    email: "reservierung@gasthaus-muehle.de",
    phone: "+49 471 7654321",
    address: "Mühlenweg 8, 47198 Duisburg",
    url: "https://gasthaus-muehle.de",
    postalCode: "47198"
  }
];

const mockHotels: Business[] = [
  {
    id: uuidv4(),
    name: "Grand Hotel Berlin",
    category: "hotels",
    owner: "Klaus Schmidt",
    email: "reception@grandhotelberlin.de",
    phone: "+49 30 56789012",
    address: "Unter den Linden 10, 10117 Berlin",
    url: "https://grandhotel-berlin.de",
    postalCode: "10117"
  },
  {
    id: uuidv4(),
    name: "City Park Hotel",
    category: "hotels",
    owner: "Thomas Meyer",
    email: "info@cityparkhotel.de",
    phone: "+49 30 67890123",
    address: "Tiergarten Allee 22, 10785 Berlin",
    url: "https://cityparkhotel.de",
    postalCode: "10785"
  },
  {
    id: uuidv4(),
    name: "Boutique Hotel Kreuzberg",
    category: "hotels",
    owner: "Sarah Wagner",
    email: "stay@boutiquekreuzberg.de",
    phone: "+49 30 78901234",
    address: "Oranienstraße 83, 10969 Berlin",
    url: "https://boutique-kreuzberg.de",
    postalCode: "10969"
  },
  {
    id: uuidv4(),
    name: "Hotel am Hafen",
    category: "hotels",
    owner: "Peter Fischer",
    email: "info@hotelamhafen.de",
    phone: "+49 470 9876543",
    address: "Hafenstraße 15, 47119 Duisburg",
    url: "https://hotel-am-hafen.de",
    postalCode: "47119"
  }
];

// Function to simulate a delay (like an actual API call would take)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get postal codes based on location input
export const getPostalCodesByLocation = async (location: string): Promise<string[]> => {
  await delay(800);
  
  // For city input
  if (isNaN(Number(location))) {
    // If the input is a city name (not a number)
    const allBusinesses = [...mockRestaurants, ...mockHotels];
    const cityPostalCodes = allBusinesses
      .filter(business => business.address.toLowerCase().includes(location.toLowerCase()))
      .map(business => business.postalCode)
      .filter((value, index, self) => self.indexOf(value) === index); // Unique values
    
    return cityPostalCodes;
  } 
  // For postal code prefix input
  else {
    const allBusinesses = [...mockRestaurants, ...mockHotels];
    const postalCodeResults = allBusinesses
      .filter(business => business.postalCode && business.postalCode.startsWith(location))
      .map(business => business.postalCode)
      .filter((value, index, self) => self.indexOf(value) === index); // Unique values
    
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

// Search function that simulates searching for businesses based on location and type
export const searchBusinesses = async (params: SearchParams): Promise<SearchResults> => {
  // Simulate network delay
  await delay(1000);
  
  const { location, businessType } = params;
  
  // Get all relevant postal codes first
  const postalCodes = await getPostalCodesByLocation(location);
  
  // Get businesses for each postal code
  const postalCodeBreakdown: {[key: string]: Business[]} = {};
  let allBusinesses: Business[] = [];
  
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

// Function to export data to Excel (in a real app)
export const exportToExcel = async (businesses: Business[]): Promise<boolean> => {
  await delay(1500);
  
  // In a real app, this would generate and download an Excel file
  console.log('Exporting businesses to Excel:', businesses);
  
  return true;
};

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
