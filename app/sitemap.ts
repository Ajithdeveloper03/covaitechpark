import { MetadataRoute } from 'next';

export const dynamic = "force-static";

const BASE_URL = 'https://covaitechpark.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/about-us`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/coimbatore`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/trichy`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/coworking-space-in-coimbatore`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/private-office-space`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/managed-office`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/meeting-room`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/virtual-office`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/furnished-office-space`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/event-space-in-coimbatore`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/commercial-space-for-rent`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ];

  try {
    // Fetch live blogs to automatically add them to the sitemap
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
    if (res.ok) {
      const blogs = await res.json();
      blogs.forEach((blog: any) => {
        if (blog.slug) {
          routes.push({
            url: `${BASE_URL}/blog/article?slug=${blog.slug}`,
            lastModified: new Date(blog.updated_at || blog.published_at || new Date()),
            changeFrequency: 'weekly',
            priority: 0.7,
          });
        }
      });
    }
  } catch (error) {
    console.error("Failed to fetch blogs for sitemap:", error);
  }

  return routes;
}
