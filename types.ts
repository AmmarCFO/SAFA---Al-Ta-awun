
export enum ScenarioType {
  HYBRID = 'HYBRID',
  LONG_TERM = 'LONG_TERM',
  SHORT_TERM = 'SHORT_TERM',
}

export interface UnitMixItem {
  name: string;
  count: number;
  avgPrice: number;
  priceRange?: {
    min: number;
    max: number;
    avg: number;
  };
  videoUrl?: string;
}

export interface UnitInventoryItem {
  code: string;
  type: string;
  size: number;
  price: {
    worst: number;
    base: number;
    best: number;
  };
}

export interface CaseFinancials {
  revenue: number;
  netIncome: number;
  mabaatShare: number;
  roi: number;
}

export interface Scenario {
  id: string;
  type: ScenarioType;
  name: string;
  color: string;
  description: string;
  
  // Financials for all cases - This is the ONLY source of financial data.
  financials: {
    worst: CaseFinancials;
    base: CaseFinancials;
    best: CaseFinancials;
  };
  
  propertyValue: number;
  
  // Key Drivers
  unitCount: number;
  unitLabel: string;
  occupancyDurationLabel: string;
  
  // Breakdown
  unitMix: UnitMixItem[];
  inventory?: UnitInventoryItem[];
}

export interface MarketingVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
}

export interface ComparisonLink {
  platform: string;
  title: string;
  url: string;
  // Rich details for Comp Set
  location?: string;
  area?: string;
  price?: number;
  type?: string;
  period?: string;
  photosUrl?: string;
}

// Legacy types preserved for compatibility
export enum ApartmentStatus {
  VACANT = 'VACANT',
  RENTED = 'RENTED',
  RESERVED = 'RESERVED',
}

export enum ApartmentType {
  STUDIO = 'Studio',
  ONE_BEDROOM = '1 Bedroom',
  TWO_BEDROOM = '2 Bedroom',
}

export interface Apartment {
  id: string;
  number: string;
  type: ApartmentType;
  status: ApartmentStatus;
  monthlyRent: number;
  cashCollected: number;
  lifetimeValue: number;
  contractDurationMonths?: number;
  howHeard?: string;
}

export interface Branch {
  id: string;
  name: string;
  targetYearlyRevenue: {
    min: number;
    max: number;
  };
  apartments: Apartment[];
}

export interface NewBooking {
  branchId: string;
  apartmentId: string;
  contractDurationMonths: number;
  howHeard: string;
}
