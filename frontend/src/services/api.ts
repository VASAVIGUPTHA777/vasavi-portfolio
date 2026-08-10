import type { ApiResponse, PortfolioData, ContactMessageData } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchPortfolio = async (): Promise<PortfolioData> => {
  const response = await fetch(`${API_BASE_URL}/portfolio`);
  if (!response.ok) {
    throw new Error('Failed to fetch portfolio data');
  }
  const result: ApiResponse<PortfolioData> = await response.json();
  if (!result.success) {
    throw new Error(result.message || 'Error fetching portfolio');
  }
  return result.data;
};

export const submitContactMessage = async (data: ContactMessageData): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  const result: ApiResponse<any> = await response.json();
  
  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Failed to submit contact message');
  }
};
