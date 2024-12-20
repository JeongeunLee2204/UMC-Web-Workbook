// hooks/useFetch.js
import { useState, useEffect } from 'react';

function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        if (isMounted) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(error => {
        if (isMounted) {
          setError(error);
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, [url, options]);
  
  return { data, loading, error };
}

export default useFetch;
