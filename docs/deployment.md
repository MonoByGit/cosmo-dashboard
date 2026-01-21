# Deployment Guide: COSMO Dashboard on Vercel

The COSMO dashboard is optimized for seamless deployment on Vercel. Follow these steps to take your dashboard live.

## 1. Connect to Vercel
1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Go to [vercel.com](https://vercel.com) and click **"New Project"**.
3. Import your repository.

## 2. Configuration Settings
Vercel will automatically detect that you are using Next.js. Ensure the following settings are active:

- **Framework Preset:** `Next.js`
- **Build Command:** `npm run build`
- **Output Directory:** `.next`

## 3. Environment Variables
If you plan to integrate real AI models (like Claude or GPT-4), you'll need to add your API keys in the Vercel Dashboard under **Project Settings > Environment Variables**:

| Variable Name | Description |
| :--- | :--- |
| `NEXT_PUBLIC_CLAUDE_API_KEY` | Your Anthropic API Key (if applicable) |
| `NEXT_PUBLIC_OPENAI_API_KEY` | Your OpenAI API Key (if applicable) |

> [!NOTE]
> Currently, the dashboard uses mock data for the interface. You can add these keys once you decide to connect the live backend.

## 4. Custom Domain
1. In Vercel, navigate to **Settings > Domains**.
2. Add your custom domain (e.g., `dashboard.idusty.com`).
3. Follow the DNS instructions provided by Vercel to point your domain to their edge network.

## 5. Deployment Workflow
Once connected, every push to your `main` branch will automatically trigger a production deployment. Pushes to other branches will create unique "Preview Deployments" for testing.

---

> [!TIP]
> Use the **Vercel Analytics** and **Speed Insights** to monitor your dashboard's performance and ensure the "Apple-premium" feel is maintained for all users.
