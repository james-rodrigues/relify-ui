// Mock service for simulating API calls in mock mode
import releaseGovernanceActivitiesData from '../../mockData/releaseGovernanceActivities.json';
import releaseActivitiesCategoriesData from '../../mockData/releaseActivitiesCategories.json';
import releaseActivitiesData from '../../mockData/releaseActivities.json';
import releaseScheduleData from '../../mockData/releaseSchedule.json';
import pointOfContactsData from '../../mockData/pointOfContacts.json';
import releaseActivityOwnersData from '../../mockData/releaseActivityOwners.json';
import applicationsData from '../../mockData/applications.json';
import releasesData from '../../mockData/releasesData.json';
import applicationPipelinesData from '../../mockData/applicationPipelinesData.json';
import evidenceData from '../../mockData/evidenceData.json';
import implementationPlanData from '../../mockData/implementationPlanData.json';
import jiraIntegrationData from '../../mockData/jiraIntegrationData.json';
import overviewData from '../../mockData/overviewData.json';
import releaseScopeData from '../../mockData/releaseScopeData.json';

export interface MockApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

// Mock data storage
const mockDataStore: Record<string, any> = {
  releaseGovernanceActivities: releaseGovernanceActivitiesData,
  releaseActivitiesCategories: releaseActivitiesCategoriesData,
  releaseActivities: releaseActivitiesData,
  releaseSchedule: releaseScheduleData,
  releaseActivityOwners: releaseActivityOwnersData,
  pointOfContacts: pointOfContactsData,
  applications: applicationsData,
  releases: releasesData,
  applicationPipelines: applicationPipelinesData,
  evidence: evidenceData,
  implementationPlan: implementationPlanData,
  jiraIntegration: jiraIntegrationData,
  overview: overviewData,
  releaseScope: releaseScopeData
};

// Simulate network delay
const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Generate mock response
const createMockResponse = <T>(data: T, message?: string): MockApiResponse<T> => ({
  success: true,
  data,
  message,
  timestamp: new Date().toISOString()
});

// Mock error response
const createMockErrorResponse = (message: string): MockApiResponse => ({
  success: false,
  data: null,
  message,
  timestamp: new Date().toISOString()
});

export class MockApiService {
  // Get all data for a specific endpoint
  static async getData(endpoint: string): Promise<MockApiResponse> {
    await delay(Math.random() * 500 + 200); // 200-700ms delay
    
    if (!mockDataStore[endpoint]) {
      return createMockErrorResponse(`Endpoint '${endpoint}' not found`);
    }
    
    return createMockResponse(mockDataStore[endpoint], 'Data retrieved successfully');
  }

  // Get single item by ID
  static async getById(endpoint: string, id: string): Promise<MockApiResponse> {
    await delay(Math.random() * 300 + 100);
    
    if (!mockDataStore[endpoint]) {
      return createMockErrorResponse(`Endpoint '${endpoint}' not found`);
    }
    
    const data = mockDataStore[endpoint];
    
    // Handle array data
    if (Array.isArray(data)) {
      const item = data.find((item: any) => item.id === id);
      if (!item) {
        return createMockErrorResponse(`Item with ID '${id}' not found`);
      }
      return createMockResponse(item, 'Item retrieved successfully');
    }
    
    // Handle object data - return the whole object if it has the matching id
    if (data && typeof data === 'object' && data.id === id) {
      return createMockResponse(data, 'Item retrieved successfully');
    }
    
    return createMockErrorResponse(`Item with ID '${id}' not found`);
  }

  // Create new item
  static async create(endpoint: string, data: any): Promise<MockApiResponse> {
    await delay(Math.random() * 400 + 200);
    
    if (!mockDataStore[endpoint]) {
      return createMockErrorResponse(`Endpoint '${endpoint}' not found`);
    }
    
    // Generate new ID
    const newId = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    const newItem = { id: newId, ...data };
    
    // Handle array data
    if (Array.isArray(mockDataStore[endpoint])) {
      mockDataStore[endpoint].push(newItem);
      return createMockResponse(newItem, 'Item created successfully');
    }
    
    // For non-array endpoints, we can't create new items
    return createMockErrorResponse(`Cannot create items for endpoint '${endpoint}' - not a collection`);
  }

  // Update existing item
  static async update(endpoint: string, id: string, data: any): Promise<MockApiResponse> {
    await delay(Math.random() * 400 + 200);
    
    if (!mockDataStore[endpoint]) {
      return createMockErrorResponse(`Endpoint '${endpoint}' not found`);
    }
    
    const storeData = mockDataStore[endpoint];
    
    // Handle array data
    if (Array.isArray(storeData)) {
      const itemIndex = storeData.findIndex((item: any) => item.id === id);
      if (itemIndex === -1) {
        return createMockErrorResponse(`Item with ID '${id}' not found`);
      }
      
      // Update the item
      mockDataStore[endpoint][itemIndex] = { ...mockDataStore[endpoint][itemIndex], ...data };
      return createMockResponse(mockDataStore[endpoint][itemIndex], 'Item updated successfully');
    }
    
    // Handle object data
    if (storeData && typeof storeData === 'object' && storeData.id === id) {
      mockDataStore[endpoint] = { ...storeData, ...data };
      return createMockResponse(mockDataStore[endpoint], 'Item updated successfully');
    }
    
    return createMockErrorResponse(`Item with ID '${id}' not found`);
  }

