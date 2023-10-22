import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './index.css'

const TrelloCardForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Replace 'apiKey' and 'token' with your actual Trello API credentials.
    const apiKey = '0edc1051eec52c8b994edcd863f0e298';
    const token = 'ATTA97cba332be084ea57b5b5505f0d6951257f0d854479154c9606cd29eefdfb599AFAF40FA';

    const cardData = {
      name,
      desc: description,
      due: dueDate.toISOString(),
      idList: '6532b6a4d1a06e16a8d1d28c' // Replace with the Trello list ID where you want to create the card.
    };

    try {
    const response = await axios.post(
        `https://api.trello.com/1/cards?idList=6532b6a4d1a06e16a8d1d28c&key=${apiKey}&token=${token}`, cardData
      );
      console.log('Card created:', response.data);

    } catch (error) {
      console.error('Error creating Trello card:', error);
    }
  };

  return (
    <div className='Container'>
      <h2 className='heading'>Create a Trello Card</h2>
      <form onSubmit={handleFormSubmit} className='formContainer'>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className='description'>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Due Date:</label>
          <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
        </div>
        <div>
          <label>Start Date:</label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
        <button type="submit">Create Card</button>
      </form>
    </div>
  );
};

export default TrelloCardForm;
