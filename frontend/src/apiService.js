// apiService.js
const API_BASE_URL = 'http://localhost:5000';

async function makePromptRequest(endpoint, model, promptValue, temperature ) {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model, prompt: promptValue, temperature: temperature })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  return response.text();
}

export async function fetchPromptModel(model, promptValue, temperature = 0.5) {
  return makePromptRequest('prompt_model', model, promptValue, temperature);
}

export async function fetchModels() {
  const response = await fetch(`${API_BASE_URL}/models`);
  if (!response.ok) {
    throw new Error('Failed to fetch models');
  }
  return response.json();
}
