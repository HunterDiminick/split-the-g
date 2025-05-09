// Read API key from environment variables instead of hardcoding
const IPAPI_KEY = process.env.IPAPI_KEY;

type LocationData = {
  city: string | null;
  region: string | null;
  country: string | null;
  country_code: string | null;
};

export async function getLocationData(ipAddress?: string): Promise<LocationData> {
  try {
    // Check if API key is available
    if (!IPAPI_KEY) {
      console.warn('IPAPI_KEY not found in environment variables');
      return { city: null, region: null, country: null, country_code: null };
    }
    
    // Use the provided IP address or let ipapi.co determine it
    const apiUrl = ipAddress 
      ? `https://ipapi.co/${ipAddress}/json/?key=${IPAPI_KEY}`
      : `https://ipapi.co/json/?key=${IPAPI_KEY}`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      console.error('Failed to fetch location data:', response.statusText);
      return { city: null, region: null, country: null, country_code: null };
    }
    
    const data = await response.json();
    
    return {
      city: data.city || null,
      region: data.region || null,
      country: data.country_name || null,
      country_code: data.country_code || null
    };
  } catch (error) {
    console.error('Error fetching location data:', error);
    return { city: null, region: null, country: null, country_code: null };
  }
} 