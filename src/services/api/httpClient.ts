// HTTP client for real API calls
import getApiConfig from './config';

export interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  message?: string;
  error?: string;
  statusCode?: number;
  timestamp?: string;
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
}

class HttpClient {
  private config = getApiConfig();
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...this.config.headers,
    };
  }

  private async makeRequest<T>(
    url: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = this.config.timeout,
      retries = this.config.retryAttempts || 1
    } = options;

    const requestHeaders = {
      ...this.defaultHeaders,
      ...headers
    };

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
      signal: controller.signal,
    };

    if (body && method !== 'GET') {
      requestOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    let lastError: Error | undefined;

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        console.log(`[HttpClient] ${method} ${url} (attempt ${attempt + 1}/${retries})`);
        
        const response = await fetch(url, requestOptions);
        
        const responseData = await response.json().catch(() => ({}));
        
        if (!response.ok) {
          return {
            success: false,
            data: null,
            error: responseData.message || responseData.error || `HTTP ${response.status}`,
            statusCode: response.status,
            message: responseData.message || 'Request failed'
          };
        }

        // Clear timeout on successful response
        clearTimeout(timeoutId);
        
        return {
          success: true,
          data: responseData.data || responseData,
          message: responseData.message || 'Request successful',
          statusCode: response.status,
          timestamp: new Date().toISOString()
        };

      } catch (error: any) {
        lastError = error;
        console.error(`[HttpClient] Attempt ${attempt + 1} failed:`, error);
        
        // Clear timeout on error
        clearTimeout(timeoutId);

        if (attempt < retries - 1) {
          // Wait before retry
          await new Promise(resolve => 
            setTimeout(resolve, this.config.retryDelay || 1000)
          );
        }
      }
    }

    // All retries failed
    return {
      success: false,
      data: null,
      error: lastError?.message || 'Network request failed',
      message: 'All retry attempts failed'
    };
  }

  // GET request
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    let url = `${this.config.baseUrl}${endpoint}`;
    
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      url += `?${queryString}`;
    }

    return this.makeRequest<T>(url, { method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const url = `${this.config.baseUrl}${endpoint}`;
    return this.makeRequest<T>(url, {
      method: 'POST',
      body: data
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const url = `${this.config.baseUrl}${endpoint}`;
    return this.makeRequest<T>(url, {
      method: 'PUT',
      body: data
    });
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const url = `${this.config.baseUrl}${endpoint}`;
    return this.makeRequest<T>(url, {
      method: 'PATCH',
      body: data
    });
  }

  // DELETE request
  async delete<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const url = `${this.config.baseUrl}${endpoint}`;
    // For DELETE requests that need to send data, we'll use POST with _method=DELETE
    if (data) {
      return this.makeRequest<T>(url, {
        method: 'POST',
        body: { ...data, _method: 'DELETE' }
      });
    }
    return this.makeRequest<T>(url, { method: 'DELETE' });
  }

  // Generic request method
  async request<T>(
    endpoint: string, 
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.config.baseUrl}${endpoint}`;
    return this.makeRequest<T>(url, options);
  }

  // Update configuration (useful for token changes)
  updateConfig(newHeaders: Record<string, string>) {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      ...newHeaders
    };
  }

  // Get current configuration
  getConfig() {
    return { ...this.config };
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    try {
      return await this.get('/health');
    } catch (error) {
      return {
        success: false,
        data: null,
        error: 'Health check failed',
        message: 'Unable to reach API server'
      };
    }
  }
}

// Export singleton instance
export default new HttpClient();
