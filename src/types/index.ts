
export type BusinessType = 'restaurants' | 'hotels' | 'both';

export interface Business {
  id: string;
  name: string;
  category: string;
  owner?: string;
  email?: string;
  phone?: string;
  address?: string;
  url?: string;
}

export interface SearchParams {
  location: string;
  businessType: BusinessType;
}

export interface SearchResults {
  businesses: Business[];
  totalCount: number;
}
