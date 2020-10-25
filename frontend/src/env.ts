import { environment } from './environments/environment';

export const PORT = process.env.PORT || environment.port;
export const GOOGLE_MAP_API_KEY = process.env.GOOGLE_MAP_API_KEY || environment.googleMapApiKey;
export const API_URL = process.env.API_URL || environment.apiUrl;
export const SITE_DOMAIN = process.env.SITE_DOMAIN || environment.siteDomain;
