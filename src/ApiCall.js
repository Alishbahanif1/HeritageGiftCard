import { useEffect, useState } from 'react';
import axios from 'axios';

function ApiCall(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!url) {
      return;
    }
   

    setLoading(true);  
    setError(null);

    axios.get(url)
      .then((response) => {
        if (!response.data || response.data.length === 0) {
          setError('No data found for the given card number.');}
        setData(response.data); 
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });

    }, [url]);

  return { data, loading, error };
}

export default ApiCall;
