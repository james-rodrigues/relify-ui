# API Integration Guide

This document explains how to use the Relify UI application with different API modes and the comprehensive API integration that has been implemented.

## Overview

The Relify UI now supports three distinct modes for API interaction:

1. **Mock Mode** - Uses local mock data for development and testing
2. **Local Mode** - Connects to a local development API server
3. **AWS Mode** - Connects to AWS production/staging environment

## Quick Start

### Running in Different Modes

```bash
# Mock Mode (default)
npm run dev
# or explicitly
npm run dev:mock

# Local Development Mode
npm run dev:local

# AWS Production Mode
npm run dev:aws
```

### Building for Different Modes

```bash
# Build for Mock Mode
npm run build:mock

# Build for Local Mode
npm run build:local

# Build for AWS Mode
npm run build:aws
```

## Environment Configuration

The application uses environment files to configure API endpoints for each mode:

### `.env.mock` - Mock Mode
- Base URL: `http://localhost:3001/mock-api`
- Uses local mock data with simulated network delays
- No external dependencies required

### `.env.local` - Local Development Mode
- Base URL: `http://localhost:8080/api/v1`
- Connects to local development server
- Includes retry logic and timeout handling

### `.env.aws` - AWS Production Mode
- Base URL: `https://api.relify.example.com/v1`
- Production-ready configuration
- Enhanced retry logic and error handling
- AWS Cognito integration placeholders

## API Integration Features

### Admin Panel API Integration

All admin panel functionality is now fully integrated with the API service:

#### **Release Governance Activities**
- ✅ GET `/admin/release-governance-activities` - List all governance activities
- ✅ POST `/admin/release-governance-activities` - Create new governance activity
- ✅ PUT `/admin/release-governance-activities/{id}` - Update governance activity
- ✅ DELETE `/admin/release-governance-activities/{id}` - Delete governance activity

#### **Release Activities Categories**
- ✅ GET `/admin/release-activities-categories` - List all categories
- ✅ POST `/admin/release-activities-categories` - Create new category
- ✅ PUT `/admin/release-activities-categories/{id}` - Update category
- ✅ DELETE `/admin/release-activities-categories/{id}` - Delete category

#### **Release Activities**
- ✅ GET `/admin/release-activities` - List all activities
- ✅ POST `/admin/release-activities` - Create new activity
- ✅ PUT `/admin/release-activities/{id}` - Update activity
- ✅ DELETE `/admin/release-activities/{id}` - Delete activity

#### **Release Schedule**
- ✅ GET `/admin/release-schedule` - List all schedules
- ✅ POST `/admin/release-schedule` - Create new schedule
- ✅ PUT `/admin/release-schedule/{id}` - Update schedule
- ✅ DELETE `/admin/release-schedule/{id}` - Delete schedule

#### **Release Activity Owners**
- ✅ GET `/admin/release-activity-owners` - List all owners
- ✅ POST `/admin/release-activity-owners` - Create new owner mapping
- ✅ PUT `/admin/release-activity-owners/{id}` - Update owner mapping
- ✅ DELETE `/admin/release-activity-owners/{id}` - Delete owner mapping

#### **Point of Contacts**
- ✅ GET `/admin/point-of-contacts` - List all contacts
- ✅ POST `/admin/point-of-contacts` - Create new contact
- ✅ PUT `/admin/point-of-contacts/{id}` - Update contact
- ✅ DELETE `/admin/point-of-contacts/{id}` - Delete contact

#### **Applications**
- ✅ GET `/admin/applications` - List all applications
- ✅ POST `/admin/applications` - Create new application
- ✅ PUT `/admin/applications/{id}` - Update application
- ✅ DELETE `/admin/applications/{id}` - Delete application

### Button Integration

All admin panel buttons are now integrated with API calls:

#### **Search Functionality**
- Real-time search with API filtering
- Debounced search requests for performance
- Backend search support for all data types

#### **Refresh Button**
- Fetches latest data from API
- Shows loading states during refresh
- Error handling with user feedback

#### **Add Entry Buttons**
- Creates new entries via API
- Form validation before submission
- Success/error feedback to users

