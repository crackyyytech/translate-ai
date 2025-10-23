developed by 
sudalai manikandan .S 
Be.computer science & engineering

## Deploying to Vercel

Hosting this Next.js project on Vercel is a straightforward process. Follow these steps to deploy your application.

### 1. Push Your Project to a Git Repository

First, ensure your project is pushed to a Git provider like GitHub, GitLab, or Bitbucket. Vercel uses these repositories to import your project and automate deployments.

### 2. Import Project on Vercel

1.  Sign up for a free Vercel account at [vercel.com](https://vercel.com).
2.  From your Vercel dashboard, click the **Add New...** button and select **Project**.
3.  Connect your Git provider and select the repository for this project.
4.  Vercel will automatically detect that you are using Next.js and configure the build settings for you. You typically do not need to change these.

### 3. Configure Environment Variables

This project uses the Gemini API for its AI features, which requires an API key. You need to add this key to your Vercel project.

1.  In your project's settings on Vercel, navigate to the **Environment Variables** section.
2.  Add a new environment variable with the following name and value:
    *   **Name**: `GEMINI_API_KEY`
    *   **Value**: Paste your Gemini API key here. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 4. Deploy

Once the environment variable is set, click the **Deploy** button. Vercel will build and deploy your application. After the deployment is complete, you will be provided with a public URL to access your live site.

Your project is now hosted on Vercel! Any future pushes to your connected Git branch (usually `main`) will automatically trigger a new deployment.