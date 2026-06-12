# AI Resume Analyzer

An AI-powered Resume Analyzer built using Fastify, TypeScript, OpenAI, and PDF parsing. Users can upload a PDF resume and receive an ATS score, skill analysis, strengths, missing skills, and recommendations.

## Features

* Upload PDF resumes
* Extract text from PDF files
* Analyze resumes using OpenAI
* Generate ATS score
* Identify technical skills
* Highlight strengths
* Suggest missing skills
* Provide improvement recommendations
* Built with Fastify and TypeScript

## Tech Stack

### Backend

* Fastify
* TypeScript
* Node.js

### AI

* OpenAI API

### File Processing

* pdf-parse

### Development Tools

* Nodemon
* ts-node

## Project Structure

```text
src/
├── controllers/
│   └── resume.controller.ts
├── routes/
│   └── resume.route.ts
├── services/
│   ├── openai.service.ts
│   ├── pdf.service.ts
│   └── resume.service.ts
├── plugins/
│   └── multipart.ts
└── server.ts
```

## API Endpoint

### Analyze Resume

```http
POST /api/resume/upload
```

### Request

Content-Type:

```text
multipart/form-data
```

Body:

```text
resume : PDF File
```

### Sample Response

```json
{
  "analysis": {
    "atsScore": 85,
    "skills": [
      "Node.js",
      "TypeScript",
      "AWS"
    ],
    "strengths": [
      "Backend Architecture",
      "Cloud Experience"
    ],
    "missingSkills": [],
    "recommendations": []
  }
}
```

## Setup

### Clone Repository

```bash
git clone <repository-url>
cd resume-analyzer
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key
PORT=3000
```

### Start Development Server

```bash
npm run dev
```

Server runs at:

```text
http://localhost:3000
```

## Workflow

```text
Upload Resume
      ↓
Extract PDF Text
      ↓
OpenAI Analysis
      ↓
Generate ATS Score
      ↓
Return Structured JSON
```

## Future Enhancements

* Resume vs Job Description Matching
* PostgreSQL Integration
* AWS S3 File Storage
* Authentication & Authorization
* Resume History Tracking
* Docker Support
* Deployment on AWS

## Author

Yashvant Yadav

Senior Backend Engineer

Node.js | TypeScript | AWS | Distributed Systems
