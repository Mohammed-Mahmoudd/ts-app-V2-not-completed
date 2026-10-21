import apiClient from './client';
import { API_ENDPOINTS } from '../../config/api.config';
import { Instrument, CreateInstrumentRequest } from '../../types/api.types';

// Instrument Service
export const instrumentService = {
  /**
   * Get all instruments
   */
  async getInstruments(): Promise<Instrument[]> {
    const response = await apiClient.get<Instrument[]>(
      API_ENDPOINTS.INSTRUMENTS.GET_ALL
    );
    return response.data;
  },

  /**
   * Create a new instrument (Admin only)
   */
  async createInstrument(
    instrumentData: CreateInstrumentRequest
  ): Promise<Instrument> {
    const response = await apiClient.post<Instrument>(
      API_ENDPOINTS.INSTRUMENTS.CREATE,
      instrumentData
    );
    return response.data;
  },

  /**
   * Delete an instrument (Admin only)
   */
  async deleteInstrument(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.INSTRUMENTS.DELETE(id));
  },
};
