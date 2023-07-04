import React, { useState } from 'react';
import './Home.css'

const TextBoxAndButton = () => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAddButtonClick = () => {
    console.log('Added:', inputText);
    // You can perform further actions with the input text here
  };

  return (
    <div>
        <h1  className='h'>css is working</h1>
      <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={handleAddButtonClick}>Add</button>
    </div>
  );
};

export default TextBoxAndButton;
