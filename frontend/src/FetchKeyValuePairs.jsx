import React, { useState } from 'react';

export default function FetchKeyValuePairs() {
  const [imageIndex, setImageIndex] = useState('')
  const [key, setKey] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async () => {
    if (!imageIndex || !key) {
        setError('Both number and key are required.');
        return;
        }
    try {
      const response = await fetch(`/api/getKeyValues?image_index=${imageIndex}&key=${key}`);
      if (!response.ok) {
        throw new Error('Image ID or key not found');
      }
      const data = await response.json();
      setResult(data[key]);
      setError('');
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div className='quickSearch'>
    {/* <Navbar.Brand href="#">Quick Lookup</Navbar.Brand> */}
      <input
        className='numInputBox'
        type="number"
        placeholder="Enter 1 - 5"
        value={imageIndex}
        onChange={(e) => setImageIndex(e.target.value)}
      />
      <input
        className='fieldInputBox'
        type="text"
        placeholder="Enter field (i.e. altitude_m, timestamp)"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <button className='quickLookerSubmitBtn' onClick={fetchData}><i className="bi bi-search"></i> Quick Submit</button>
      {result && <p>Result: {result}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </div>
  );
};
