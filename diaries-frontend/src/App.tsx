import React, { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import { getAllDiaries, createDiary } from './services/diaries';
import axios from 'axios';

const App: React.FC = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState({
    date: '',
    weather: '',
    visibility: '',
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

  const addDiary = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createDiary(newDiary)
      .then(addedDiary => {
        setDiaries(diaries.concat(addedDiary));
        setNewDiary({ date: '', weather: '', visibility: '', comment: '' });
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
              type="text"
              name="date"
              value={newDiary.date}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Visibility:
            <input
              type="text"
              name="visibility"
              value={newDiary.visibility}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Weather:
            <input
              type="text"
              name="weather"
              value={newDiary.weather}
              onChange={handleChange}
            />
          </label>
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
        <button type="submit">Add Diary</button>
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
