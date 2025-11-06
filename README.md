# Darwin

A React-based task management application for organizing work across hierarchical domains and areas.

## Overview

Darwin is a personal productivity application that helps you organize tasks across multiple life domains (e.g., Work, Personal, Projects). It features a hierarchical structure (Domains → Areas → Tasks) with drag-and-drop functionality, calendar views for completed tasks, and AWS Cognito authentication.

## Features

- **Hierarchical Organization**: Organize tasks across Domains (top-level categories) and Areas (subcategories)
- **Task Management**: Create, edit, prioritize, and mark tasks as complete
- **Drag & Drop**: Reorganize tasks and areas with intuitive drag-and-drop
- **Calendar View**: Track completed tasks by date
- **Authentication**: Secure OAuth2 login with AWS Cognito
- **Responsive Design**: Works on desktop and mobile devices

## Architecture

### Technology Stack

- **Frontend**: React 18.2.0
- **UI Framework**: Material-UI (MUI) v5.9.0
- **State Management**: React Context API
- **Routing**: React Router v6.3.0
- **Drag & Drop**: react-dnd v16.0.1 + react-beautiful-dnd v13.1.0
- **Authentication**: AWS Cognito (OAuth2 implicit grant flow)
- **Build Tool**: Create React App

### Project Structure

```
darwin/
├── src/
│   ├── Components/          # Reusable UI components
│   │   ├── AuthenticatedRoute/
│   │   ├── ErrorBoundary/
│   │   ├── TaskEdit/
│   │   ├── SnackBar/
│   │   └── ...
│   ├── Context/            # React Context providers
│   │   ├── AuthContext.js  # Authentication state
│   │   └── AppContext.js   # Application configuration
│   ├── TaskPlanView/       # Main kanban-style task view
│   ├── CalendarView/       # Completed task calendar
│   ├── AreaEdit/           # Area management
│   ├── DomainEdit/         # Domain management
│   ├── RestApi/            # API client utilities
│   ├── utils/              # Shared utilities
│   └── index.js            # Application entry point
├── public/
└── package.json
```

### Data Model

```
Profile (User)
├── Domain (e.g., "Work", "Personal")
│   ├── Area (e.g., "Frontend", "Backend")
│   │   ├── Task (e.g., "Fix login bug")
│   │   ├── Task
│   │   └── ...
│   └── Area
└── Domain
```

## Getting Started

### Prerequisites

- Node.js 14+ and npm
- AWS Account (for backend API and Cognito)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jasoneplumb/Darwin.git
   cd Darwin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

   Required environment variables:
   ```
   REACT_APP_API_URL=https://your-api-gateway.execute-api.region.amazonaws.com/stage/darwin
   REACT_APP_COGNITO_CLIENT_ID=your-cognito-client-id
   REACT_APP_COGNITO_DOMAIN=your-cognito-domain.auth.region.amazoncognito.com
   REACT_APP_LOGIN_REDIRECT=http://localhost:3000/loggedin
   REACT_APP_LOGOUT_REDIRECT=http://localhost:3000/
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The app will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

### Code Structure

#### Context Providers

- **AuthContext**: Manages authentication state (tokens, user profile)
- **AppContext**: Stores application configuration (API URL)

#### Main Views

- **TaskPlanView** (`/taskcards`): Primary kanban-style task board
- **CalendarView** (`/calview`): Calendar of completed tasks
- **AreaEdit** (`/areaedit`): Manage areas within domains
- **DomainEdit** (`/domainedit`): Manage domains

#### Authentication Flow

1. User clicks "Login" on HomePage
2. Redirected to AWS Cognito login page
3. After authentication, redirected back with OAuth tokens
4. LoggedIn component validates tokens and fetches user profile
5. Tokens stored in cookies (24-hour expiry)

### API Integration

The application communicates with a REST API via `src/RestApi/RestApi.js`. The API base URL is configured via the `REACT_APP_API_URL` environment variable.

**Endpoints:**
- `/profiles` - User profile management
- `/domains` - Domain CRUD operations
- `/areas` - Area CRUD operations
- `/tasks` - Task CRUD operations

**Authentication:**
All API requests include the JWT ID token in the `Authorization` header.

## Contributing

### Code Style

- Use ESLint for linting (extends react-app preset)
- Follow existing patterns for consistency
- Write meaningful commit messages
- Add input sanitization for user-facing fields

### Testing

Testing infrastructure is set up but tests need to be implemented. Contributions welcome!

```bash
npm test
```

## Security

- User input is sanitized via `src/utils/inputSanitization.js`
- Authentication tokens stored in secure cookies
- CSRF protection during OAuth flow
- Error boundaries prevent application crashes

## Browser Support

Supports all modern browsers:
- Chrome (last version)
- Firefox (last version)
- Safari (last version)
- Edge (last version)

See `package.json` browserslist configuration for details.

## License

See `license.md` for details.

## Support

For issues and feature requests, please file a GitHub issue.

## Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- UI components from [Material-UI](https://mui.com/)
- Authentication via [AWS Cognito](https://aws.amazon.com/cognito/)
