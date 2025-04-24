
import { Business, BusinessType } from "@/types";
import { v4 as uuidv4 } from 'uuid';
import { delay } from "@/utils/apiUtils";
import { FirecrawlService } from '@/utils/FirecrawlService';
import { toast } from "sonner";

export const scrapeBusinessWebsite = async (url: string): Promise<Partial<Business>> => {
  try {
    console.log(`Scraping website: ${url}`);
    
    const result = await FirecrawlService.crawlWebsite(url);
    
    if (!result.success) {
      toast.error(`Failed to scrape ${url}: ${result.error}`);
      return {};
    }
    
    const data = result.data;
    const extractedData: Partial<Business> = {};
    
    // Extract relevant business information from the crawled data
    if (data) {
      // Map crawled data to business fields
      // This is a simple example - you would need to adjust based on your needs
      if (data.email) extractedData.email = data.email;
      if (data.phone) extractedData.phone = data.phone;
      if (data.owner) extractedData.owner = data.owner;
    }
    
    console.log("Extracted data:", extractedData);
    return extractedData;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return {};
  }
};

// Function to find business websites based on name and location
export const findBusinessWebsites = async (
  businessName: string, 
  postalCode: string
): Promise<string[]> => {
  console.log(`Searching for website of ${businessName} in ${postalCode}`);
  
  // Simulate a search engine API call
  await delay(1000);
  
  // Generate a fake website URL based on business name
  const domain = businessName
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-');
    
  // Return a fake website URL
  return [`https://${domain}.de`];
};

// Function to search for businesses on directory sites
export const searchBusinessDirectory = async (
  location: string, 
  businessType: BusinessType
): Promise<Business[]> => {
  console.log(`Searching business directories for ${businessType} in ${location}`);
  
  // Simulate searching directory websites
  await delay(2000);
  
  const businesses: Business[] = [];
  const count = Math.floor(Math.random() * 5) + 3; // Generate 3-7 businesses
  
  for (let i = 0; i < count; i++) {
    const business: Business = {
      id: uuidv4(),
      name: generateBusinessName(businessType),
      category: businessType === 'both' ? 
        (Math.random() > 0.5 ? 'restaurants' : 'hotels') : 
        businessType,
      postalCode: generatePostalCode(location),
      url: `https://${generateBusinessName(businessType).toLowerCase().replace(/\s+/g, '-')}.de`
    };
    
    businesses.push(business);
  }
  
  return businesses;
};

// Helper function to generate random business names
function generateBusinessName(type: BusinessType): string {
  const restaurantPrefixes = ['Bella', 'Golden', 'Royal', 'Spice', 'Blue', 'Green'];
  const restaurantNames = ['Trattoria', 'Kitchen', 'Garden', 'Bistro', 'Restaurant', 'Eatery'];
  const hotelPrefixes = ['Grand', 'Royal', 'Luxury', 'Comfort', 'City', 'Park'];
  const hotelNames = ['Hotel', 'Suites', 'Resort', 'Inn', 'Palace', 'Lodge'];
  
  const prefixes = type === 'hotels' ? hotelPrefixes : restaurantPrefixes;
  const names = type === 'hotels' ? hotelNames : restaurantNames;
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  
  return `${prefix} ${name}`;
}

// Helper function to generate random postal codes based on location
function generatePostalCode(location: string): string {
  // Common postal code prefixes for major German cities
  const postalCodes: {[key: string]: string[]} = {
    'berlin': ['10', '12', '13', '14'],
    'münchen': ['80', '81', '82'],
    'hamburg': ['20', '21', '22'],
    'köln': ['50', '51'],
    'frankfurt': ['60', '61'],
    'duisburg': ['47'],
    'dresden': ['01']
  };
  
  const lowercaseLocation = location.toLowerCase();
  let prefix = '';
  
  // Find matching prefix or use a generic one
  for (const [city, prefixes] of Object.entries(postalCodes)) {
    if (lowercaseLocation.includes(city)) {
      prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      break;
    }
  }
  
  // If no match, use a random prefix
  if (!prefix) {
    prefix = Math.floor(Math.random() * 90 + 10).toString();
  }
  
  // Generate the rest of the postal code
  const suffix = Math.floor(Math.random() * 900 + 100).toString();
  return `${prefix}${suffix}`;
}

// Helper function to generate random person names
function generateRandomName(): string {
  const firstNames = [
    'Anna', 'Thomas', 'Maria', 'Michael', 'Laura', 
    'Stefan', 'Julia', 'Andreas', 'Lisa', 'Jan'
  ];
  
  const lastNames = [
    'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 
    'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann'
  ];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${lastName}`;
}
