# DocMind / AI-RAG-Chatbot

A Retrieval-Augmented Generation (RAG) chatbot application that allows users to interact with AI based on documents.

## 🚀 Technologies Used

### Frontend
- **React**: Core UI library.
- **Vite**: Build tool and development server.
- **Google Gemini API**: Integrated directly in the frontend for AI interactions.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for API routes.
- **Multer**: Middleware for handling `multipart/form-data` and file uploads.
- **Anthropic AI SDK**: Integrated on the backend for Claude interactions.

### Deployment
- **Render**: Pre-configured for deployment with a `render.yaml` file.

## 🌟 Features
- Intelligent AI Chatbot powered by Google Gemini / Anthropic Claude.
- File upload functionality for Retrieval-Augmented Generation (RAG) workflows.
- Modern and responsive React frontend.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- API Keys for Google Gemini or Anthropic Claude (depending on which you use actively).

### 1. Clone the repository
```bash
git clone https://github.com/patankaif/AI-RAG-Chatbot.git
cd AI-RAG-Chatbot
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend development server:
   ```bash
   npm run dev
   ```
   *(The server runs on http://localhost:10000 by default)*

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the frontend directory based on `.env.example`:
   ```bash
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## 🌐 Deployment
This repository is configured to be deployed on Render using the provided `render.yaml` blueprint. It sets up two separate services: a static site for the frontend and a web service for the Express backend.
