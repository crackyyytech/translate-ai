# Security Policy

## Reporting a Vulnerability

If you find a security issue, please do not open a public issue with exploit details. Contact the maintainer privately through the email listed on the GitHub profile, then include:

- A short description of the issue
- Steps to reproduce
- Impact and affected area
- Suggested fix, if known

## Scope

Security-sensitive areas include translation input, generated output, Gemini API usage, Firebase/Vercel configuration, and environment variables.

## Secret Handling

Never commit `.env` files, Gemini API keys, Firebase secrets, tokens, user content, private audio/text, or generated exports containing sensitive information.
