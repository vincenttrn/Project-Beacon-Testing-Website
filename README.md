# Project Beacon

Marketing site for Project Beacon — hands-on robotics STEM incursions for NSW schools.

Built with React, Vite, and Tailwind CSS. Deployed on [Vercel](https://vercel.com).

## Local development

```bash
npm install
npm run dev
```

The enquiry form needs the Vercel API routes. For full local testing:

```bash
npm run dev:vercel
```

## Build

```bash
npm run build
npm run preview
```

## Deployment

This project is configured for Vercel.

- **Framework:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Routing:** `vercel.json` rewrites non-API routes to `index.html`

Connect the GitHub repo in the Vercel dashboard. Every push to `main` triggers a production deploy.

## Enquiry flow (Discord + email)

1. Visitor submits the form on `/enquire`
2. `POST /api/enquire` stores the enquiry, posts to Discord, sends via **EmailJS** (team template), and sends via **Resend** (confirmation + Discord replies)
3. Team clicks **Reply** on the Discord message, types a response, and it emails the enquirer via Resend

### One-time setup

#### 1. EmailJS

1. Log in at [emailjs.com](https://www.emailjs.com)
2. Use your existing service (`service_cqgyohi`) and template (`template_emalvgp`)
3. **Account → API Keys** → copy **Public Key** and **Private Key**
4. **Account → Security** → enable **Allow API for non-browser applications**
5. Add your Vercel domain to allowed origins, e.g. `https://project-beacon-testing-website.vercel.app`

Template variables should match the form field names:

`school_name`, `name`, `email`, `phone`, `year_level`, `students`, `preferred_date`, `message`

#### 2. Resend

1. Create an account at [resend.com](https://resend.com)
2. Add and verify the `projectbeacon.org.au` domain
3. Create an API key

#### 2. Upstash Redis

1. In Vercel → **Storage** → add **Upstash Redis** (or create at [upstash.com](https://upstash.com))
2. Connect it to the project — Vercel will inject `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

#### 3. Discord bot

1. Create an application at [discord.com/developers/applications](https://discord.com/developers/applications)
2. **Bot** → create a bot → copy the **token** → `DISCORD_BOT_TOKEN`
3. **General Information** → copy **Application ID** → `DISCORD_APPLICATION_ID`
4. **General Information** → copy **Public Key** → `DISCORD_PUBLIC_KEY`
5. **Bot** → enable **Message Content Intent** (optional, not required for this flow)
6. Invite the bot to your server with `Send Messages` and `Use Application Commands` permissions
7. Create a `#enquiries` channel and copy its ID → `DISCORD_CHANNEL_ID`
8. **General Information** → set **Interactions Endpoint URL** to:
   ```
   https://project-beacon-testing-website.vercel.app/api/discord/interactions
   ```
   Discord will send a PING to verify the endpoint after deploy.

#### 4. Vercel environment variables

Add these in Vercel → **Settings → Environment Variables** (see `.env.example`):

| Variable | Description |
|---|---|
| `DISCORD_BOT_TOKEN` | Bot token from Discord developer portal |
| `DISCORD_CHANNEL_ID` | Channel ID for enquiry notifications |
| `DISCORD_PUBLIC_KEY` | Application public key for verifying Discord requests |
| `DISCORD_APPLICATION_ID` | Application ID (for reference / future use) |
| `UPSTASH_REDIS_REST_URL` | From Upstash |
| `UPSTASH_REDIS_REST_TOKEN` | From Upstash |
| `EMAILJS_SERVICE_ID` | EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `EMAILJS_PRIVATE_KEY` | EmailJS private key (required for server-side) |
| `RESEND_API_KEY` | From Resend (for confirmations and Discord replies) |
| `ENQUIRY_FROM_EMAIL` | Sender address, e.g. `support@projectbeacon.org.au` |
| `TEAM_EMAIL` | Where Resend team notification emails go |

Redeploy after adding env vars and setting the Discord interactions URL.
