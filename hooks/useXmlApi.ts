import { useEffect, useState } from "react";

export const useRSSFeed = (rssUrl) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchRSS = async () => {
      try {
        setLoading(true);
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const response = await fetch(proxyUrl + encodeURIComponent(rssUrl));
        const result = await response.json();
        
        setData(result.contents);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    
    if (rssUrl) {
      fetchRSS();
    }
  }, [rssUrl]);
  
  return { data, loading, error };
};