  // Delete item
  static async delete(endpoint: string, id: string): Promise<MockApiResponse> {
    await delay(Math.random() * 300 + 150);
    
    if (!mockDataStore[endpoint]) {
      return createMockErrorResponse(`Endpoint '${endpoint}' not found`);
    }
    
    const storeData = mockDataStore[endpoint];
    
    // Handle array data
    if (Array.isArray(storeData)) {
      const itemIndex = storeData.findIndex((item: any) => item.id === id);
      if (itemIndex === -1) {
        return createMockErrorResponse(`Item with ID '${id}' not found`);
      }
      
      // Remove the item
      const deletedItem = mockDataStore[endpoint].splice(itemIndex, 1)[0];
      return createMockResponse(deletedItem, 'Item deleted successfully');
    }
    
    // For non-array endpoints, we can't delete items
    return createMockErrorResponse(`Cannot delete items for endpoint '${endpoint}' - not a collection`);
  }

  // Search items
  static async search(endpoint: string, query: string, field: string = 'name'): Promise<MockApiResponse> {
    await delay(Math.random() * 400 + 200);
    
    if (!mockDataStore[endpoint]) {
      return createMockErrorResponse(`Endpoint '${endpoint}' not found`);
    }
    
    const storeData = mockDataStore[endpoint];
    
    // Handle array data
    if (Array.isArray(storeData)) {
      const results = storeData.filter((item: any) => {
        const fieldValue = item[field]?.toString().toLowerCase() || '';
        return fieldValue.includes(query.toLowerCase());
      });
      return createMockResponse(results, `Search completed. Found ${results.length} results.`);
    }
    
    // Handle object data - check if the object matches the search
    if (storeData && typeof storeData === 'object') {
      const fieldValue = storeData[field]?.toString().toLowerCase() || '';
      if (fieldValue.includes(query.toLowerCase())) {
        return createMockResponse([storeData], `Search completed. Found 1 result.`);
      }
    }
    
    return createMockResponse([], `Search completed. Found 0 results.`);
  }

  // Bulk operations
  static async bulkCreate(endpoint: string, items: any[]): Promise<MockApiResponse> {
    await delay(Math.random() * 600 + 300);
    
    if (!mockDataStore[endpoint]) {
      return createMockErrorResponse(`Endpoint '${endpoint}' not found`);
    }
    
    if (!Array.isArray(mockDataStore[endpoint])) {
      return createMockErrorResponse(`Cannot bulk create items for endpoint '${endpoint}' - not a collection`);
    }
    
    const newItems = items.map(item => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      ...item
    }));
    
    mockDataStore[endpoint].push(...newItems);
    
    return createMockResponse(newItems, `${newItems.length} items created successfully`);
  }

  static async bulkUpdate(endpoint: string, updates: Array<{id: string, data: any}>): Promise<MockApiResponse> {
    await delay(Math.random() * 600 + 300);
    
    if (!mockDataStore[endpoint]) {
      return createMockErrorResponse(`Endpoint '${endpoint}' not found`);
    }
    
    if (!Array.isArray(mockDataStore[endpoint])) {
      return createMockErrorResponse(`Cannot bulk update items for endpoint '${endpoint}' - not a collection`);
    }
    
    const updatedItems = [];
    for (const update of updates) {
      const itemIndex = mockDataStore[endpoint].findIndex((item: any) => item.id === update.id);
      if (itemIndex !== -1) {
        mockDataStore[endpoint][itemIndex] = { ...mockDataStore[endpoint][itemIndex], ...update.data };
        updatedItems.push(mockDataStore[endpoint][itemIndex]);
      }
    }
    
    return createMockResponse(updatedItems, `${updatedItems.length} items updated successfully`);
  }

  static async bulkDelete(endpoint: string, ids: string[]): Promise<MockApiResponse> {
    await delay(Math.random() * 400 + 200);
    
    if (!mockDataStore[endpoint]) {
      return createMockErrorResponse(`Endpoint '${endpoint}' not found`);
    }
    
    if (!Array.isArray(mockDataStore[endpoint])) {
      return createMockErrorResponse(`Cannot bulk delete items for endpoint '${endpoint}' - not a collection`);
    }
    
    const deletedItems = [];
    for (const id of ids) {
      const itemIndex = mockDataStore[endpoint].findIndex((item: any) => item.id === id);
      if (itemIndex !== -1) {
        deletedItems.push(mockDataStore[endpoint].splice(itemIndex, 1)[0]);
      }
    }
    
    return createMockResponse(deletedItems, `${deletedItems.length} items deleted successfully`);
  }
}
