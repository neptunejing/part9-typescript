import axios from 'axios';
import { DiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

export const createDiary = async (newDiary: Omit<DiaryEntry, 'id'>) => {
  const response = await axios.post<DiaryEntry>(baseUrl, newDiary);
  return response.data;
};
