import React, { useState } from 'react';

import { Line } from 'react-chartjs-2';
import useAppStore from '../../store/appStore';

const CustomQueryView: React.FC = () => {
  const [customQuery, setCustomQuery] = useState<string>('');
  const setData = useAppStore(state => state.setCustomQueryResults);
  const customQueryData = useAppStore(state => state.customQueryData);

  const handleSubmit = async () => {
    try {
      const response = await fetch('/server-endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: customQuery })
      });

      const result = await response.json();
      setData(result.data); // assuming 'data' is the field in response
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <textarea 
        value={customQuery}
        onChange={(e) => setCustomQuery(e.target.value)}
        placeholder="Enter your custom query here"
      />
      <button onClick={handleSubmit}>Submit Query</button>

      {/* <Line data={customQueryData} /> */}
    </>
  );
}

export default CustomQueryView;
