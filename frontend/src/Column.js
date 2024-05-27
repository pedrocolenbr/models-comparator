// Column.js
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function Column({ id, responseData, error, isLoading, modelList }) {
  const [selectedOption, setSelectedOption] = useState(modelList[0]);
  const [temperature, setTemperature] = useState(0.5);

  let responseTime = null;
  let responseContent = null;

  if (responseData && Object.keys(responseData).length !== 0) {
    responseContent = responseData.response;
    const response_time = responseData.response_time;
    const roundedResponseTime = Math.ceil(response_time * 100) / 100; // Round up to 2 decimal numbers
    responseTime = roundedResponseTime.toFixed(2);
  }

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
  };

  return (
    <div id={id} className="col border border-light-subtle p-0 mx-1" style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
      <select className="form-select form-select-sm bg-secondary" value={selectedOption} onChange={handleSelectChange} disabled={isLoading}>
        {modelList.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      
      <div className="px-2 mt-2 d-flex align-items-center justify-content-between">
        <label for={`temperature-slider-${id}`} className="me-2" style={{ fontSize: '0.8rem' }}>Temperature: <strong>{temperature}</strong></label>
        <input id={`temperature-slider-${id}`} type="range" min="0" max="1" step="0.1" className="form-range" style={{ width: '70%' }} value={temperature} onChange={handleTemperatureChange} disabled={isLoading} />
      </div>

      {isLoading ? (
        <div className="p-2">
          <p>Loading...</p>
        </div>
      ) : (
        <>
        {responseData && Object.keys(responseData).length !== 0 && (
          <>
            {error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : (
              <>
                <div className="px-2 pt-2" style={{ paddingBottom: '80px' }}>
                  <p style={{ fontSize: '0.7rem' }} className="mb-2 fst-italic">Response Time: {responseTime} seconds</p>
                  <p style={{ fontSize: '0.9rem' }}>
                    <ReactMarkdown>{responseContent}</ReactMarkdown>
                  </p>
                </div>
              </>
            )}
          </>
        )}
        </>
      )}
    </div>
  );
}

export default Column;
