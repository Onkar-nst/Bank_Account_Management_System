# Bank Account Management System

A simple CRUD backend application for managing bank accounts built with TypeScript, Express.js, and OOP principles.

## Features

- ✅ Create new bank accounts
- ✅ Get all accounts (list)
- ✅ Get single account by ID
- ✅ Update account details
- ✅ Delete accounts
- ✅ TypeScript with strict type checking
- ✅ Object-Oriented Programming (OOP) design
- ✅ RESTful API architecture

- **TypeScript** - Type-safe JavaScript


## Installation

1. Install dependencies:
```bash
npm install
```

2. Run in development mode:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
npm start
```

## API Endpoints

### Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| POST | `/api/accounts` | Create new account |
| GET | `/api/accounts` | Get all accounts |
| GET | `/api/accounts/:id` | Get account by ID |
| PUT | `/api/accounts/:id` | Update account |
| DELETE | `/api/accounts/:id` | Delete account |
