import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DiaryEntry, Weather, Visibility } from './types';
import { getAllDiaries, createDiary } from './services/diaries';

const App: React.FC = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState({
    date: '',
    weather: '' as Weather,
    visibility: '' as Visibility,
    comment: ''
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries()
      .then(data => setDiaries(data))
      .catch(error => console.error(error));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewDiary({ ...newDiary, [name]: value });
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewDiary({ ...newDiary, [name]: value as Weather | Visibility });
  };

  const addDiary = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createDiary(newDiary)
      .then(addedDiary => {
        setDiaries(diaries.concat(addedDiary));
        setNewDiary({ date: '', weather: '' as Weather, visibility: '' as Visibility, comment: '' });
        setError(null);
      })
      .catch(error => {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data.error);
        } else {
          setError('An error occurred while adding the diary entry.');
        }
      });
  };

  return (
    <div>
      <h1>Flight Diaries</h1>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <form onSubmit={addDiary}>
        <div>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={newDiary.date}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>Weather:</label>
          {['sunny', 'rainy', 'cloudy', 'stormy', 'windy'].map(weather => (
            <label key={weather}>
              <input
                type="radio"
                name="weather"
                value={weather}
                checked={newDiary.weather === weather}
                onChange={handleRadioChange}
              />
              {weather}
            </label>
          ))}
        </div>
        <div>
          <label>Visibility:</label>
          {['great', 'good', 'ok', 'poor'].map(visibility => (
            <label key={visibility}>
              <input
                type="radio"
                name="visibility"
                value={visibility}
                checked={newDiary.visibility === visibility}
                onChange={handleRadioChange}
              />
              {visibility}
            </label>
          ))}
        </div>
        <div>
          <label>
            Comment:
            <input
              type="text"
              name="comment"
              value={newDiary.comment}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">add</button>
      </form>

      <ul>
        {diaries.map(diary => (
          <li key={diary.id}>
            <p>Date: {diary.date}</p>
            <p>Weather: {diary.weather}</p>
            <p>Visibility: {diary.visibility}</p>
            {diary.comment && <p>Comment: {diary.comment}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
