import { useEffect, useState } from "react";

export const useRSSFeed = (rssUrl: string) => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRSS = async () => {
      if (!rssUrl) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Use your Next.js API route instead of external proxies
        const apiUrl = `/api/rss?url=${encodeURIComponent(rssUrl)}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (!result.success || !result.content) {
          throw new Error('Invalid response from RSS API');
        }
        
        console.log('RSS Feed fetched successfully via API route');
        setData(result.content);
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error('RSS Feed fetch error:', errorMessage);
        setError(errorMessage);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRSS();
  }, [rssUrl]);

  return { data, loading, error };
};