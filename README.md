# SIMARU Frontend

**SIMARU** (Sistem Informasi Manajemen Ruangan) is a web application for discovering campus rooms, viewing room schedules, and managing room reservations. This repository contains the frontend application, developed as an academic software project for Class 3A at Politeknik Negeri Madiun.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Project](https://img.shields.io/badge/Project-Academic-6B7280)](#project-status)

## Features

- Browse, search, and view room details.
- View room schedules and check booking availability.
- Submit room reservations and view booking history and details.
- Display a QR ticket for approved bookings.
- Manage rooms, buildings, schedules, and bookings through the admin interface.
- Review and approve or reject booking requests.
- View administrative booking information and dashboard summaries.
- Receive room status updates in real time when the Laravel backend and Reverb service are configured.

## Visuals

The repository includes room photography used by the application, but does not currently include screenshots or a recorded demonstration of the interface.

## Technology Stack

- React 19 and React Router 7
- Vite 8
- Tailwind CSS 4
- Axios for HTTP requests
- Zustand for application state
- Laravel Echo, Pusher JS, and Laravel Reverb for real-time updates
- FullCalendar, Recharts, and date-fns for calendar, chart, and date features

## Requirements

- Node.js `^20.19.0` or `>=22.12.0` (required by Vite 8)
- npm
- Access to a compatible SIMARU Laravel backend for application data and authentication

The frontend does not include a database or database migrations. Database setup and migrations, if required, are managed by the backend project.

## Installation

Clone the repository and install the locked dependencies:

```bash
git clone https://github.com/Bangkitcahyalinuwih/sipemru-frontend.git
cd sipemru-frontend
npm ci
```

Copy the example environment file and adjust the values to match your local backend:

```bash
cp .env.example .env
```

## Configuration

The frontend reads the following Vite environment variables, which are listed in `.env.example`:

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Base URL used for HTTP requests to the Laravel API. |
| `VITE_REVERB_APP_KEY` | Public application key used by the Echo/Reverb client. |
| `VITE_REVERB_HOST` | Reverb WebSocket host. |
| `VITE_REVERB_PORT` | Reverb WebSocket port. |
| `VITE_REVERB_SCHEME` | Connection scheme; use `http` or `https` to match the server setup. |

Update these example values to match your backend:

```dotenv
VITE_API_URL=http://localhost:8000/api
VITE_REVERB_APP_KEY=your-reverb-app-key
VITE_REVERB_HOST=localhost
VITE_REVERB_PORT=8080
VITE_REVERB_SCHEME=http
```

Vite exposes `VITE_` variables in the client bundle. Do not put passwords, private API credentials, or other server secrets in these values.

## Usage

Start the local development server:

```bash
npm run dev
```

Open the URL printed by Vite (by default, `http://localhost:5173`). The main user-facing pages include:

- `/` — home page
- `/roomlist` — room catalog
- `/login` and `/register` — user authentication
- `/booking` and `/history` — booking features for authenticated users
- `/admin/login` — admin sign-in

Application data and authentication require a reachable backend. Real-time room updates additionally require a running and correctly configured Reverb service.

## Project Structure

```text
src/
├── api/                 # HTTP client and request configuration
├── features/
│   ├── Admin/           # Admin booking, approval, building, room, and schedule features
│   ├── app/             # User-facing pages and components
│   ├── auth/            # Admin authentication
│   └── dashboard/       # Admin dashboard
├── layouts/             # User and admin application layouts
├── store/               # Shared state and export helpers
└── utils/               # Shared utilities
```

## Backend and API

This repository contains the frontend only. It sends HTTP requests to the SIMARU backend built with Laravel, using `VITE_API_URL` as the API base URL. The backend source, API route definitions, and API reference are not included here; consult the corresponding backend documentation for endpoint details and database setup.

## Development and Testing

Create and preview a production build:

```bash
npm run build
npm run preview
```

Run the configured code-quality check:

```bash
npm run lint
```

No automated test suite or test script is configured in this repository.

## Roadmap

No formal roadmap is currently maintained in this repository. Potential future work should be tracked and approved by the project maintainers rather than treated as committed functionality.

## Contributing

This is an academic project. Contributions and changes should be coordinated with and approved by the maintainers.

1. Create a focused branch for your change.
2. Keep the change scoped and follow the existing code style.
3. Run `npm run lint` and `npm run build`.
4. Open a pull request describing the change and its verification.

## Support

Report reproducible bugs or request project assistance through [GitHub Issues](https://github.com/Bangkitcahyalinuwih/sipemru-frontend/issues), if enabled for this repository.

## Authors and Acknowledgments

Developed by:

- Bangkit Cahya Linuwih
- Septian Angga Saputra
- Raditya Daffa

Developed as an academic software project for Class 3A at **Politeknik Negeri Madiun**.

## License

No `LICENSE` file is present in this repository. No license has been specified.

## Project Status

SIMARU is an academic frontend project. This repository does not make a claim that the application is production-ready or that it is under active maintenance.
