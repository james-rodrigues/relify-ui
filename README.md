# Relify UI - React 19 + Vite + MUI

A modern React application built with React 19.1.0, Vite, TypeScript, and Material-UI (MUI) components.

## 🚀 Features

- **React 19.1.0** - Latest React version with improved performance and features
- **Vite** - Lightning fast build tool and development server
- **TypeScript** - Type safety and better developer experience
- **Material-UI (MUI)** - Beautiful React components following Material Design
- **Roboto Font** - Google's signature font integrated
- **Material Icons** - Comprehensive icon library
- **SCSS/Sass** - Advanced CSS preprocessing with variables, mixins, and nesting
- **Hot Module Replacement (HMR)** - Instant updates during development
- **ESLint** - Code linting and formatting

## 🛠️ Project Setup

This project was created using the following steps:

### 1. Create Vite React Project
```bash
npm create vite@latest . -- --template react-ts
npm install
```

### 2. Upgrade to React 19.1.0
```bash
npm install react@19.1.0 react-dom@19.1.0
```

### 3. Install MUI Dependencies
```bash
# Core MUI components
npm install @mui/material @emotion/react @emotion/styled

# Material Icons
npm install @mui/icons-material

# Roboto Font
npm install @fontsource/roboto
```

### 4. Setup SCSS/Sass
```bash
# Install Sass preprocessor (already included in Vite)
npm install -D sass
```

### 5. Project Structure
```
src/
├── App.tsx          # Main app component with MUI theming
├── App.scss         # Component-specific SCSS styles with mixins
├── main.tsx         # Entry point with font imports
├── index.scss       # Global SCSS styles with variables and mixins
└── assets/          # Static assets
```

## 🚀 Getting Started

### Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view the app.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 📦 Dependencies

### Core Dependencies
- `react@19.1.0` - React library
- `react-dom@19.1.0` - React DOM bindings
- `@mui/material@7.2.0` - MUI core components
- `@mui/icons-material@7.2.0` - Material Design icons
- `@emotion/react` & `@emotion/styled` - CSS-in-JS library for MUI
- `@fontsource/roboto` - Roboto font files

### Development Dependencies
- `vite` - Build tool and dev server
- `typescript` - TypeScript compiler
- `@vitejs/plugin-react` - Vite React plugin
- `sass` - SCSS/Sass preprocessor (built-in with Vite)
- `eslint` - Code linting

## 🎨 MUI Theme

The project includes a custom MUI theme with:
- Primary color: `#1976d2` (Material Blue)
- Secondary color: `#dc004e` (Material Pink)
- Roboto font family
- Material Design baseline styles

## 🎨 SCSS Features

The project uses advanced SCSS features for better styling:

### Variables
```scss
$primary-color: #1976d2;
$secondary-color: #dc004e;
$border-radius: 8px;
$transition-speed: 0.25s;
```

### Mixins
```scss
@mixin button-base {
  border-radius: $border-radius;
  padding: 0.6em 1.2em;
  transition: border-color $transition-speed;
}

@mixin respond-to($breakpoint) {
  @media (min-width: map-get($breakpoints, $breakpoint)) {
    @content;
  }
}
```

### Nested Styles
```scss
.logo {
  height: $logo-size;
  transition: filter $logo-transition;
  
  &:hover {
    filter: drop-shadow(0 0 2em $vite-glow);
  }
  
  &.react:hover {
    filter: drop-shadow(0 0 2em $react-glow);
  }
}
```

### Responsive Breakpoints
- xs: 0
- sm: 600px
- md: 900px
- lg: 1200px
- xl: 1536px

## 📄 Original Vite Documentation

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