#### **Edit Buttons**
- Updates existing entries via API
- Pre-populated forms with current data
- Optimistic UI updates

### Dashboard API Integration

Main dashboard components also support API integration:

- ✅ **Releases Data** - `/releases`
- ✅ **Overview Data** - `/overview`
- ✅ **Application Pipelines** - `/application-pipelines`
- ✅ **Evidence Data** - `/evidence`
- ✅ **Implementation Plan** - `/implementation-plan`
- ✅ **JIRA Integration** - `/jira-integration`
- ✅ **Release Scope** - `/release-scope`

## API Service Architecture

### Core Components

1. **ApiService** (`src/services/api/apiService.ts`)
   - Main service that handles mode switching
   - Provides unified interface for all API calls
   - Manages error handling and response formatting

2. **HttpClient** (`src/services/api/httpClient.ts`)
   - HTTP client for real API calls (Local/AWS modes)
   - Retry logic and timeout handling
   - Request/response interceptors

3. **MockService** (`src/services/api/mockService.ts`)
   - Simulates API calls in mock mode
   - Realistic network delays
   - CRUD operations on mock data

4. **Configuration** (`src/services/api/config.ts`)
   - Environment-specific configuration
   - Endpoint mapping
   - Mode-specific settings

### Error Handling

- **Network Errors**: Automatic retry with exponential backoff
- **API Errors**: User-friendly error messages
- **Timeout Handling**: Configurable timeouts per mode
- **Loading States**: Visual feedback during API calls

### Performance Features

- **Request Debouncing**: Search requests are debounced
- **Optimistic Updates**: UI updates before API confirmation
- **Caching Strategy**: Smart caching for frequently accessed data
- **Batch Operations**: Support for bulk create/update/delete

## Mode Indicator

A visual mode indicator shows the current API mode:

- **Mock Mode**: Orange chip with bug icon
- **Local Mode**: Blue chip with computer icon  
- **AWS Mode**: Green chip with cloud icon
- **Health Status**: Shows API connection status
- **Tooltip**: Displays base URL and health information

## Development Guidelines

### Adding New API Endpoints

1. Add endpoint to environment files (`.env.mock`, `.env.local`, `.env.aws`)
2. Update `config.ts` with endpoint mapping
3. Add method to `ApiService`
4. Update `MockService` if adding new mock data
5. Implement UI integration in components

### Error Handling Best Practices

```typescript
try {
  const response = await apiService.getData('menuItem')
  if (response.success) {
    // Handle success
    setData(response.data)
  } else {
    // Handle API error
    showError(response.error)
  }
} catch (error) {
  // Handle network/unexpected errors
  showError('Network error occurred')
}
```

### Loading State Management

```typescript
const [loading, setLoading] = useState(false)

const handleApiCall = async () => {
  setLoading(true)
  try {
    await apiService.someOperation()
  } finally {
    setLoading(false)
  }
}
```

## Testing

### Mock Mode Testing
```bash
npm run dev:mock
# Test with simulated network delays and mock data
```

### Local API Testing
```bash
# Start your local API server on port 8080
npm run dev:local
# Test against local development API
```

### Production Testing
```bash
npm run dev:aws
# Test against AWS production environment
```

## Troubleshooting

### Common Issues

1. **Mode indicator shows "Error"**
   - Check API server is running
   - Verify environment configuration
   - Check network connectivity

2. **Data not loading**
   - Check browser console for errors
   - Verify API endpoints are correct
   - Check CORS configuration for local/AWS modes

3. **Slow performance**
   - Check network latency
   - Verify API server performance
   - Consider enabling caching

### Debug Mode

Enable debug logging by opening browser console. All API calls are logged with:
- Request method and URL
- Response status and timing
- Error details if failures occur

## Future Enhancements

- [ ] WebSocket support for real-time updates
- [ ] Advanced caching strategies
- [ ] API rate limiting handling
- [ ] Authentication token refresh
- [ ] Offline mode support
- [ ] Request/response compression

## Support

For API integration questions or issues:
1. Check browser console for error details
2. Verify environment configuration
3. Test in mock mode first
4. Check API server logs (for Local/AWS modes)

The API integration provides a robust, scalable foundation for the Relify UI application across all deployment environments.
