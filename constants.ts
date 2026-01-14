
import { Scenario, ScenarioType, MarketingVideo, Branch, ComparisonLink } from './types';

// Average furnishing cost estimate (can be updated if specific split costs are provided)
export const FURNISHING_COST_PER_UNIT = 45000; 
export const MABAAT_SHARE_PERCENTAGE = 0.25;
export const COMP_SET_SHEET_URL = "https://docs.google.com/spreadsheets/d/1qpz5XSqgJpHx7WrRuPAgqmRgnkwdKS0vh1nVJXlv1dA/edit?usp=sharing";

export const SCENARIOS: any[] = [
  {
    id: 'safa_taawun',
    type: ScenarioType.LONG_TERM,
    name: 'SAFA - Al Ta\'awun',
    color: '#2A5B64',
    description: 'Strategic analysis of the Al Ta\'awun building. Comparing the existing 14-unit layout against a high-yield subdivision strategy creating 26 boutique units.',
    
    // Data for the 14 Units Model (Singular)
    singular: {
        unitCount: 14,
        unitLabel: 'Original Units',
        financials: {
            worst: { revenue: 1979616, mabaatShare: 0, netIncome: 0, roi: 0 },
            base: { revenue: 2225184, mabaatShare: 0, netIncome: 0, roi: 0 },
            best: { revenue: 2519988, mabaatShare: 0, netIncome: 0, roi: 0 }
        },
        unitMix: [
            { name: '3 Bedroom Apartment', count: 12, avgPrice: 13500 },
            { name: '2 Bedroom Apartment', count: 2, avgPrice: 11900 }
        ],
        inventory: [
            { code: 'A201', type: '3BR', size: 120.8, price: { worst: 12200, base: 13600, best: 15200 } },
            { code: 'A202', type: '3BR', size: 140.17, price: { worst: 12000, base: 12500, best: 14300 } },
            { code: 'A203', type: '3BR', size: 194.17, price: { worst: 12100, base: 12700, best: 14000 } },
            { code: 'A204', type: '3BR', size: 148.86, price: { worst: 9800, base: 10500, best: 11300 } },
            { code: 'A205', type: '3BR', size: 162.57, price: { worst: 12000, base: 13300, best: 15300 } },
            { code: 'A206', type: '3BR', size: 123.71, price: { worst: 10000, base: 11400, best: 12800 } },
            { code: 'A207', type: '3BR', size: 155.06, price: { worst: 12700, base: 14400, best: 16000 } },
            { code: 'A208', type: '3BR', size: 176.9, price: { worst: 14400, base: 16900, best: 19500 } },
            { code: 'A209', type: '3BR', size: 162.57, price: { worst: 13200, base: 15000, best: 17200 } },
            { code: 'A210', type: '3BR', size: 123.71, price: { worst: 9900, base: 11300, best: 12800 } },
            { code: 'A211', type: '3BR', size: 155.06, price: { worst: 12500, base: 14100, best: 15800 } },
            { code: 'A212', type: '3BR', size: 176.9, price: { worst: 13800, base: 15900, best: 18200 } },
            { code: 'A213', type: '2BR', size: 238.17, price: { worst: 9300, base: 11000, best: 12600 } },
            { code: 'A214', type: '2BR', size: 272.97, price: { worst: 11000, base: 12900, best: 14900 } }
        ]
    },

    // Data for the 26 Units Model (Divided)
    divided: {
        unitCount: 26,
        unitLabel: 'Split Units',
        financials: {
            worst: { revenue: 1979604, mabaatShare: 0, netIncome: 0, roi: 0 },
            base: { revenue: 2223984, mabaatShare: 0, netIncome: 0, roi: 0 },
            best: { revenue: 2519988, mabaatShare: 0, netIncome: 0, roi: 0 }
        },
        unitMix: [
            { name: '1 Bedroom (Split)', count: 21, avgPrice: 6800 },
            { name: 'Studio (Split)', count: 3, avgPrice: 4100 },
            { name: '2 Bedroom (Original)', count: 2, avgPrice: 11900 }
        ],
        inventory: [
            { code: '201-A', type: '1BR', size: 35.73, price: { worst: 6100, base: 6400, best: 6900 } },
            { code: '201-B', type: '1BR', size: 60.86, price: { worst: 6132, base: 7214, best: 8297 } },
            { code: '202-A', type: '1BR', size: 54.00, price: { worst: 6000, base: 6401, best: 7361 } },
            { code: '202-B', type: '1BR', size: 51.20, price: { worst: 6000, base: 6069, best: 6980 } },
            { code: '203-A', type: '1BR', size: 48.70, price: { worst: 6100, base: 6500, best: 6900 } },
            { code: '203-B', type: '1BR', size: 51.90, price: { worst: 6000, base: 6152, best: 7075 } },
            { code: '204-A', type: 'Studio', size: 27.04, price: { worst: 3800, base: 4100, best: 4500 } },
            { code: '204-B', type: '1BR', size: 50.20, price: { worst: 6000, base: 6400, best: 6843 } },
            { code: '205-A', type: '1BR', size: 54.70, price: { worst: 6000, base: 6484, best: 7457 } },
            { code: '205-B', type: '1BR', size: 57.45, price: { worst: 6000, base: 6810, best: 7832 } },
            { code: '206-A', type: 'Studio', size: 27.99, price: { worst: 3800, base: 4100, best: 4500 } },
            { code: '206-B', type: '1BR', size: 61.21, price: { worst: 6167, base: 7256, best: 8344 } },
            { code: '207-A', type: '1BR', size: 46.02, price: { worst: 6000, base: 6500, best: 6900 } },
            { code: '207-B', type: '1BR', size: 66.70, price: { worst: 6721, base: 7907, best: 9093 } },
            { code: '208-A', type: '1BR', size: 59.58, price: { worst: 6003, base: 7063, best: 8122 } },
            { code: '208-B', type: '1BR', size: 83.35, price: { worst: 8398, base: 9880, best: 11362 } },
            { code: '209-A', type: '1BR', size: 55.17, price: { worst: 6000, base: 6540, best: 7521 } },
            { code: '209-B', type: '1BR', size: 71.35, price: { worst: 7189, base: 8458, best: 9727 } },
            { code: '210-A', type: 'Studio', size: 27.99, price: { worst: 3800, base: 4100, best: 4500 } },
            { code: '210-B', type: '1BR', size: 61.01, price: { worst: 6147, base: 7232, best: 8317 } },
            { code: '211-A', type: '1BR', size: 42.02, price: { worst: 6000, base: 6500, best: 7000 } },
            { code: '211-B', type: '1BR', size: 64.27, price: { worst: 6476, base: 7619, best: 8761 } },
            { code: '212-A', type: '1BR', size: 56.08, price: { worst: 6000, base: 6648, best: 7645 } },
            { code: '212-B', type: '1BR', size: 77.67, price: { worst: 7826, base: 9207, best: 10588 } },
            { code: '213', type: '2BR', size: 92.45, price: { worst: 9315, base: 10959, best: 12603 } },
            { code: '214', type: '2BR', size: 109.1, price: { worst: 10993, base: 12933, best: 14873 } }
        ]
    }
  }
];

export const MARKETING_VIDEOS: MarketingVideo[] = [
    {
        id: 'v1',
        title: 'Community Overview',
        thumbnailUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
        videoUrl: 'https://drive.google.com/file/d/1u6i_7MN74iogQP0qwdS9o2GYOHtWTZA4/view?usp=sharing',
    },
    {
        id: 'v2',
        title: 'Interior Walkthrough',
        thumbnailUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
        videoUrl: 'https://drive.google.com/file/d/1dO3W-8IX8JultVN768H1hyxVVmxC4F2I/view?usp=sharing',
    }
];

export const COMPARISON_LINKS: Record<string, ComparisonLink[]> = {
  safa_taawun: [
    {
        title: "3BR Apartment - Al Ta'awun",
        platform: "Bayut",
        url: "#",
        location: "Al Ta'awun",
        type: "3BR",
        price: 13500,
        period: "/mo"
    },
    {
        title: "1BR Split Unit - Market Avg",
        platform: "Aqar",
        url: "#",
        location: "Al Ta'awun",
        type: "1BR",
        price: 6500,
        period: "/mo"
    }
  ]
};

export const BRANCHES: Branch[] = [];
