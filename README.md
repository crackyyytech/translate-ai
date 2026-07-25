# Translate AI

Translate AI is a Next.js application for AI-assisted translation workflows. It uses a modern React interface, TypeScript, Tailwind CSS, Firebase/Genkit tooling, and Gemini-powered AI features.

## Product Summary

This project is positioned as a practical AI translation tool. It is designed to help users enter or process text, receive AI-assisted translation output, and deploy the app through Vercel or Firebase App Hosting.

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 15, React 18, TypeScript |
| UI | Tailwind CSS, Radix UI, Lucide React |
| AI | Genkit, Gemini API |
| Forms/Validation | React Hook Form, Zod |
| Charts/UI Data | Recharts, date-fns |
| Deployment | Vercel or Firebase App Hosting |

## Local Setup

```bash
git clone https://github.com/crackyyytech/translate-ai.git
cd translate-ai
npm install
cp .env.example .env.local
npm run dev
```

The development server uses port `9002` by default.

## Environment Variables

```env
GEMINI_API_KEY=your_gemini_api_key
```

Keep API keys in local `.env` files or deployment-provider secret settings. Do not commit secrets.

## Quality Commands

```bash
npm run typecheck
npm run build
```

## Deployment

### Vercel

1. Import the GitHub repository in Vercel.
2. Add `GEMINI_API_KEY` in project environment variables.
3. Deploy the app.

### Firebase App Hosting

1. Install Firebase CLI.
2. Authenticate with Firebase.
3. Configure App Hosting.
4. Store `GEMINI_API_KEY` as a Firebase secret.
5. Deploy the backend/app hosting target.

## Recruiter Polish Checklist

- Add screenshots of the translation flow
- Add a live deployment URL
- Add examples for input/output translations
- Add tests for key translation utilities or API routes
- Add clear limitations around AI output quality and privacy

## License

Add a license before publishing this project for reuse.
