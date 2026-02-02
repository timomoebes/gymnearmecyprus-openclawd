# Auth & claim flow (local development)

## Confirmation email (required for security)

Email confirmation is required for security. After sign up, Supabase sends a confirmation link to the user's email.

- **Check spam:** Confirmation emails often land in **spam**. Ask users to check their inbox and spam folder.
- **Confirmation link:** The app sets `emailRedirectTo` so the link returns to the claim page (e.g. `http://localhost:3000/claim/fitness-factory-nicosia`). Clicking the link confirms the account and signs the user in on the claim page.

## Unblocking in development

If a user didn't receive the email: in [Supabase Dashboard](https://supabase.com/dashboard) go to **Authentication → Users**, find the user and use the option to **confirm** the user. Then they can sign in with the same email and password.
