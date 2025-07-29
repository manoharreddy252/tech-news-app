# Tech News App

A full-stack Django + React application for daily tech news with authentication.

## Features

- **User Authentication**: Login/Register with JWT tokens
- **Daily Tech News**: Top 5 tech news scraped from Google News
- **Responsive Design**: Bootstrap-based UI
- **Real-time Updates**: Refresh news functionality
- **Demo Credentials**: Username: `demo`, Password: `demo123`

## Tech Stack

### Backend
- Django 4.2.7
- Django REST Framework
- JWT Authentication
- BeautifulSoup4 for web scraping
- SQLite database

### Frontend
- React 18 with TypeScript
- React Bootstrap
- Axios for API calls
- React Router for navigation

## Setup Instructions

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Demo Login
- Username: `demo`
- Password: `demo123`

## Deployment

The frontend is configured for GitHub Pages deployment:
```bash
cd frontend
npm run deploy
```

## API Endpoints

- `POST /api/register/` - User registration
- `POST /api/login/` - User login
- `GET /api/news/` - Get daily news
- `POST /api/news/refresh/` - Refresh news

## Live Demo

Frontend: https://manoharreddy252.github.io/tech-news-app