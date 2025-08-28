// Main API service that handles switching between mock and real APIs
import getApiConfig, { ENDPOINT_MAPPING } from './config';
import type { EndpointKey } from './config';
import { MockApiService } from './mockService';
import type { MockApiResponse } from './mockService';
import httpClient from './httpClient';
import type { ApiResponse } from './httpClient';

export interface ApiServiceResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  mode?: 'mock' | 'local' | 'aws';
  timestamp?: string;
}

class ApiService {
  private config = getApiConfig();

  constructor() {
    console.log(`[ApiService] Initialized in ${this.config.mode} mode`);
    console.log(`[ApiService] Base URL: ${this.config.baseUrl}`);
  }

  // Convert mock response to standard API response format
  private formatMockResponse<T>(mockResponse: MockApiResponse<T>): ApiServiceResponse<T> {
    return {
      success: mockResponse.success,
      data: mockResponse.data,
      message: mockResponse.message,
      mode: 'mock',
      timestamp: mockResponse.timestamp
    };
  }

  // Convert HTTP response to standard API response format
  private formatHttpResponse<T>(httpResponse: ApiResponse<T>): ApiServiceResponse<T> {
    return {
      success: httpResponse.success,
      data: httpResponse.data,
      message: httpResponse.message,
      error: httpResponse.error,
      mode: this.config.mode as 'local' | 'aws',
      timestamp: httpResponse.timestamp
    };
  }

  // Get endpoint URL for menu item
  private getEndpointForMenuItem(menuItem: string): string {
    const endpointKey = ENDPOINT_MAPPING[menuItem as EndpointKey];
    if (!endpointKey) {
      throw new Error(`No endpoint mapping found for menu item: ${menuItem}`);
    }
    return this.config.endpoints[endpointKey];
  }

  // Get endpoint name for mock service
  private getEndpointNameForMenuItem(menuItem: string): string {
    return ENDPOINT_MAPPING[menuItem as EndpointKey] || menuItem.toLowerCase().replace(/\s+/g, '');
  }

  // CRUD Operations for Admin Panel

