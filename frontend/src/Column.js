// Column.js
import React, { useState } from 'react';

function Column({ id, responseData, error, isLoading, modelList }) {
  const [selectedOption, setSelectedOption] = useState(modelList[0]);

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

  return (
    <div id={id} className="col border border-light-subtle p-0 mx-1" style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
      <select className="form-select form-select-sm bg-secondary" value={selectedOption} onChange={handleSelectChange} disabled={isLoading}>
        {modelList.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
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
                  <p style={{ fontSize: '0.9rem' }}>{responseContent}</p>
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
