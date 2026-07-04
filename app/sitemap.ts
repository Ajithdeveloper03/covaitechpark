import { MetadataRoute } from 'next';

export const dynamic = "force-static";

const BASE_URL = 'https://covaitechpark.com/covaitechpark';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about-us',
    '/contact',
    '/gallery',
    '/blog',
    '/coimbatore',
    '/trichy',
    '/coworking-space-in-coimbatore',
    '/private-office-space',
    '/managed-office',
    '/meeting-room',
    '/virtual-office',
    '/furnished-office-space',
    '/event-space-in-coimbatore',
    '/commercial-space-for-rent',
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'monthly' : 'weekly',
    priority: route === '' ? 1.0 : (route.includes('-office') || route.includes('-space') || route.includes('coimbatore') || route.includes('trichy')) ? 0.9 : 0.8,
  }));
}
