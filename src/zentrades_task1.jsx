import React, { useState, useEffect } from 'react';

const fetchData = async () => {
  try {
    const response = await fetch('https://s3.amazonaws.com/open-to-cors/assignment.json');
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const Table1 = () => {
  const [data, setData] = useState([]);
  const [displayOptions, setDisplayOptions] = useState(['subcategory', 'title', 'price', 'popularity']);

  useEffect(() => {
    fetchData().then((result) => {
      const dataObject = typeof result === 'object' ? result : {};
      const dataArray = Object.entries(dataObject).map(([id, product]) => ({ id, ...product }));
      const sortedData = dataArray.sort((a, b) => b.popularity - a.popularity);
      setData(sortedData);
    });
  }, []);

  return (
    <div>
      <h2>Product Table</h2>
      
        
    
      <table>
        <thead>
          <tr>
            {displayOptions.map((field) => (
              <th key={field}>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product.id}>
              {displayOptions.map((field) => (
                <td key={field}>{product[field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table1;
