# Lead Creator User Frontend

A frontend application for managing users in the Lead Creator system.

## Features

- User management (create, read, update, delete)
- API integration with backend services
- TypeScript support

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd lead-creator-user-frontend
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```
VITE_API_BASE_URL=http://your-api-url
```

### Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

```bash
npm run build
# or
yarn build
```

## Project Structure

- `src/` - Source code
  - `lib/` - Utility functions and API clients
  - `types/` - TypeScript type definitions
  - `components/` - React components
  - `pages/` - Page components

## API Integration

The application communicates with a backend API using Axios. The API client is configured in `src/lib/api.ts` and includes functions for:

- Fetching all users
- Fetching a single user
- Creating a new user
- Updating an existing user
- Deleting a user

## License

[MIT](LICENSE)
