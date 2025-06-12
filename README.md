# Release Automation App

A modern React TypeScript application for managing and tracking software releases with Material-UI components.

## Features

- **Filter Releases**: Filter releases by month and year
- **Release Dashboard**: View detailed release information in a structured table
- **Material-UI Components**: Modern, responsive UI with Material-UI
- **TypeScript**: Fully typed for better development experience
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Smooth loading indicators for better UX

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Material-UI (MUI)** for UI components
- **Custom Hooks** for state management
- **Modular Architecture** with separation of concerns

## Project Structure

```
release-automation-app/
├── public/
├── src/
│   ├── components/
│   │   ├── FilterSection.tsx    # Month/Year filter component
│   │   ├── ReleaseTable.tsx     # Release data table component
│   │   └── Layout.tsx           # App layout wrapper
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   ├── data/
│   │   └── mockData.ts          # Mock release data
│   ├── utils/
│   │   └── helpers.ts           # Utility functions
│   ├── hooks/
│   │   └── useReleaseData.ts    # Custom hook for data management
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # App entry point
│   └── index.css                # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Step-by-Step Setup

1. **Create the project**
   ```bash
   npm create vite@latest release-automation-app -- --template react-ts
   cd release-automation-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Material-UI and related packages**
   ```bash
   npm install @mui/material @emotion/react @emotion/styled
   npm install @mui/icons-material
   npm install @mui/x-date-pickers dayjs
   ```

4. **Install development dependencies**
   ```bash
   npm install -D @types/node
   ```

5. **Create directory structure**
   ```bash
   mkdir -p src/components src/types src/data src/utils src/hooks
   ```

6. **Copy all the source files** (provided in the artifacts above)

7. **Start the development server**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Component Overview

### FilterSection
- Dropdown selectors for month and year
- Submit and reset buttons
- Loading states and validation

### ReleaseTable
- Displays release data in a structured table
- Status indicators with icons and colors
- Merchant impact indicators
- Responsive design with proper formatting

### Layout
- App header and footer
- Consistent spacing and styling
- Responsive container

## Data Structure

Each release contains:
- `releaseId`: Unique identifier
- `releaseDate`: Release date
- `name`: Release name
- `version`: Software version
- `snowNumber`: ServiceNow ticket number
- `fixVersion`: Fix version identifier
- `isMerchantImpacting`: Boolean flag
- `status`: Release status (Completed, In Progress, Scheduled, Failed, Cancelled)

## Customization

### Adding New Fields
1. Update the `Release` interface in `src/types/index.ts`
2. Add the field to mock data in `src/data/mockData.ts`
3. Update the table headers and cells in `src/components/ReleaseTable.tsx`

### Styling
- Global styles: `src/index.css`
- Theme configuration: `src/App.tsx` (MUI theme)
- Component-specific styles: Inline with MUI's `sx` prop

### API Integration
Replace the mock data in `src/hooks/useReleaseData.ts` with actual API calls:

```typescript
const fetchReleases = async (month: number, year: number) => {
  const response = await fetch(`/api/releases?month=${month}&year=${year}`);
  const data = await response.json();
  return data;
};
```

## Future Enhancements

- [ ] Add search functionality
- [ ] Implement sorting and filtering
- [ ] Add export functionality (CSV, PDF)
- [ ] Add release details modal
- [ ] Implement real-time updates
- [ ] Add user authentication
- [ ] Add CRUD operations for releases

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.