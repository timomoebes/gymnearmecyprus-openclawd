# Personalized confirmation email (Gym Near Me Cyprus)

To make the signup confirmation email feel like it comes from **Gym Near Me Cyprus Directory**, customize the template in Supabase:

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → **Authentication** → **Email Templates**
2. Select **Confirm signup**
3. Use the subject and body below (Supabase supports variables like `{{ .ConfirmationURL }}` and `{{ .Email }}`).

---

## Subject (suggested)

```
Confirm your Gym Near Me Cyprus account
```

---

## Body (plain text; adapt if your project uses HTML)

```
Confirm your Gym Near Me Cyprus account

Hello,

You signed up for Gym Near Me Cyprus — the directory for gyms across Cyprus. To confirm your email and complete your account, click the link below:

{{ .ConfirmationURL }}

If you didn't request this, you can ignore this email.

— Gym Near Me Cyprus
```

---

## Body (HTML version, if your project uses HTML templates)

```html
<h2>Confirm your Gym Near Me Cyprus account</h2>
<p>Hello,</p>
<p>You signed up for <strong>Gym Near Me Cyprus</strong> — the directory for gyms across Cyprus. To confirm your email and complete your account, click the link below:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm my email</a></p>
<p>If you didn't request this, you can ignore this email.</p>
<p>— Gym Near Me Cyprus</p>
```

---

After saving, new confirmation emails will use this copy. Existing Supabase variables (e.g. `{{ .ConfirmationURL }}`, `{{ .Email }}`) are documented in [Supabase Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates).
