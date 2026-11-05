# SIMARU Frontend

## About

SIMARU (Sistem Informasi Manajemen Ruangan) is a web application for managing campus room information and bookings. It helps users find rooms, check schedules, and submit room reservations, while providing administrators with tools to manage rooms and booking requests.

## Features

- Browse and search room information, including room details and availability.
- View room schedules and submit booking requests.
- Review booking history and reservation details.
- Manage buildings, rooms, schedules, users, and booking approvals through the admin interface.
- View administrative booking and usage information on the dashboard.
- Receive room status updates in real time when the Laravel backend and Reverb service are configured.

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS
- React Router
- Axios
- Zustand
- Laravel Echo and Pusher JS for real-time communication with Laravel Reverb

## Getting Started

### Requirements

- Node.js `^20.19.0` or `>=22.12.0` (Vite 8 requirement)
- npm
- Access to the SIMARU Laravel backend

### Installation

```bash
git clone <repository-url>
cd sipemru-frontend
npm install
```

## Environment Variables

Create a `.env` file in the project root. Set these values to match your backend and Reverb configuration:

```env
VITE_API_URL=http://localhost:8000/api
VITE_REVERB_APP_KEY=your-reverb-app-key
VITE_REVERB_HOST=localhost
VITE_REVERB_PORT=8080
VITE_REVERB_SCHEME=http
```

These are public frontend configuration values. Do not put private credentials or server secrets in `VITE_` variables.

## Development

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run the linter:

```bash
npm run lint
```

## Backend Integration

The frontend communicates with the SIMARU backend built with Laravel through its HTTP API. Real-time room status updates use Laravel Echo and Laravel Reverb. The backend API and Reverb service must be running and configured for their respective features to work.
