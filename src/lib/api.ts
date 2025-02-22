import { supabase } from './supabase';

interface DataBreach {
  name: string;
  date: string;
  affectedUsers: number;
  dataTypes: string[];
  description: string;
  source: string;
}

interface ScanResponse {
  breaches: DataBreach[];
  totalBreaches: number;
  exposedData: string[];
  riskLevel: 'low' | 'medium' | 'high';
  error?: string;
}

export async function scanPhoneNumber(phoneNumber: string): Promise<ScanResponse> {
  try {
    // Simulate API call with random failure
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (Math.random() < 0.1) { // 10% chance of error
      throw new Error('Service temporarily unavailable');
    }

    // Simulated response
    return {
      breaches: [
        {
          name: 'Acxiom',
          dataFound: true,
          dataTypes: ['Phone', 'Address', 'Employment'],
          optOutUrl: 'https://isapps.acxiom.com/optout/optout.aspx'
        },
        {
          name: 'Epsilon',
          dataFound: true,
          dataTypes: ['Phone', 'Shopping Habits'],
          optOutUrl: 'https://www.epsilon.com/privacy/consumer-information'
        },
        {
          name: 'Oracle Data Cloud',
          dataFound: false,
          dataTypes: [],
          optOutUrl: 'https://www.oracle.com/legal/privacy/marketing-cloud-data-cloud-privacy-policy.html'
        }
      ]
    };
  } catch (error) {
    return {
      breaches: [],
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}

export async function scanEmail(email: string): Promise<ScanResponse> {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulated breaches data
    const breaches: DataBreach[] = [
      {
        name: 'Major Social Network Breach',
        date: '2023-12-15',
        affectedUsers: 533000000,
        dataTypes: ['Email', 'Phone Numbers', 'Names', 'Location Data'],
        description: 'A significant data leak exposed user information from a major social network platform.',
        source: 'HaveIBeenPwned'
      },
      {
        name: 'E-commerce Platform Hack',
        date: '2023-08-22',
        affectedUsers: 18500000,
        dataTypes: ['Email', 'Hashed Passwords', 'Purchase History'],
        description: 'Customer data was exposed in a sophisticated cyber attack targeting a popular e-commerce platform.',
        source: 'SecurityResearcher.com'
      },
      {
        name: 'Cloud Service Provider Breach',
        date: '2023-03-10',
        affectedUsers: 42000000,
        dataTypes: ['Email', 'Names', 'IP Addresses'],
        description: 'A cloud service provider suffered a data breach exposing customer information.',
        source: 'CyberNews'
      }
    ];

    // Calculate risk level based on number of breaches and types of exposed data
    const exposedData = Array.from(new Set(breaches.flatMap(b => b.dataTypes)));
    const riskLevel = breaches.length > 2 ? 'high' : breaches.length > 0 ? 'medium' : 'low';

    return {
      breaches,
      totalBreaches: breaches.length,
      exposedData,
      riskLevel
    };
  } catch (error) {
    return {
      breaches: [],
      totalBreaches: 0,
      exposedData: [],
      riskLevel: 'low',
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}