  // Get all data for a menu item
  async getData(menuItem: string): Promise<ApiServiceResponse> {
    try {
      if (this.config.mode === 'mock') {
        const endpointName = this.getEndpointNameForMenuItem(menuItem);
        const response = await MockApiService.getData(endpointName);
        return this.formatMockResponse(response);
      } else {
        const endpoint = this.getEndpointForMenuItem(menuItem);
        const response = await httpClient.get(endpoint);
        return this.formatHttpResponse(response);
      }
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message,
        message: `Failed to fetch ${menuItem}`,
        mode: this.config.mode
      };
    }
  }

  // Get single item by ID
  async getById(menuItem: string, id: string): Promise<ApiServiceResponse> {
    try {
      if (this.config.mode === 'mock') {
        const endpointName = this.getEndpointNameForMenuItem(menuItem);
        const response = await MockApiService.getById(endpointName, id);
        return this.formatMockResponse(response);
      } else {
        const endpoint = this.getEndpointForMenuItem(menuItem);
        const response = await httpClient.get(`${endpoint}/${id}`);
        return this.formatHttpResponse(response);
      }
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message,
        message: `Failed to fetch ${menuItem} with ID ${id}`,
        mode: this.config.mode
      };
    }
  }

  // Create new item
  async create(menuItem: string, data: any): Promise<ApiServiceResponse> {
    try {
      if (this.config.mode === 'mock') {
        const endpointName = this.getEndpointNameForMenuItem(menuItem);
        const response = await MockApiService.create(endpointName, data);
        return this.formatMockResponse(response);
      } else {
        const endpoint = this.getEndpointForMenuItem(menuItem);
        const response = await httpClient.post(endpoint, data);
        return this.formatHttpResponse(response);
      }
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message,
        message: `Failed to create ${menuItem}`,
        mode: this.config.mode
      };
    }
  }

  // Update existing item
  async update(menuItem: string, id: string, data: any): Promise<ApiServiceResponse> {
    try {
      if (this.config.mode === 'mock') {
        const endpointName = this.getEndpointNameForMenuItem(menuItem);
        const response = await MockApiService.update(endpointName, id, data);
        return this.formatMockResponse(response);
      } else {
        const endpoint = this.getEndpointForMenuItem(menuItem);
        const response = await httpClient.put(`${endpoint}/${id}`, data);
        return this.formatHttpResponse(response);
      }
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message,
        message: `Failed to update ${menuItem}`,
        mode: this.config.mode
      };
    }
  }

  // Delete item
  async delete(menuItem: string, id: string): Promise<ApiServiceResponse> {
    try {
      if (this.config.mode === 'mock') {
        const endpointName = this.getEndpointNameForMenuItem(menuItem);
        const response = await MockApiService.delete(endpointName, id);
        return this.formatMockResponse(response);
      } else {
        const endpoint = this.getEndpointForMenuItem(menuItem);
        const response = await httpClient.delete(`${endpoint}/${id}`);
        return this.formatHttpResponse(response);
      }
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message,
        message: `Failed to delete ${menuItem}`,
        mode: this.config.mode
      };
    }
  }

  // Search items
  async search(menuItem: string, query: string, field?: string): Promise<ApiServiceResponse> {
    try {
      if (this.config.mode === 'mock') {
        const endpointName = this.getEndpointNameForMenuItem(menuItem);
        const response = await MockApiService.search(endpointName, query, field);
        return this.formatMockResponse(response);
      } else {
        const endpoint = this.getEndpointForMenuItem(menuItem);
        const params: Record<string, string> = { q: query };
        if (field) params.field = field;
        const response = await httpClient.get(`${endpoint}/search`, params);
        return this.formatHttpResponse(response);
      }
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message,
        message: `Failed to search ${menuItem}`,
        mode: this.config.mode
      };
    }
  }

  // Bulk operations
  async bulkCreate(menuItem: string, items: any[]): Promise<ApiServiceResponse> {
    try {
      if (this.config.mode === 'mock') {
        const endpointName = this.getEndpointNameForMenuItem(menuItem);
        const response = await MockApiService.bulkCreate(endpointName, items);
        return this.formatMockResponse(response);
      } else {
        const endpoint = this.getEndpointForMenuItem(menuItem);
        const response = await httpClient.post(`${endpoint}/bulk`, { items });
        return this.formatHttpResponse(response);
      }
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message,
        message: `Failed to bulk create ${menuItem}`,
        mode: this.config.mode
      };
    }
  }

  async bulkUpdate(menuItem: string, updates: Array<{id: string, data: any}>): Promise<ApiServiceResponse> {
    try {
      if (this.config.mode === 'mock') {
        const endpointName = this.getEndpointNameForMenuItem(menuItem);
        const response = await MockApiService.bulkUpdate(endpointName, updates);
        return this.formatMockResponse(response);
      } else {
        const endpoint = this.getEndpointForMenuItem(menuItem);
        const response = await httpClient.put(`${endpoint}/bulk`, { updates });
        return this.formatHttpResponse(response);
      }
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message,
        message: `Failed to bulk update ${menuItem}`,
        mode: this.config.mode
      };
    }
  }

  async bulkDelete(menuItem: string, ids: string[]): Promise<ApiServiceResponse> {
    try {
      if (this.config.mode === 'mock') {
        const endpointName = this.getEndpointNameForMenuItem(menuItem);
        const response = await MockApiService.bulkDelete(endpointName, ids);
        return this.formatMockResponse(response);
      } else {
        const endpoint = this.getEndpointForMenuItem(menuItem);
        const response = await httpClient.delete(`${endpoint}/bulk`, { ids });
        return this.formatHttpResponse(response);
      }
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message,
        message: `Failed to bulk delete ${menuItem}`,
        mode: this.config.mode
      };
    }
  }

  // Dashboard Data APIs (for main dashboard view)
  async getReleases(): Promise<ApiServiceResponse> {
    try {
      if (this.config.mode === 'mock') {
        const response = await MockApiService.getData('releases');
        return this.formatMockResponse(response);
      } else {
        const response = await httpClient.get(this.config.endpoints.releases);
        return this.formatHttpResponse(response);
      }
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message,
        message: 'Failed to fetch releases',
        mode: this.config.mode
      };
    }
  }

  async getOverview(): Promise<ApiServiceResponse> {
    try {
      if (this.config.mode === 'mock') {
        const response = await MockApiService.getData('overview');
        return this.formatMockResponse(response);
      } else {
        const response = await httpClient.get(this.config.endpoints.overview);
        return this.formatHttpResponse(response);
      }
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message,
        message: 'Failed to fetch overview',
        mode: this.config.mode
      };
    }
  }

  async getApplicationPipelines(): Promise<ApiServiceResponse> {
    try {
      if (this.config.mode === 'mock') {
        const response = await MockApiService.getData('applicationPipelines');
        return this.formatMockResponse(response);
      } else {
        const response = await httpClient.get(this.config.endpoints.applicationPipelines);
        return this.formatHttpResponse(response);
      }
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message,
        message: 'Failed to fetch application pipelines',
        mode: this.config.mode
      };
    }
  }

  // Utility methods
  getMode(): 'mock' | 'local' | 'aws' {
    return this.config.mode;
  }

  getBaseUrl(): string {
    return this.config.baseUrl;
  }

  async healthCheck(): Promise<ApiServiceResponse> {
    try {
      if (this.config.mode === 'mock') {
        return {
          success: true,
          data: { status: 'healthy', mode: 'mock' },
          message: 'Mock API is healthy',
          mode: 'mock',
          timestamp: new Date().toISOString()
        };
      } else {
        const response = await httpClient.healthCheck();
        return this.formatHttpResponse(response);
      }
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message,
        message: 'Health check failed',
        mode: this.config.mode
      };
    }
  }
}

// Export singleton instance
export default new ApiService();
