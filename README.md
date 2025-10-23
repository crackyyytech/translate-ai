developed by 
sudalai manikandan .S 
Be.computer science & engineering

## Deploying to Vercel

Hosting this Next.js project on Vercel is a straightforward process. Vercel's free "Hobby" plan is a great option for hosting this application.

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

## Deploying to Firebase App Hosting

Firebase App Hosting is another excellent free option for deploying your Next.js application.

### 1. Install the Firebase CLI

First, you need to install the Firebase Command Line Interface (CLI) on your computer. You can do this using npm.

```bash
npm install -g firebase-tools
```

### 2. Log In to Firebase

Authenticate with your Google account by running the following command:

```bash
firebase login
```

### 3. Initialize Firebase in Your Project

If you haven't already, you need to initialize Firebase in your project directory.

```bash
firebase init
```

When prompted:
1.  Select **App Hosting**.
2.  Choose to use an existing Firebase project and select it from the list.
3.  Follow the prompts to set up your backend.

### 4. Set the Gemini API Key

Firebase App Hosting needs access to your Gemini API key. Set it as a secret by running this command:

```bash
firebase apphosting:secrets:set GEMINI_API_KEY
```

When prompted, paste your Gemini API key. You can get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 5. Deploy to Firebase

Finally, deploy your application by running:

```bash
firebase apphosting:backends:deploy
```

After the deployment is complete, the CLI will output the URL to your live application.
