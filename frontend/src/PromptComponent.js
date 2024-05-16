// PromptComponent.js
import React from 'react';

function PromptComponent({ value, onChange, onClick, isLoading }) {
  return (
    <div className="prompt-container">
      <div class="input-group">
        <textarea
          className="form-control"
          style={{ height: '80px' }}
          placeholder="Enter text here..."
          value={value}
          onChange={onChange}
          disabled={isLoading}
        ></textarea>

        <button
          className="btn btn-primary"
          onClick={onClick}
          disabled={isLoading}
        >
          <i className="bi bi-send"></i>
        </button>
      </div>
    </div>
  );
}

export default PromptComponent;
