# Text Segmentation Service

This project provides an intelligent text segmentation service with a React-based frontend interface.

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` and add your OpenAI API key
3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

## Docker Setup

Build the container:
```bash
docker build -t text-segmentation .
```

Run the container:
```bash
docker run -p 3000:3000 text-segmentation
```

## Project Structure

```
project/
├── src/
│   ├── components/      # React components
│   ├── services/        # API and mock data services
│   ├── types/          # TypeScript type definitions
│   └── config/         # Environment configuration
├── .env.example        # Environment variables template
├── Dockerfile          # Docker configuration
└── package.json        # Project dependencies
```

## Environment Variables

- `VITE_OPENAI_API_KEY`: Your OpenAI API key
- `VITE_API_URL`: Backend API URL (default: http://localhost:8000)

## Features

- Text upload via file or paste
- Configurable segmentation parameters
- Real-time text processing
- Coherence analysis
- Detailed metrics and visualization