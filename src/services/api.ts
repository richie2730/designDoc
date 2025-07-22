import axios from 'axios';
import { RepoAnalysisRequest, AnalysisResult } from '../types';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeRepository = async (request: RepoAnalysisRequest): Promise<AnalysisResult> => {
  const response = await api.post('/analyze', request);
  return response.data;
};

export const getAnalyzedDocuments = async (): Promise<AnalysisResult[]> => {
  const response = await api.get('/documents');
  return response.data;
};

export const getDocumentById = async (id: string): Promise<AnalysisResult> => {
  const response = await api.get(`/documents/${id}`);
  return response.data;
};