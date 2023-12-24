// Table.js

import React, { useState, useEffect } from 'react';
import './Table.css'; // Import the CSS file

const Table = () => {
  const [data, setData] = useState([]);
  const [displayOptions, setDisplayOptions] = useState([]);
  const [availableFields, setAvailableFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('json'); // Default file type is JSON
  const [characterEncoding, setCharacterEncoding] = useState('utf-8'); // Default character encoding
  const [delimiter, setDelimiter] = useState(','); // Default delimiter for CSV
  const [error, setError] = useState(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const fileContent = e.target.result;
          const isJSON = file.type === 'application/json';
  
          if (isJSON) {
            // JSON parsing logic
            const jsonData = JSON.parse(fileContent);
  
            if (jsonData && jsonData.count && jsonData.products) {
              const productsArray = Object.values(jsonData.products);
  
              if (Array.isArray(productsArray) && productsArray.length > 0) {
                const fields = Object.keys(productsArray[0]);
  
                setAvailableFields(fields);
                setDisplayOptions([]);
                setSelectedFields([]);
  
                const sortedData = productsArray.sort((a, b) => b.popularity - a.popularity);
                setData(sortedData);
              } else {
                setError('Invalid JSON file format or empty products array.');
              }
            } else {
              setError('Invalid JSON file format. Missing "count" or "products" property.');
            }
          } else {
            // CSV parsing logic
            const parsedData = parseCSV(fileContent);
  
            if (parsedData.length > 0) {
              const fields = Object.keys(parsedData[0]);
              setAvailableFields(fields);
              setDisplayOptions([]);
              setSelectedFields([]);
              setData(parsedData);
            } else {
              setError('Invalid CSV file format or empty data.');
            }
          }
        } catch (error) {
          setError('Error parsing file. Please check the file format.');
        }
      };
  
      // Read the file as text
      reader.readAsText(file);
    }
  }, [file]);
  
  const handleMoveToDisplay = () => {
    setDisplayOptions([...displayOptions, ...selectedFields]);
    setAvailableFields(availableFields.filter((field) => !selectedFields.includes(field)));
    setSelectedFields([]);
  };

  const handleMoveToAvailable = () => {
    setAvailableFields([...availableFields, ...displayOptions, ...selectedFields]);
    setDisplayOptions([]);
    setSelectedFields([]);
  };

  const parseCSV = (data) => {
    const [header, ...rows] = data.split('\n').map((line) => line.split('\t'));
    return rows.map((row) => {
      return header.reduce((acc, field, index) => {
        acc[field.trim()] = row[index].trim();
        return acc;
      }, {});
    });
  };

  return (
    <div className="table-container">
      <div className="file-options">
        <label>Choose File:</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} accept={`.${fileType}`} />
        <div>
          <label>File Type:</label>
          <select value={fileType} onChange={(e) => setFileType(e.target.value)}>
            <option value="json">JSON</option>
            {/* <option value="csv">CSV</option> */}
          </select>
        </div>
        {fileType === 'csv' && (
          <div>
            <label>Character Encoding:</label>
            <select value={characterEncoding} onChange={(e) => setCharacterEncoding(e.target.value)}>
              <option value="utf-8">UTF-8</option>
              
            </select>
            <label>Delimiter:</label>
            <input type="text" value={delimiter} onChange={(e) => setDelimiter(e.target.value)} />
          </div>
        )}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {availableFields.length > 0 && (
        <div className="available-table">
          <label>Available Fields:</label>
          <select
            multiple
            value={selectedFields}
            onChange={(e) => setSelectedFields(Array.from(e.target.selectedOptions).map((option) => option.value))}
          >
            {availableFields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>
      )}

      {availableFields.length > 0 && (
        <div className="button-container">
          <button onClick={handleMoveToDisplay}>&gt;&gt;</button>
          <button onClick={handleMoveToAvailable}>&lt;&lt;</button>
        </div>
      )}

      {availableFields.length > 0 && (
        <div className="displayed-table">
          <label>Fields to be Displayed:</label>
          <select
            multiple
            value={displayOptions}
            onChange={(e) => setDisplayOptions(Array.from(e.target.selectedOptions).map((option) => option.value))}
          >
            {displayOptions.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>
      )}

      <table>
        <thead>
          <tr>
            {displayOptions.map((field) => (
              <th key={field}>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => (
            <tr key={index}>
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

export default Table;
