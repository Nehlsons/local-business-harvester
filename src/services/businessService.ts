
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
    url: "https://bellaitalia-restaurant.de"
  },
  {
    id: uuidv4(),
    name: "Sushi Palace",
    category: "restaurants",
    owner: "Takashi Yamamoto",
    email: "kontakt@sushipalace.de",
    phone: "+49 30 87654321",
    address: "Friedrichstraße 45, 10117 Berlin",
    url: "https://sushipalace.de"
  },
  {
    id: uuidv4(),
    name: "Brauhaus am Markt",
    category: "restaurants",
    owner: "Hans Müller",
    email: "info@brauhaus-markt.de",
    phone: "+49 30 23456789",
    address: "Marktplatz 7, 10178 Berlin",
    url: "https://brauhaus-markt.de"
  },
  {
    id: uuidv4(),
    name: "Curry 36",
    category: "restaurants",
    owner: "Familie Schmidt",
    email: "bestellung@curry36.de",
    phone: "+49 30 34567890",
    address: "Mehringdamm 36, 10961 Berlin",
    url: "https://curry36.de"
  },
  {
    id: uuidv4(),
    name: "Viet Village",
    category: "restaurants",
    owner: "Nguyen Van",
    email: "hello@vietvillage.de",
    phone: "+49 30 45678901",
    address: "Kantstraße 55, 10625 Berlin",
    url: "https://vietvillage-restaurant.de"
  }
];

const mockHotels: Business[] = [
  {
    id: uuidv4(),
    name: "Grand Hotel Berlin",
    category: "hotels",
    owner: "Berlin Hospitality GmbH",
    email: "reception@grandhotelberlin.de",
    phone: "+49 30 56789012",
    address: "Unter den Linden 10, 10117 Berlin",
    url: "https://grandhotel-berlin.de"
  },
  {
    id: uuidv4(),
    name: "City Park Hotel",
    category: "hotels",
    owner: "Park Hotel Group",
    email: "info@cityparkhotel.de",
    phone: "+49 30 67890123",
    address: "Tiergarten Allee 22, 10785 Berlin",
    url: "https://cityparkhotel.de"
  },
  {
    id: uuidv4(),
    name: "Boutique Hotel Kreuzberg",
    category: "hotels",
    owner: "Kreuzberg Lifestyle Hotels",
    email: "stay@boutiquekreuzberg.de",
    phone: "+49 30 78901234",
    address: "Oranienstraße 83, 10969 Berlin",
    url: "https://boutique-kreuzberg.de"
  }
];

// Function to simulate a delay (like an actual API call would take)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Search function that simulates searching for businesses based on location and type
export const searchBusinesses = async (params: SearchParams): Promise<SearchResults> => {
  // Simulate network delay
  await delay(1500);
  
  const { location, businessType } = params;
  
  let results: Business[] = [];
  
  // Filter mock data based on business type
  if (businessType === 'restaurants' || businessType === 'both') {
    // In a real app, we would filter by location too
    results = [...results, ...mockRestaurants];
  }
  
  if (businessType === 'hotels' || businessType === 'both') {
    // In a real app, we would filter by location too
    results = [...results, ...mockHotels];
  }
  
  // Simulate search based on location
  // In a real app, this would be done via an API call
  if (location && location.trim() !== '') {
    // Simple simulation - in real life, we'd use a proper location-based search
    // Just randomly remove some results to simulate location filtering
    results = results.filter(() => Math.random() > 0.3);
  }
  
  return {
    businesses: results,
    totalCount: results.length
  };
};

// Function to simulate extracting detailed business data
export const extractBusinessData = async (businessId: string): Promise<Business | null> => {
  await delay(800);
  
  // Find the business in our mock data
  const business = [...mockRestaurants, ...mockHotels].find(b => b.id === businessId);
  
  if (!business) return null;
  
  // In a real app, this would make an HTTP request to scrape the business website
  return business;
};

// Function to export data to Excel (in a real app)
export const exportToExcel = async (businesses: Business[]): Promise<boolean> => {
  await delay(1500);
  
  // In a real app, this would generate and download an Excel file
  console.log('Exporting businesses to Excel:', businesses);
  
  return true;
};
