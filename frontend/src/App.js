import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Column from './Column';
import PromptComponent from './PromptComponent';
import { fetchModels, fetchPromptModel } from './apiService';

function App() {
  const numberOfColumns = 3;
  const [textareaValue, setTextareaValue] = useState('who is taylor swift?');
  const [isLoading, setIsLoading] = useState(Array(numberOfColumns).fill(false));
  const [modelList, setModelList] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [errorData, setErrorData] = useState([]);

  useEffect(() => {
    // Fetch the list of models when the app is loaded
    fetchModels()
      .then(data => setModelList(data.models))
      .catch(error => console.error('Error fetching models:', error));
  }, []);

  const handleClick = async () => {
    const promptValue = textareaValue.trim();

    if (promptValue) {
      setIsLoading(Array(numberOfColumns).fill(true));

      try {
        // Iterate through all elements with id pattern "column-"
        const columns = document.querySelectorAll('[id^="column-"]');
        columns.forEach(async (column, index) => {
          const selectedModel = column.querySelector('select')?.value;
          // Make request for each selected model
          if (selectedModel) {
            try {
              const response = await fetchPromptModel(selectedModel, promptValue);
              const responseJson = JSON.parse(response);
              setResponseData(prevData => {
                const newData = [...prevData];
                newData[index] = responseJson;
                return newData;
              });
              setIsLoading(prevData => {
                const newData = [...prevData];
                newData[index] = false;
                return newData;
              });
            } catch (error) {
              console.error('Error:', error);
              setErrorData(prevData => {
                const newData = [...prevData];
                newData[index] = error.message;
                return newData;
              });
              setIsLoading(prevData => {
                const newData = [...prevData];
                newData[index] = false;
                return newData;
              });
            }
          }
        });

      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="container vh-100 py-3 d-flex">
      <div className="row flex-fill justify-content-center">
        <div className="row">
          <Column key='column-1' id='column-1' responseData={responseData[0]} error={errorData[0]} isLoading={isLoading[0]} modelList={modelList} />
          <Column key='column-2' id='column-2' responseData={responseData[1]} error={errorData[1]} isLoading={isLoading[1]} modelList={modelList} />
          <Column key='column-3' id='column-3' responseData={responseData[2]} error={errorData[2]} isLoading={isLoading[2]} modelList={modelList} />
        </div>
      </div>
      <PromptComponent
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
          onClick={handleClick}
          isLoading={isLoading.some(value => value === true)}
        />
    </div>
  );
}

export default App;
